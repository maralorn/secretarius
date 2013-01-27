
-- +information
-- |-note
-- |+task
--  |-project
--  |-asap
-- |-appointment
-- |+social_entity
--  |-circle
--  |-contact
-- |-place
CREATE EXTENSION IF NOT EXISTS plpythonu;

CREATE OR REPLACE FUNCTION uuid() RETURNS uuid AS $$
	import uuid
	return uuid.uuid1()
$$ LANGUAGE plpythonu;

CREATE TYPE status AS ENUM ('delete', 'maybe', 'default', 'inbox', 'urgent');

CREATE TABLE information(
	id          uuid PRIMARY KEY DEFAULT uuid(),
	status      status DEFAULT 'default' NOT NULL,
	delay       timestamptz,
	last_edited timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	created_at  timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE deleted(
	id     uuid PRIMARY KEY DEFAULT uuid(),
	time   timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "references"(
	id            uuid REFERENCES information(id) ON DELETE CASCADE,
	referenceid   uuid REFERENCES information(id) ON DELETE CASCADE,
	PRIMARY KEY (id, referenceid)
);

CREATE TABLE "file"(
	id       uuid PRIMARY KEY REFERENCES information(id) ON DELETE CASCADE,
	name     varchar NOT NULL   
);

CREATE TABLE attachments(
	id       uuid REFERENCES information(id) ON DELETE CASCADE,
	fileid   uuid REFERENCES "file"(id) ON DELETE CASCADE,
	PRIMARY KEY (id, fileid)
);

CREATE TABLE note(
	id        uuid PRIMARY KEY REFERENCES information(id) ON DELETE CASCADE,
	content   varchar NOT NULL
);

CREATE TABLE task(
	id           uuid PRIMARY KEY REFERENCES information(id) ON DELETE CASCADE,
	description  varchar NOT NULL,
	completed    timestamptz,
	deadline     timestamptz
);

CREATE TABLE project(
	id          uuid PRIMARY KEY REFERENCES task(id) ON DELETE CASCADE,
	collapsed   boolean DEFAULT false NOT NULL,
	parent      uuid REFERENCES project(id)
);

CREATE TABLE asaplist(
	id          uuid PRIMARY KEY REFERENCES information(id) ON DELETE CASCADE,
	name        varchar NOT NULL UNIQUE
);

CREATE TABLE asap(
	project    uuid REFERENCES project(id),
	asaplist   uuid REFERENCES asaplist(id) ON DELETE RESTRICT NOT NULL,
	id         uuid PRIMARY KEY REFERENCES task(id) ON DELETE CASCADE
);

CREATE TABLE social_entity(
	id   uuid PRIMARY KEY REFERENCES information(id) ON DELETE CASCADE
);

CREATE TABLE circle(
	id   uuid PRIMARY KEY REFERENCES social_entity(id) ON DELETE CASCADE,
	name   varchar   NOT NULL UNIQUE
);

CREATE TABLE contact(
	id           uuid PRIMARY KEY REFERENCES social_entity(id) ON DELETE CASCADE,
	name         varchar,
	first_name   varchar,
	middle_names varchar,
	title        varchar,
	prefix       varchar,
	suffix       varchar,
	nickname     varchar,
	birthname    varchar,
	birthday     date
);

CREATE TABLE circle_member(
	contactid    uuid REFERENCES contact(id) ON DELETE CASCADE,
	circleid     uuid REFERENCES circle(id) ON DELETE CASCADE,
	PRIMARY KEY (contactid, circleid)
);

CREATE TABLE place(
	id           uuid PRIMARY KEY REFERENCES information(id) ON DELETE CASCADE,
	country      varchar,
	state        varchar,
	city         varchar,
	postal_code  varchar,
	street       varchar,
	house        varchar,
	building     varchar,
	room         varchar,
	GPSx         float,
	GPSy         float,
	part_of      uuid REFERENCES place(id)
);

CREATE TABLE addresses(
	contactid   uuid REFERENCES contact(id) ON DELETE CASCADE,
	description varchar,
	placeid     uuid REFERENCES place(id) ON DELETE CASCADE,
	PRIMARY KEY (contactid, placeid)
);

CREATE TABLE appointment(
	id          uuid PRIMARY KEY REFERENCES information(id) ON DELETE CASCADE,
	startdate   date   NOT NULL,
	enddate     date,
	time        time with time zone,
	length      interval,
	description varchar NOT NULL,
	placeid     uuid REFERENCES place(id)
);

CREATE TYPE exception_move AS ENUM('no', 'before', 'after');

CREATE TABLE appointment_exception(
	appointmentid    uuid REFERENCES appointment(id) ON DELETE CASCADE,
	exceptionid      uuid REFERENCES appointment(id) ON DELETE CASCADE,
	exception_move   exception_move DEFAULT 'no' NOT NULL,
	PRIMARY KEY(appointmentid, exceptionid)
);

CREATE TYPE filter_type AS ENUM('dayofweek', 'dayofmonth', 'weekofmonth', 'monthofyear', 'weeksincestart', 'daysincestart', 'monthsincestart', 'yearsincestart');

CREATE TABLE day_filter(
	appointmentid   uuid REFERENCES appointment(id) ON DELETE CASCADE,
	filter_type     filter_type NOT NULL,
	value           uuid,
	PRIMARY KEY(appointmentid, filter_type, value)
);

CREATE TABLE participants(
	appointmentid   uuid REFERENCES appointment(id) ON DELETE CASCADE,
	participantid   uuid REFERENCES social_entity(id) ON DELETE CASCADE,
	PRIMARY KEY (appointmentid, participantid)
);

CREATE TABLE protocol(
	id          uuid PRIMARY KEY REFERENCES information(id) ON DELETE CASCADE,
	name        varchar NOT NULL UNIQUE
);

CREATE TABLE server(
	id           uuid PRIMARY KEY REFERENCES information(id) ON DELETE CASCADE,
	name   	    varchar NOT NULL,
	protocolid   uuid REFERENCES protocol(id) ON DELETE CASCADE NOT NULL,
	UNIQUE(name, protocolid)
);

CREATE TABLE communicator(
	id              uuid PRIMARY KEY REFERENCES information(id) ON DELETE CASCADE,
	default_status  status DEFAULT 'inbox' NOT NULL,
	username        varchar NOT NULL,
	name            varchar,
	serverid   uuid REFERENCES server(id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE account(
	id   uuid PRIMARY KEY REFERENCES communicator(id) ON DELETE CASCADE
);

CREATE TABLE accounts(
	contactid   uuid REFERENCES contact(id) ON DELETE CASCADE,
	description varchar,
	accountid   uuid REFERENCES account(id) ON DELETE CASCADE,
	priority    uuid NOT NULL,
	PRIMARY KEY(contactid, accountid)
);

CREATE TABLE room(
	id     uuid PRIMARY KEY REFERENCES communicator(id) ON DELETE CASCADE,
	motd   varchar
);

CREATE TABLE room_member(
	accountid   uuid REFERENCES account(id) ON DELETE CASCADE,
	roomid      uuid REFERENCES room(id) ON DELETE CASCADE,
	role        varchar,
	PRIMARY KEY(accountid, roomid)
);

CREATE TYPE online_state AS ENUM ('online', 'away', 'na', 'dnd', 'invisible');

CREATE TABLE "resource"(
	id       uuid PRIMARY KEY,
	name     varchar,
	status   online_state,
	message  varchar
);

CREATE TABLE communication(
	id      uuid PRIMARY KEY REFERENCES information(id) ON DELETE CASCADE,
	"from"  uuid REFERENCES communicator(id) ON DELETE CASCADE,
	time    timestamptz
);

CREATE TABLE message(
	id        uuid PRIMARY KEY REFERENCES communication(id) ON DELETE CASCADE,
	subject   varchar,
	body      varchar
);
	
CREATE TABLE presence(
	id   uuid PRIMARY KEY REFERENCES communication(id) ON DELETE CASCADE
);

CREATE TABLE resources(
	presenceid   uuid REFERENCES presence(id) ON DELETE CASCADE,
	resourceid   uuid REFERENCES "resource"(id) ON DELETE CASCADE,
	PRIMARY KEY(presenceid, resourceid)
);

CREATE TABLE header(
	messageid   uuid PRIMARY KEY REFERENCES message(id) ON DELETE CASCADE,
	content   varchar
);

CREATE TABLE outbox(
	communicationid uuid PRIMARY KEY REFERENCES message(id) ON DELETE CASCADE
);

CREATE TABLE draft(
	communicationid uuid PRIMARY KEY REFERENCES message(id) ON DELETE CASCADE
);

CREATE TYPE recipient_field AS ENUM('to', 'cc', 'bcc');

CREATE TABLE recipient(
	messageid   uuid REFERENCES message(id) ON DELETE CASCADE,
	accountid   uuid REFERENCES account(id) ON DELETE CASCADE,
	field   recipient_field,
	"resource" 	varchar,
	PRIMARY KEY(messageid, accountid, field)
);

CREATE TABLE daemon(
	id          uuid PRIMARY KEY REFERENCES information(id) ON DELETE CASCADE,
	name        varchar NOT NULL,
	status      varchar NOT NULL,
	timestamp   timestamp,
	message     varchar
);

CREATE TABLE useraccount(
	id        uuid PRIMARY KEY REFERENCES account(id) ON DELETE CASCADE,
	password  varchar,
	status    online_state,
	message   varchar
);
-- +information
-- |-note
-- |+task
--  |-project
--  |-asap
-- |-appointment
-- |+social_entity
--  |-circle
--  |-contact
-- |-place

DROP VIEW "type" CASCADE;
CREATE VIEW "type" AS 
           SELECT information.id, 'note' as "type" FROM information JOIN note USING (id)
	UNION   SELECT information.id, 'project' as "type" FROM information JOIN project USING (id)
	UNION   SELECT information.id, 'file' as "type" FROM information JOIN "file" USING (id)
	UNION   SELECT information.id, 'asap' as "type"  FROM information JOIN asap USING (id)
	UNION   SELECT information.id, 'asaplist' as "type"  FROM information JOIN asaplist USING (id)
	UNION   SELECT information.id, 'appointment' as "type" FROM information JOIN appointment USING (id)
	UNION   SELECT information.id, 'circle' as "type" FROM information JOIN circle USING (id)
	UNION   SELECT information.id, 'contact' as "type" FROM information JOIN contact USING (id)
	UNION   SELECT information.id, 'place' as "type" FROM information JOIN place USING (id);


CREATE VIEW "infoview" AS
	SELECT id, created_at, last_edited, status, "type", delay
		FROM information JOIN "type" USING (id);


CREATE VIEW "inbox" AS
	SELECT * 
		FROM infoview WHERE status >= 'inbox' AND (delay <= CURRENT_TIMESTAMP OR delay is NULL);

CREATE VIEW "urgent" AS
	SELECT * 
		FROM inbox WHERE status >= 'urgent';


CREATE VIEW "maybe" AS
	SELECT *
		FROM infoview WHERE status = 'maybe';

CREATE VIEW taskview AS
	SELECT i.*, description, completed, deadline
		FROM infoview i
			INNER JOIN task USING (id); 

CREATE VIEW asapview AS
	SELECT t.*, l.name AS asaplist, a.project, p.description AS projectdescription
		FROM taskview t 
			INNER JOIN asap a USING (id) 
			LEFT OUTER JOIN task p ON a.project=p.id 
			INNER JOIN asaplist l ON l.id = a.asaplist;


CREATE VIEW projectview AS
	SELECT t.* , p.parent, p.collapsed
		FROM taskview t 
			INNER JOIN project p USING (id);

CREATE VIEW asaplistview AS
	SELECT i.*, name
		FROM infoview i 
			INNER JOIN asaplist USING (id);


CREATE VIEW "appointmentview" AS
	SELECT i.*, startdate, enddate, time, length, description
		FROM infoview i
			INNER JOIN appointment USING (id);


CREATE VIEW "noteview" AS
	SELECT i.*, content
		FROM infoview i 
			JOIN note n USING (id);

DROP FUNCTION set_timestamp() CASCADE;
CREATE FUNCTION set_timestamp() RETURNS trigger AS $$
	plan = SD.setdefault("plan", plpy.prepare("UPDATE information SET last_edited=CURRENT_TIMESTAMP WHERE id=$1", ["uuid"]))
	if 'DELETE' == TD['event']:
		id = TD['old']['id']
	else:
		id = TD['new']['id']
	plpy.execute(plan, [id])
	return "OK";
$$ LANGUAGE plpythonu;

DROP FUNCTION delete() CASCADE;
CREATE FUNCTION delete() RETURNS trigger AS $$
	id = TD["new"]["id"]
	plan1 = plpy.prepare("DELETE FROM information WHERE id=$1;", ["uuid"])
	plan2 = plpy.prepare("INSERT INTO deleted (id) VALUES ($1);", ["uuid"])
	plpy.execute(plan1, [id])
	plpy.execute(plan2, [id])
	plpy.execute("NOTIFY infodeleted, '"+id+"';")
	return "OK";
$$ LANGUAGE plpythonu;

CREATE TRIGGER delete AFTER UPDATE ON information FOR EACH ROW WHEN (NEW.status = 'delete') EXECUTE PROCEDURE delete();
CREATE TRIGGER infochange AFTER UPDATE ON information FOR EACH ROW WHEN (OLD.last_edited = NEW.last_edited AND NEW.status != 'delete') EXECUTE PROCEDURE set_timestamp();
CREATE TRIGGER notechange AFTER UPDATE ON note FOR EACH ROW EXECUTE PROCEDURE set_timestamp();
CREATE TRIGGER taskchange AFTER UPDATE ON task FOR EACH ROW EXECUTE PROCEDURE set_timestamp();
CREATE TRIGGER asapchange AFTER UPDATE ON asap FOR EACH ROW EXECUTE PROCEDURE set_timestamp();
CREATE TRIGGER projectchange AFTER UPDATE ON project FOR EACH ROW EXECUTE PROCEDURE set_timestamp();
CREATE TRIGGER asaplistchange AFTER UPDATE ON asaplist FOR EACH ROW EXECUTE PROCEDURE set_timestamp();
CREATE TRIGGER referencesinsertion AFTER INSERT ON "references" FOR EACH ROW EXECUTE PROCEDURE set_timestamp();
CREATE TRIGGER referencesdeletion AFTER DELETE ON "references" FOR EACH ROW EXECUTE PROCEDURE set_timestamp();

DROP FUNCTION inboxchange() CASCADE;
CREATE FUNCTION inboxchange() RETURNS trigger AS $$
	plpy.execute("NOTIFY inboxchange;")
	return "OK";
$$ LANGUAGE plpythonu;

CREATE TRIGGER inboxchange AFTER UPDATE ON information FOR EACH ROW WHEN ((OLD.status >= 'inbox' AND NEW.status < 'inbox') OR (OLD.status < 'inbox' AND NEW.status >= 'inbox') OR OLD.delay != NEW.delay) EXECUTE PROCEDURE inboxchange();
CREATE TRIGGER inboxinsert AFTER INSERT ON information FOR EACH ROW WHEN (NEW.status >= 'inbox') EXECUTE PROCEDURE inboxchange();

DROP FUNCTION notify_on_change() CASCADE;
CREATE FUNCTION notify_on_change() RETURNS trigger AS $$
	id = TD["new"]["id"]
	plpy.execute("NOTIFY infochange, '"+str(id)+"';")
	return "OK";
$$ LANGUAGE plpythonu;

CREATE TRIGGER infonotify AFTER UPDATE ON information FOR EACH ROW WHEN (OLD.last_edited != NEW.last_edited) EXECUTE PROCEDURE notify_on_change();
