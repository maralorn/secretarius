require('./sqlcontext') global

enumeration status: ['delete', 'maybe', 'default', 'inbox', 'urgent']

func uuid:
	body: """
		import uuid
		return uuid.uuid1()"""
	return: UUID
	lang: python

table	information:
		id:
			type: UUID
			primary: true
			default: uuid()
		status:
			type: STATUS
			default: status.default
			null: false
		delay:
			type: TIMESTAMPTZ
		lastEdited:
			type: TIMESTAMPTZ
			default: now
			null: false
		createdAt:
			type: TIMESTAMPTZ
			default: now
			null: false

table	deleted:
		id:
			type: UUID
			null: false
			primary: true
		time:
			type: TIMESTAMPTZ
			default: now
			null: false

table references:
	_references:
		id: information.id
		referenceid: information.id

table	file:
	_extends: information
	name:
		type: VARCHAR
		null: false

table attachments:
	_references:
		id: information.id
		fileid: file.id

table note:
	_extends: information
	content:
		type: VARCHAR
		null: false

table task:
	_extends: information
	description:
		type: VARCHAR
		null: false
	completed:
		type: TIMESTAMPTZ
	deadline:
		type: TIMESTAMPTZ

table asaplist:
	_extends: information
	name:
		type: VARCHAR
		unique: true

table project:
	_extends: task
	collapsed:
		type: BOOLEAN
		default: false
		null: false
	_append: "alter table task add column parent uuid references project(id) on delete set null;"

table asap:
	_extends: task
	asaplist:
		type: UUID
		references: asaplist.id
		onDelete: 'restrict'

# Views
#
# Infos

func getInformation:
	return: JSON
	lang: python
	args: ["id uuid"]
	body: """
import re
plan = plpy.prepare("SELECT type FROM type WHERE id=$1", ["uuid"])
type = plpy.execute(plan, [id])
if len(type) > 0:
	plan = plpy.prepare("select row_to_json(info) as info from " + type[0]['type'] + "view as info WHERE id=$1", ["uuid"])
	return re.sub(r"\\"(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\.\\d+\\+\\d{2})\\"", "\\"\\g<1>00\\"", plpy.execute(plan, [id])[0]['info'])
else:
	return "{}"
"""

func setTimestamp:
	return: TRIGGER
	lang: python
	body: """
plan = plpy.prepare("update information set \\"lastEdited\\"=CURRENT_TIMESTAMP WHERE id=$1", ["uuid"])
for state in ['new', 'old']:
	if state in TD and TD[state] != None:
		id = TD[state]['id']
		plpy.execute(plan, [id])
"""

func changed:
	return: TRIGGER
	lang: python
	body:"""
ids = set()
for state in ['new', 'old']:
	if state in TD and TD[state] != None:
		ids.add(TD[state]['id'])
ids.discard(None)
for id in ids:
	plpy.execute("NOTIFY changed, '"+str(id)+"';")
"""

func notify:
	return: TRIGGER
	lang: python
	body: """
plpy.execute("NOTIFY " + TD["args"][0] + ";")
"""
func new:
	return: TRIGGER
	lang: python
	body: """
import json
msg = json.dumps({"type": TD["args"][0],"id": TD["new"]["id"]})
plpy.execute("NOTIFY new, '" + msg + "';")
"""
func deleted:
	return: TRIGGER
	lang: python
	body: """
import json
msg = json.dumps({"type": TD["args"][0],"id": TD["old"]["id"]})
plpy.execute("NOTIFY deleted, '" + msg + "';")
"""
func unnull:
	return: 'uuid[]'
	lang: python
	args: ['"array" uuid[]']
	body:"""
		if array[0] == None: 
			return []
		return array
"""

view infoview0: select
		columns: "id, unnull(array_agg(referenceid)) as \"references\""
		from: "information natural left join \"references\""
		groupBy: "id"
view infoview1: select
		columns: "i.id, unnull(array_agg(r.id)) as \"referencedBy\""
		from: "information i left join \"references\" r on r.referenceid = i.id"
		groupBy: "i.id"
view infoview2: select
		columns: "id, unnull(array_agg(fileid)) as \"attachments\""
		from: "information natural left join \"attachments\""
		groupBy: "id"
		

func info_active:
	args: ["delay timestamptz"]
	return: BOOLEAN
	lang: sql
	body: "begin return (delay <= current_timestamp or delay is null); end;"

func info_expires:
	args: ["delay timestamptz"]
	return: TIMESTAMPTZ
	lang: sql
	body: "begin return (case when (delay > current_timestamp) then delay else null end); end;"

func delete:
	return: TRIGGER
	lang: python
	body:"""
id = TD["new"]["id"]
plan1 = plpy.prepare("DELETE FROM information WHERE id=$1;", ["uuid"])
plan2 = plpy.prepare("INSERT INTO deleted (id) VALUES ($1);", ["uuid"])
plpy.execute(plan2, [id])
plpy.execute(plan1, [id])
"""

infotrigger =
		references:
			fields: ['id', 'referenceid']
			events: ['insert', 'delete']
		attachments:
			events: ['insert', 'delete']
		information: {}

