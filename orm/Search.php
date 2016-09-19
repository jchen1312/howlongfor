<?php

class Search {
	
	public static function doSearch($type, $input) {
		$mysqli = new mysqli("classroom.cs.unc.edu", "sclewis", "comp426", "sclewisdb");
		
		$results_array = array();
		if($type == "class") {
			$result = $mysqli->query("select * from class where name like '%$input%' order by name");
			
			while($next = $result->fetch_array()) {
				$tmp = array();
				
				$tmp['cid'] = $next['cid'];
				$tmp['name'] = $next['name'];
				$tmp['did'] = $next['did'];
				
				$results_array[] = json_encode($tmp);
			}
		}
		else if($type == "professor") {
			$result = $mysqli->query("select c.name, c.cid, c.did
										from class c, section s, professor p
										where s.pid = p.pid and s.cid = c.cid and 
										p.name like '%$input%'
										order by c.name");
			if($result->num_rows > 0) {
				while($next = $result->fetch_array()) {
					$tmp = array();
					
					$tmp['cid'] = $next['cid'];
					$tmp['name'] = $next['name'];
					$tmp['did'] = $next['did'];
					
					$results_array[] = json_encode($tmp);
				}
			} else {
				return null;
			}
		}
		
		return $results_array;
	}
}

?>