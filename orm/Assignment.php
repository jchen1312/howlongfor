<?php

class Assignment {
	
	public static function getAllAssignments($sid) {
		$mysqli = new mysqli("classroom.cs.unc.edu", "sclewis", "comp426", "sclewisdb");
		$result = $mysqli->query("select a.aid, a.number, a.sid, c.name as cname, p.name as pname, s.semester 
									from assignment a, class c, professor p, section s 
									where a.sid = s.sid
									and s.cid = c.cid
									and s.pid = p.pid
									and a.sid = $sid");
		
		$assignments = array();
		while($next = $result->fetch_array()) {
			$tmp = array();
			
			$tmp['aid'] = $next['aid'];
			$tmp['number'] = $next['number'];
			$tmp['sid'] = $next['sid'];
			$tmp['cname'] = $next['cname'];
			$tmp['pname'] = $next['pname'];
			$tmp['semester'] = $next['semester'];
			
			$assignments[] = json_encode($tmp);
		}
		
		return $assignments;
	}
}

?>