selects = []
for type in information.types()
	infotrigger[type] =
		events: ['insert']
	selects.push select
		columns: "id, '#{type}' as \"type\""
		from: "information join \"#{type}\" using (id)"
view type: union selects

materializedView infoview:
	query: select
		columns: "*, info_active(delay) as active, info_expires(delay) as expires"
		from: 'information natural join "type" natural join infoview0 natural join infoview1 natural join infoview2'
	trigger: infotrigger

view inbox: select
		columns: "*"
		from: 'infoview'
		where: "active and status >= 'inbox'"

view maybe: select
		columns: "*"
		from: 'infoview'
		where: "active and status >= 'inbox'"

view urgent: select
		columns: "*"
		from: 'inbox'
		where: "status >= 'urgent'"

trigger
	info0:
		events: ['update']
		table: 'information'
		when: 'new."lastEdited" is distinct from current_timestamp and new.status != \'delete\''
		cmd: setTimestamp()
	info1:
		events: ['update']
		table: 'information'
		when: "new.status = 'delete'"
		cmd: global.delete()
	info2:
		events: ['insert','delete']
		table: 'references'
		cmd: setTimestamp()
	info3:
		events: ['insert']
		table: 'infoview_table'
		when: "new.active and new.status >= 'inbox'"
		cmd: notify('inbox')
	info4:
		events: ['delete']
		table: 'infoview_table'
		when: "old.active and old.status >= 'inbox'"
		cmd: notify('inbox')

autotrigger = (table) ->
	t = []
	t.push
		events: ['update']
		table: table
		cmd: setTimestamp()
	t.push
		events: ['insert']
		table: "#{table}view_table"
		cmd: changed()
	t.push
		events: ['insert']
		table: table
		cmd: global.new table
	t.push
		events: ['delete']
		table: table
		cmd: deleted table
	tr = {}
	for tri, i in t
		tr["#{table}auto#{i}"] = tri
	trigger tr
# Files

view fileview0: select
		columns: 'f.id, unnull(array_agg(a.id)) as attachedTo'
		from: 'file f left join attachments a on f.id = a.fileid'
		groupBy: 'f.id'

materializedView fileview:
	query: select
		columns: "*, info_expires(delay) as expires"
		from: "infoview natural join file natural join fileview0"
	trigger:
		file: {}
		attachments: {}
		infoview_table: {}

autotrigger 'file'

materializedView noteview:
	query: select
		columns: '*, info_expires(delay) as expires'
		from: 'infoview natural join note'
	trigger:
		note: {}
		infoview_table: {}

autotrigger 'note'

func task_overdue:
	args: ["deadline timestamptz"]
	return: BOOLEAN
	lang: sql
	body: "begin return (deadline < current_timestamp and deadline is not null); end;"

func task_expires:
	args: ["delay timestamptz, deadline timestamptz"]
	return: TIMESTAMPTZ
	lang: sql
	body: "begin return least(info_expires(deadline), info_expires(delay)); end;"

console.log """
create or replace view taskParents as
	with recursive rel(id, parent) as (
		select id, parent from task
			where parent is distinct from null
	union
		select a.id,b.parent from rel a, task b 
			where (a.parent = b.id and b.parent is distinct from null))
	select * from rel;"""

func catchCycles:
	return: TRIGGER
	lang: python
	body: """
count = 0
if TD['new']['parent'] != None:
	plan = plpy.prepare("select count(*) from taskParents where id=$1 and parent=$2;", ["uuid", "uuid"])
	count = plpy.execute(plan, [TD['new']['parent'], TD['new']['id']])[0]["count"]
if count > 0 or TD['new']['id'] == TD['new']['parent']:
	raise Exception('Parent cycle detected. ' + str(count))
else:
	return "OK"
"""

console.log 'create trigger catchCycles before update or insert on task for each row execute procedure catchCycles();'

materializedView taskview:
	query: select
		columns: '*, task_overdue(deadline) as overdue, task_expires(deadline, delay) as expires'
		from: 'infoview natural join task'
	trigger:
		task: {}
		infoview_table: {}

autotrigger 'task'

materializedView asapview:
	query: select
		columns: '*, task_expires(deadline, delay) as expires'
		from: 'taskview natural join asap'
	trigger:
		asap: {}
		taskview_table: {}

autotrigger 'asap'

view asaplistview0: select
		columns: 'a.id, unnull(array_agg(t.id)) as asaps'
		from: 'asaplist a left join asap t on a.id = t.asaplist'
		groupBy: 'a.id'

materializedView asaplistview:
	query: select
		columns: '*, info_expires(delay) as expires'
		from: 'infoview natural join asaplist natural join asaplistview0'
	trigger:
		asaplist: {}
		asap:
			fields: ['asaplist']
		infoview_table: {}

autotrigger 'asaplist'

view projectview0: select
		columns: 'p.id, unnull(array_agg(t.id)) as children'
		from: 'project p left join task t on p.id = t.parent'
		groupBy: 'p.id'

materializedView projectview:
	query: select
		columns: '*, task_expires(deadline, delay) as expires'
		from: 'taskview natural join project natural join projectview0'
	trigger:
		project: {}
		taskview_table: {}
		task:
			fields: ['parent']

autotrigger 'project'
