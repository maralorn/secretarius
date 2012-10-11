
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

CREATE TYPE status AS ENUM ('delete', 'default', 'maybe', 'inbox', 'urgent');

CREATE TABLE information(
	id 			serial PRIMARY KEY
	status 		status DEFAULT 'default' NOT NULL,
	delay		timestamp,
	last_edited timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	created_at 	timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
);

CREATE TABLE "references"(
	id			integer REFERENCES information(id) ON DELETE CASCADE,
	referenceid	integer REFERENCES information(id) ON DELETE CASCADE,
	PRIMARY KEY (id, referenceid)
);

CREATE TABLE "file"(
	id 			serial PRIMARY KEY,
	name		varchar NOT NULL	
);

CREATE TABLE attachments(
	id 			integer PRIMARY KEY REFERENCES information(id) ON DELETE CASCADE
	fileid 		integer PRIMARY KEY REFERENCES "file"(id) ON DELETE CASCADE
);

CREATE TABLE note(
	id			integer PRIMARY KEY REFERENCES information(id) ON DELETE CASCADE,
	content 	varchar NOT NULL,
);

CREATE TABLE task(
	id 			integer PRIMARY KEY REFERENCES information(id) ON DELETE CASCADE
	description varchar NOT NULL,
	completed 	timestamp,
);

CREATE TABLE project(
	id			integer PRIMARY KEY REFERENCES task(id) ON DELETE CASCADE
	collapsed 	boolean DEFAULT false NOT NULL,
	parent 		integer REFERENCES project(id),
);

CREATE TABLE asaplist(
	id 			serial PRIMARY KEY,
	name 		varchar NOT NULL UNIQUE
);

CREATE TABLE asap(
	project 	integer REFERENCES project(id),
	asaplist 	integer REFERENCES asaplist(id) ON DELETE RESTRICT NOT NULL,
	id 			integer PRIMARY KEY REFERENCES task(id) ON DELETE CASCADE
);

CREATE TABLE social_entity(
	id 			integer PRIMARY KEY REFERENCES information(id) ON DELETE CASCADE
);

CREATE TABLE circle(
	id 			integer PRIMARY KEY REFERENCES social_entity(id) ON DELETE CASCADE,
	name 		varchar	NOT NULL UNIQUE
);

CREATE TABLE contact(
	id 			integer PRIMARY KEY REFERENCES social_entity(id) ON DELETE CASCADE
	name 		varchar,
	first_name	varchar,
	middle_names varchar,
	title		varchar,
	prefix		varchar,
	suffix		varchar,
	nickname	varchar,
	birthname	varchar,
	birthday 	date
);

CREATE TABLE circle_member(
	contactid 	integer REFERENCES contact(id) ON DELETE CASCADE,
	circleid 	integer REFERENCES circle(id) ON DELETE CASCADE,
	PRIMARY KEY (contactid, circleid)
);

CREATE TABLE place(
	id 			integer PRIMARY KEY REFERENCES information(id) ON DELETE CASCADE,
	country 	varchar,
	state 		varchar,
	city 		varchar,
	postal_code varchar,
	street 		varchar,
	house 		varchar,
	building 	varchar,
	room 		varchar,
	GPSx 		float,
	GPSy 		float,
	part_of 	integer REFERENCES place(id)
);

CREATE TABLE addresses(
	contactid 	integer REFERENCES contact(id) ON DELETE CASCADE,
	description varchar,
	placeid 	integer REFERENCES place(id) ON DELETE CASCADE,
	PRIMARY KEY (contactid, placeid)
);

CREATE TABLE appointment(
	id 			integer PRIMARY KEY REFERENCES information(id) ON DELETE CASCADE,
	startdate	date 	NOT NULL,
	enddate		date,
	time		time,
	length 		interval,
	description	varchar NOT NULL,
	placeid		integer REFERENCES place(id),
	timezone 	varchar 
);

CREATE TYPE exception_move AS ENUM('no', 'before', 'after');

CREATE TABLE appointment_exception(
	appointmentid 	integer REFERENCES appointment(id) ON DELETE CASCADE,
	exceptionid 	integer REFERENCES appointment(id) ON DELETE CASCADE,
	exception_move 	exception_move DEFAULT 'no' NOT NULL,
	PRIMARY KEY(appointmentid, exceptionid)
);

CREATE TYPE filter_type AS ENUM('dayofweek', 'dayofmonth', 'weekofmonth', 'monthofyear', 'weeksincestart', 'daysincestart', 'monthsincestart', 'yearsincestart');

CREATE TABLE day_filter(
	appointmentid 	integer REFERENCES appointment(id) ON DELETE CASCADE,
	filter_type 	filter_type NOT NULL,
	value 			integer,
	PRIMARY KEY(appointmentid, filter_type, value)
);

CREATE TABLE participants(
	appointmentid integer REFERENCES appointment(id) ON DELETE CASCADE,
	participantid integer REFERENCES social_entity(id) ON DELETE CASCADE,
	PRIMARY KEY (appointmentid, participantid)
);

CREATE TABLE protocol(
	id 			serial PRIMARY KEY,
	name 		varchar NOT NULL UNIQUE
);

CREATE TABLE server(
	id 			serial PRIMARY KEY,
	name 		varchar NOT NULL,
	protocolid 	integer REFERENCES protocol(id) NOT NULL ON DELETE CASCADE,
	UNIQUE(name, protocolid)
);

CREATE TABLE communicator(
	id 			integer PRIMARY KEY REFERENCES information(id) ON DELETE CASCADE,
	default_status status DEFAULT 'inbox' NOT NULL,
	username 	varchar NOT NULL,
	name 		varchar,
	serverid 	integer REFERENCES server(id) NOT NULL ON DELETE CASCADE
);

