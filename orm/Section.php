<?php

class Section {
	
	public static function getAllSections($cid) {
		$mysqli = new mysqli("classroom.cs.unc.edu", "sclewis", "comp426", "sclewisdb");
		$result = $mysqli->query("select s.*, p.name from section s, professor p where s.pid = p.pid and cid = $cid order by p.name");
		
		$sections = array();
		while($next = $result->fetch_array()) {
			$tmp = array();
			
			$tmp['sid'] = $next['sid'];
			$tmp['pid'] = $next['pid'];
			$tmp['cid'] = $next['cid'];
			$tmp['semester'] = $next['semester'];
			$tmp['pname'] = $next['name'];
			
			$sections[] = json_encode($tmp);
		}
		
		return $sections;
	}
}



?>