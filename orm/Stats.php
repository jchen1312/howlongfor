<?php

class Stats {
	
	public static function get10longestAssignments() {
		$mysqli = new mysqli("classroom.cs.unc.edu", "sclewis", "comp426", "sclewisdb");
		$result = $mysqli->query("select c.name as cname,p.name as pname, s.semester, a.number as anum, floor(avg(r.time)/60) as hours, floor(avg(r.time)%60) as minutes
									from review r, class c, section s, assignment a, professor p
									where r.aid = a.aid
										and s.sid = a.sid
									    and s.pid = p.pid
									    and s.cid = c.cid
									    group by r.aid
									    order by avg(r.time) DESC
									    LIMIT 0,10;");
		$stats = array();
		while($next = $result->fetch_array()) {
				$tmp = array();
				
				$tmp['cname'] = $next['cname'];
				$tmp['pname'] = $next['pname'];
				$tmp['semester'] = $next['semester'];
				$tmp['anum'] = $next['anum'];
				$tmp['hours'] = $next['hours'];
				$tmp['minutes'] = $next['minutes'];
				
				$stats[] = json_encode($tmp);
			}
		return $stats;
	}
	
	public static function get10fastestAssignments() {
		$mysqli = new mysqli("classroom.cs.unc.edu", "sclewis", "comp426", "sclewisdb");
		$result = $mysqli->query("select c.name as cname,p.name as pname, s.semester, a.number as anum, floor(avg(r.time)/60) as hours, floor(avg(r.time)%60) as minutes
									from review r, class c, section s, assignment a, professor p
									where r.aid = a.aid
										and s.sid = a.sid
									    and s.pid = p.pid
									    and s.cid = c.cid
									    group by r.aid
									    order by avg(r.time) ASC
									    LIMIT 0,10;");
		$stats = array();
		while($next = $result->fetch_array()) {
				$tmp = array();
				
				$tmp['cname'] = $next['cname'];
				$tmp['pname'] = $next['pname'];
				$tmp['semester'] = $next['semester'];
				$tmp['anum'] = $next['anum'];
				$tmp['hours'] = $next['hours'];
				$tmp['minutes'] = $next['minutes'];
				
				$stats[] = json_encode($tmp);
			}
		return $stats;
	}
	
	public static function get10longestSections() {
		$mysqli = new mysqli("classroom.cs.unc.edu", "sclewis", "comp426", "sclewisdb");
		$result = $mysqli->query("select results.cname, results.pname, results.semester, floor(sum(results.time)/60) as hours, floor(sum(results.time)%60) as minutes from 
											(select s.sid, c.name as cname,p.name as pname, s.semester, a.number as anum, floor(avg(r.time)) as time
											from review r, class c, section s, assignment a, professor p
											where r.aid = a.aid
											and s.sid = a.sid
										    and s.pid = p.pid
										    and s.cid = c.cid
										    group by s.sid, a.aid) as results
									group by results.sid
									order by sum(results.time) DESC
									LIMIT 0,10;");
		$stats = array();
		while($next = $result->fetch_array()) {
				$tmp = array();
				
				$tmp['cname'] = $next['cname'];
				$tmp['pname'] = $next['pname'];
				$tmp['semester'] = $next['semester'];
				$tmp['hours'] = $next['hours'];
				$tmp['minutes'] = $next['minutes'];
				
				$stats[] = json_encode($tmp);
			}
		return $stats;
	}
	
	public static function get10shortestSections() {
		$mysqli = new mysqli("classroom.cs.unc.edu", "sclewis", "comp426", "sclewisdb");
		$result = $mysqli->query("select results.cname, results.pname, results.semester, floor(sum(results.time)/60) as hours, floor(sum(results.time)%60) as minutes from 
											(select s.sid, c.name as cname,p.name as pname, s.semester, a.number as anum, floor(avg(r.time)) as time
											from review r, class c, section s, assignment a, professor p
											where r.aid = a.aid
											and s.sid = a.sid
										    and s.pid = p.pid
										    and s.cid = c.cid
										    group by s.sid, a.aid) as results
									group by results.sid
									order by sum(results.time) ASC
									LIMIT 0,10;");
		$stats = array();
		while($next = $result->fetch_array()) {
				$tmp = array();
				
				$tmp['cname'] = $next['cname'];
				$tmp['pname'] = $next['pname'];
				$tmp['semester'] = $next['semester'];
				$tmp['hours'] = $next['hours'];
				$tmp['minutes'] = $next['minutes'];
				
				$stats[] = json_encode($tmp);
			}
		return $stats;
	}
}


?>