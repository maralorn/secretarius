module.exports = (c) ->
	aliases =
		now: 'current_timestamp'
		python: 'plpythonu'
		sql: 'plpgsql'
		js: 'plv8'
		coffee: 'plcoffee'
	for alias, meaning of aliases
		c[alias] = meaning

	tables = {}
	enums = {}
	functions = {}
	views = {}
	langs = []
	types = ['uuid', 'timestamptz', 'varchar', 'boolean', 'trigger', 'json']
	for type in types
		c[type.toUpperCase()] = type

	c.func = (func) ->
		for fnname, fn of func
			functions[fnname] = fn
			c[fnname] = (args...) ->
				"#{fnname}(#{args.join ', '})"
			printFunction fnname, fn

	c.enumeration = (enumobj) ->
		for enumname, enumlist of enumobj
			c[enumname] = {}
			for elem in enumlist
				c[enumname][elem] = "'#{elem}'"
			enums[enumname] = (c[enumname][elem] for elem in enumlist)
			c[enumname.toUpperCase()] = enumname
			printEnum enumname, enums[enumname]

	c.view = (viewobj) ->
		for viewname, view of viewobj
		#	views[viewname] = view
			printView viewname, view

	c.materializedView = (viewobj) ->
		for viewname, view of viewobj
		#	views["#{viewname}_um"] = view
			printView "#{viewname}_um", view.query
			console.log "create table \"#{viewname}_table\" as select * from \"#{viewname}_um\";"
			obj = {}
			obj["#{viewname}_refresh_row"] =
				args: ["id uuid"]
				lang: c.coffee
				return: "#{viewname}_table"
				body: """
				row = plv8.execute "select * from #{viewname}_um u where u.id = '\#{id}';"
				row = if row.length is 1 then row[0] else null
				old = plv8.prepare "select * from #{viewname}_table t where t.id = '\#{id}';"
				old = if old.length is 1 then old[0] else null
				unless JSON.stringify(row) is JSON.stringify(old) and row is not null
					plv8.execute "delete from #{viewname}_table t where t.id = '\#{id}';"
					plv8.execute "insert into #{viewname}_table select * from #{viewname}_um u where u.id = '\#{id}';"
				return row
				"""
			obj["#{viewname}_trigger"] =
				args: []
				lang: c.python
				return: c.TRIGGER
				body: """
					ids = set()
					if 'args' in TD and TD['args'] != None:
						field = TD['args'][0]
					else:
						field = 'id'
					for state in ['new', 'old']:
						if state in TD and TD[state] != None:
							ids.add(TD[state][field])
					ids.discard(None)
					plan = SD.setdefault('plan', plpy.prepare('select #{viewname}_refresh_row($1)', ['uuid']))
					for id in ids:
						plpy.execute(plan, [id])
"""
			c.func obj
			for table, trigger of view.trigger
				trigger.fields or= ['id']
				trigger.events or= ['update','insert','delete']
				for field in trigger.fields
					printTrigger "#{viewname}_mv_#{table}_#{field}",
						events: trigger.events
						table: table
						cmd: "#{viewname}_trigger('#{field}')"
				
			console.log """
					do $$
					fields = plpy.execute("select column_name from information_schema.columns where table_name = '#{viewname}_table' and column_name != 'expires';")
					fieldlist = []
					for field in fields:
						fieldlist.append('r."'+field['column_name']+'"')
					fields = ', '.join(fieldlist)
					plpy.execute("create or replace view \\"#{viewname}\\" as select "+fields+" from #{viewname}_table r where expires is null or expires >= current_timestamp union select "+fields+" from (select (#{viewname}_refresh_row(id)).* from #{viewname}_table where expires is not null and expires < current_timestamp) as r;") $$ language plpythonu;"""

	printTrigger = (name, trigger) ->
		console.log "create trigger #{name} after #{trigger.events.join ' or '} on \"#{trigger.table}\" for each row #{if trigger.when? then "when (#{trigger.when}) " else ''}execute procedure #{trigger.cmd};"
	
	c.trigger = (triggers) ->
		for name, trigger of triggers
			printTrigger name, trigger
		

	c.table = (tableobj) ->
		for tablename, table of tableobj
			c[tablename] = tables[tablename] = table
			table.children = []
			if table._extends?
				table._references or= {}
				table._references.id = table._extends.id
				c[table._extends.id.table].children.push table
			if table._references?
				for field, rfield of table._references
					table[field] =
						type: rfield.type
						references: rfield
						primary: true
			for field, content of table
				content.name = field
				content.table = tablename
			table.types = ->
				if table.children.length > 0
					ret = []
					for child in table.children
						ret = ret.concat child.types()
				else ret = tablename
				ret
			printTable tablename, table
	
	printFunction = (fnname, fn) ->
		unless fn.lang in langs
			console.log "create extension if not exists #{fn.lang};\n"
			langs.push fn.lang
		console.log "create or replace function #{fnname}(#{if fn.args? then fn.args.join ', ' else ''}) returns #{if fn.return? then fn.return else 'void'} as $$\n#{fn.body}\n$$ language #{fn.lang};\n"

	printEnum = (enumname, enumlist) ->
		console.log "create type #{enumname} as enum (#{enumlist.join ', '});\n"

	printTable = (tablename, table) ->
		primaries = []
		lines = []
		for name, column of table
			continue unless column.type?
			line = []
			line.push "\n\t\"#{column.name}\"#{(' ' for i in [0..(20 - name.length)]).join ''}#{column.type}"
			if column.primary? and column.primary
				primaries.push "\"#{name}\""
			if column.references?
				line.push " references \"#{column.references.table}\"(#{column.references.name}) on delete "
				if column.onDelete?
					line.push column.onDelete
				else
					line.push "cascade"
			if column.default?
				line.push " default #{column.default}"
			if column.null? and not column.null
				line.push " not null"
			if column.unique? and column.unique
				line.push " unique"
			lines.push line.join ''
		if primaries.length > 0
			lines.push "\n\tprimary key(#{primaries.join ', '})"
		console.log "create table \"#{tablename}\"(#{lines.join()}\n);"
		if table._append?
			console.log table._append
		console.log ''
	
	printView = (viewname, view) ->
			console.log "create or replace view \"#{viewname}\" as #{view};\n"
	c.union = (selects) ->
		selects.join '\n\tunion '
	c.select = (view) ->
		"select #{view.columns} from #{view.from}#{if view.where? then " where #{view.where}" else ''}#{if view.groupBy? then " group by #{view.groupBy}" else ''}"
