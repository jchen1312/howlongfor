SELECT d.did FROM department d WHERE d.abbreviation='INPUT';

INSERT INTO professor(did,name) VALUES ($did_PHPVAR, 'profname_INPUT');

SELECT p.pid FROM professor p WHERE p.did=$did_PHPVAR AND p.name='profname_INPUT');

INSERT INTO class (did,name) VALUES ($did_PHPVAR, 'classname_INPUT');

SELECT c.cid FROM class c WHERE c.did=$did_PHPVAR AND c.name='classname_INPUT');

INSERT INTO section(pid,cid,semester) VALUES ($pid_PHPVAR, $cid_PHPVAR, 'semester_INPUT');

SELECT s.sid FROM section s WHERE s.semester='semester_INPUT' AND s.pid=$pid_PHPVAR AND s.cid=$pid_PHPVAR;

INSERT INTO assignment(number, sid) VALUES (assignnumber_INPUT, $sid_PHPVAR);

SELECT a.aid FROM assignment a WHERE a.number=assignnumber_INPUT AND a.sid=$sid_PHPVAR;

INSERT INTO review(grade, time, difficulty, aid, description) VALUES ('grade_INPUT', time_INPUT, difficulty_INPUT, $aid_PHPVAR, 'description_INPUT');

SELECT r.rid FROM review r WHERE r.grade='grade_INPUT' AND r.time=time_INPUT and r.difficulty=difficulty_INPUT AND r.aid=$aid_PHPVAR AND r.description='description_INPUT';

Note: time should be in minutes, rounded down to the nearest minute. 


