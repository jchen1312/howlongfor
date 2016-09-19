<?php

class Department {
	
	public static function getAllDepartments() {
		$mysqli = new mysqli("classroom.cs.unc.edu", "sclewis", "comp426", "sclewisdb");
		$result = $mysqli->query("select * from department order by abbreviation");
		
		$dept_array = array();
		while($next = $result->fetch_array()) {
			$tmp = array();
			
			$tmp['did'] = intval($next['did']);
			$tmp['name'] = $next['name'];
			$tmp['abbreviation'] = $next['abbreviation'];
			
			$dept_array[] = json_encode($tmp);
		}
		return $dept_array;
	}
	
}


?>