CREATE TABLE account(
	id 			integer PRIMARY KEY REFERENCES communicator(id) ON DELETE CASCADE,
);

CREATE TABLE accounts(
	contactid 	integer REFERENCES contact(id) ON DELETE CASCADE,
	description varchar,
	accountid 	integer REFERENCES account(id) ON DELETE CASCADE,
	priority 	integer NOT NULL,
	PRIMARY KEY(contactid, accountid)
);

CREATE TABLE room(
	id 			integer PRIMARY KEY REFERENCES communicator(id) ON DELETE CASCADE,
	motd 		varchar
);

CREATE TABLE room_member(
	accountid 	integer REFERENCES account(id) ON DELETE CASCADE,
	roomid 		integer REFERENCES room(id) ON DELETE CASCADE,
	role 		varchar,
	PRIMARY KEY(accountid, roomid)
);

CREATE TYPE online_state AS ENUM ('online', 'away', 'na', 'dnd', 'invisible');

CREATE TABLE "resource"(
	id 			serial PRIMARY KEY,
	name 		varchar,
	status 		online_state,
	message 	varchar
);

CREATE TABLE communication(
	id 			integer PRIMARY KEY REFERENCES information(id) ON DELETE CASCADE,
	"from" 		integer REFERENCES communicator(id) ON DELETE CASCADE,
	time 		timestamp
);

CREATE TABLE message(
	id 			integer PRIMARY KEY REFERENCES communication(id) ON DELETE CASCADE,
	subject 	varchar,
	body 		varchar
);
	
CREATE TABLE presence(
	id 			integer PRIMARY KEY REFERENCES communication(id) ON DELETE CASCADE,
);

CREATE TABLE resources(
	presenceid 	integer PRIMARY KEY REFERENCES presence(id) ON DELETE CASCADE,
	resourceid 	integer PRIMARY KEY REFERENCES "resource"(id) ON DELETE CASCADE,
	PRIMARY KEY(presenceid, resourcid)
);

CREATE TABLE header(
	messageid 	integer PRIMARY KEY REFERENCES message(id) ON DELETE CASCADE,
	content 	varchar
);

CREATE TABLE outbox(
	communicationid integer PRIMARY KEY REFERENCES message(id) ON DELETE CASCADE,
);

CREATE TABLE draft(
	communicationid integer PRIMARY KEY REFERENCES message(id) ON DELETE CASCADE,
);

CREATE TYPE recipient_field AS ENUM('to', 'cc', 'bcc');

CREATE TABLE recipient(
	messageid 	integer REFERENCES message(id) ON DELETE CASCADE,
	accountid 	integer REFERENCES account(id) ON DELETE CASCADE,
	field 		recipient_field,
	"resource" 	varchar,
	PRIMARY KEY(messagid, accountid, field)
);

CREATE TABLE daemon(
	id 			serial PRIMARY KEY,
	name 		varchar NOT NULL,
	status 		varchar NOT NULL,
	timestamp 	timestamp,
	message 	varchar
);

CREATE TABLE useraccount(
	id 			integer PRIMARY KEY REFERENCES account(id) ON DELETE CASCADE,
	password 	varchar,
	status 		online_state,
	message 	varchar
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

CREATE VIEW "type" AS 
			SELECT information.id, 'note' as "type" FROM information, note USING (id)
	UNION	SELECT information.id, 'project' as "type" FROM information, project USING (id)
	UNION	SELECT information.id, 'asap' as "type"  FROM information, asap USING (id)
	UNION	SELECT information.id, 'appointment' as "type" FROM information, appointment USING (id)
	UNION	SELECT information.id, 'circle' as "type" FROM information, circle USING (id)
	UNION	SELECT information.id, 'contact' as "type" FROM information, contact USING (id)
	UNION	SELECT information.id, 'place' as "type" FROM information, place USING (id);


CREATE VIEW "infoview" AS
	SELECT id, EXTRACT(EPOCH FROM created_at) AS created_at, EXTRACT(EPOCH FROM last_edited) AS last_edited, status, "type"
		FROM information, "type" USING (id);


CREATE VIEW "inbox" AS
	SELECT * 
		FROM infoview WHERE status >= 'inbox' AND delay <= CURRENT_TIMESTAMP;


CREATE VIEW "maybe" AS
	SELECT *
		FROM infoview WHERE status = 'maybe';


CREATE VIEW asapview AS
	SELECT i.*, t.description, EXTRACT(EPOCH FROM t.completed) AS completed, l.name AS asaplist, a.project, p.description AS projectdescription
		FROM infoview i
			INNER JOIN task t USING (id) 
			INNER JOIN asap a USING (id) 
			LEFT OUTER JOIN task p ON a.project=p.id 
			INNER JOIN asaplist l ON l.id = a.asaplist;


CREATE VIEW projectview AS
	SELECT i.*, t.description, EXTRACT(EPOCH FROM t.completed) AS completed, p.parent, p.collapsed
		FROM infoview i 
			INNER JOIN task t USING (id)
			INNER JOIN project p USING (id);


CREATE VIEW "appointmentview" AS
	SELECT i.*, "date", time, length, description
		FROM infoview i
			INNER JOIN appointment USING (id);


CREATE VIEW "noteview" AS
	SELECT i.*, content, attachment, f.name AS attachmentname
		FROM infoview i 
			JOIN note n USING (id)
			LEFT OUTER JOIN file f ON f.id = n.attachment;	