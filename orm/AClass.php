<?php

class AClass {
	
	public static function getAllClasses($type, $id) {
		$mysqli = new mysqli("classroom.cs.unc.edu", "sclewis", "comp426", "sclewisdb");
		$classes = array();
		
		if($type == "department") {
			$result = $mysqli->query("select * from class where did = $id order by name");
			
			while($next = $result->fetch_array()) {
				$tmp = array();
				
				$tmp['cid'] = $next['cid'];
				$tmp['name'] = $next['name'];
				$tmp['did'] = $next['did'];
				
				$classes[] = json_encode($tmp);
			}
			
		} else if($type == "professor") {
			$result = $mysqli->query("select c.name, c.cid, c.did
										from class c, section s, professor p
										where s.pid = p.pid and s.cid = c.cid and p.pid = $id
										order by c.name");
			while($next = $result->fetch_array()) {
				$tmp = array();
				
				$tmp['name'] = $next['name'];
				$tmp['cid'] = $next['cid'];
				$tmp['did'] = $next['did'];
				
				$classes[] = json_encode($tmp);
			}
		}
		
		return $classes;
	}
}



?>