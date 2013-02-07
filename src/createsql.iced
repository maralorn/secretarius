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
	_append: "alter table task add column parent uuid references project(id);"

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
	lang: coffee
	args: ["id uuid"]
	body: """
type = plv8.execute "SELECT type FROM type WHERE id='\#{id}'"
return JSON.stringify if type.length == 0 then {} else plv8.execute("select * from \#{type[0]['type']}view WHERE id='\#{id}'")[0]
"""

func setTimestamp:
	return: TRIGGER
	lang: python
	body: """
plan = SD.setdefault("plan", plpy.prepare("update information set \\"lastEdited\\"=CURRENT_TIMESTAMP WHERE id=$1", ["uuid"]))
for state in ['new', 'old']:
	if state in TD and TD[state] != None:
		id = TD[state]['id']
		plpy.execute(plan, [id])
"""

func notify:
	return: TRIGGER
	lang: python
	body:"""
ids = set()
for state in ['new', 'old']:
	if state in TD and TD[state] != None:
		ids.add(TD[state]['id'])
ids.discard(None)
for id in ids:
	plpy.execute("NOTIFY infochange, '"+str(id)+"';")
"""

func change:
	return: TRIGGER
	lang: python
	body:"""
plpy.execute("NOTIFY "+str(TD['args'][0])+"change;")
"""
func unnull:
	return: 'uuid[]'
	lang: coffee
	args: ['"array" uuid[]']
	body:"""
		return if array[0]? then array else []
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
plpy.execute("NOTIFY infodeleted, '"+id+"';")
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
		cmd: change('inbox')
	info4:
		events: ['delete']
		table: 'infoview_table'
		when: "old.active and old.status >= 'inbox'"
		cmd: change('inbox')

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

trigger
	file0:
		events: ['update']
		table: 'file'
		cmd: setTimestamp()
	file1:
		events: ['insert']
		table: 'fileview_table'
		cmd: notify()

materializedView noteview:
	query: select
		columns: '*, info_expires(delay) as expires'
		from: 'infoview natural join note'
	trigger:
		note: {}
		infoview_table: {}

trigger
	note0:
		events: ['update']
		table: 'note'
		cmd: setTimestamp()
	note1:
		events: ['insert']
		table: 'noteview_table'
		cmd: notify()

materializedView taskview:
	query: select
		columns: '*, info_expires(delay) as expires'
		from: 'infoview natural join task'
	trigger:
		task: {}
		infoview_table: {}

trigger
	task0:
		events: ['update']
		table: 'task'
		cmd: setTimestamp()

view activetaskview: select
		columns: '*'
		from: 'taskview'
		where: 'active and completed is null'

materializedView asapview:
	query: select
		columns: '*, info_expires(delay) as expires'
		from: 'taskview natural join asap'
	trigger:
		asap: {}
		taskview_table: {}

view activeasapview: select
		columns: '*'
		from: 'asapview'
		where: 'active and completed is null'

trigger
	asap0:
		events: ['update']
		table: 'asap'
		cmd: setTimestamp()
	asap1:
		events: ['insert']
		table: 'asapview_table'
		cmd: notify()

view asaplistview0: select
		columns: 'a.id, unnull(array_agg(t.id)) as asaps'
		from: 'asaplist a left join activeasapview t on a.id = t.asaplist'
		groupBy: 'a.id'

materializedView asaplistview:
	query: select
		columns: '*, info_expires(delay) as expires'
		from: 'infoview natural join asaplist natural join asaplistview0'
	trigger:
		asaplist: {}
		asapview_table:
			fields: ['asaplist']
		infoview_table: {}

trigger
	asaplist0:
		events: ['update']
		table: 'asaplist'
		cmd: setTimestamp()
	asap1:
		events: ['insert']
		table: 'asaplistview_table'
		cmd: notify()

view projectview0: select
		columns: 'p.id, unnull(array_agg(t.id)) as children'
		from: 'project p left join activetaskview t on p.id = t.parent'
		groupBy: 'p.id'

materializedView projectview:
	query: select
		columns: '*, info_expires(delay) as expires'
		from: 'taskview natural join project natural join projectview0'
	trigger:
		project: {}
		taskview_table:
			fields: ['id','parent']

view activeprojectview: select
		columns: '*'
		from: 'projectview'
		where: 'active and completed is null'

trigger
	project0:
		events: ['update']
		table: 'project'
		cmd: setTimestamp()
	project1:
		events: ['insert']
		table: 'projectview_table'
		cmd: notify()