<?php

require_once('orm/Review.php');
require_once('orm/AClass.php');
require_once('orm/Assignment.php');
require_once('orm/Section.php');
require_once('orm/Department.php');
require_once('orm/Search.php');
require_once('orm/Stats.php');

$path_components = explode('/', $_SERVER['PATH_INFO']);

if($_SERVER['REQUEST_METHOD'] == "GET") {
	
	// following matches /HLFP.php/department
	// returns json of all departments
	if(count($path_components) >= 2 && $path_components[1] == "department") {
		header("Content-type: application/json");
		echo json_encode(Department::getAllDepartments());
		exit();
	}
	
	else if(count($path_components) >= 3 && $path_components[1] == "stats") {
		$stat = $path_components[2];
		
		// following matches /HLFP.php/stats/10longest
		if($stat == "10longestAssignments") {
			echo json_encode(Stats::get10longestAssignments());
			exit();
		}
		else if($stat == "10fastestAssignments") {
			echo json_encode(Stats::get10fastestAssignments());
			exit();
		}
		else if($stat == "10longestSections") {
			echo json_encode(Stats::get10longestSections());
			exit();
		}
		else if($stat == "10shortestSections") {
			echo json_encode(Stats::get10shortestSections());
			exit();
		}
	}
	
	else if(count($path_components) >= 4) {
		$returnType = $path_components[1];
		$filterType = $path_components[2];
		$filterValue = $path_components[3];
		
		// following matches /HLFP.php/class/professor/<pid>
		// returns json of all classes taught by a particular professor
		if($returnType == "class" &&
			$filterType == "professor") {
				header("Content-type: application/json");
				echo json_encode(AClass::getAllClasses($filterType, $filterValue));
				exit();
		}
		
		// folowing matches /HLFP.php/class/department/<did>
		// returns json of all classes in a particular department
		else if($returnType == "class" &&
			$filterType == "department") {
				header("Content-type: application/json");
				echo json_encode(AClass::getAllClasses($filterType, $filterValue));
				exit();
		}
		
		// following matches /HLFP.php/section/class/<cid>
		// returns json of all sections for a particular class
		else if($returnType == "section" &&
			$filterType == "class") {
				header("Content-type: application/json");
				echo json_encode(Section::getAllSections($filterValue));
				exit();
		}
		
		// following matches /HLFP.php/assignment/section/<sid>
		// returns json of all assignments for a particular section
		else if($returnType == "assignment" &&
			$filterType == "section") {
				header("Content-type: application/json");
				echo json_encode(Assignment::getAllAssignments($filterValue));
				exit();
		}
		
		// following matches /HLFP.php/review/assignment/<aid>
		// returns json of all reviews for a particular assignment
		else if($returnType == "review" &&
			$filterType == "assignment") {
				header("Content-type: application/json");
				echo json_encode(Review::getAllReviews($filterValue));
				exit();
		}
		
		// following matches /HLFP.php/search/<type>/<input>
		// <type> will be "class" or "professor"
		// <input> is user input
		// returns json of all classes with similar class name or 
		// taught by similar professor name depeding on <type>
		else if($returnType == "search") {
			header("Content-type: application/json");
			echo json_encode(Search::doSearch($filterType, $filterValue));
			exit();
		}
		
		// doesn't match anything
		else {
			header("HTTP/1.0 400 Bad Request");
			echo "Error, request not understood";
			exit();
		}
		
	}
	
} else if($_SERVER['REQUEST_METHOD'] == "POST") {
	$mysqli = new mysqli("classroom.cs.unc.edu", "sclewis", "comp426", "sclewisdb");
	
	// Following matches request to insert review
	// Returns rid of inserted review if successful, Null if not
		
		//get did, assume department already exists
		$dept = substr(trim($_POST['class']), 0, 4);
		$result = $mysqli->query("select d.did from department d where d.abbreviation = '$dept'");
		if($result) {
			$row = $result->fetch_array();
			$did = $row['did'];
		}
		
		//insert professor
		$prof = trim($_POST['professor']);
		$result = $mysqli->query("SELECT p.pid FROM professor p WHERE p.did=$did AND p.name='$prof'");
		if($result) {
			if($result->num_rows == 0) {
				$result = $mysqli->query("INSERT INTO professor(did,name) VALUES ($did, '$prof')");
				$pid = $mysqli->insert_id;
			} else {
				$row = $result->fetch_array();
				$pid = $row['pid'];
			}
		}
		
		//insert class
		$class = trim($_POST['class']);
		$result = $mysqli->query("SELECT c.cid FROM class c WHERE c.did=$did AND c.name='$class'");
		if($result) {
			if($result->num_rows == 0) {
				$result = $mysqli->query("INSERT INTO class (did,name) VALUES ($did, '$class')");
				$cid = $mysqli->insert_id;
			} else {
				$row = $result->fetch_array();
				$cid = $row['cid'];
			}
		}
		
		//insert section
		$semester = trim($_POST['semester']);
		$result = $mysqli->query("SELECT s.sid FROM section s WHERE s.semester='$semester' AND s.pid=$pid AND s.cid=$cid");
		if($result) {
			if($result->num_rows == 0) {
				$result = $mysqli->query("INSERT INTO section(pid,cid,semester) VALUES ($pid, $cid, '$semester')");
				$sid = $mysqli->insert_id;
			} else {
				$row = $result->fetch_array();
				$sid = $row['sid'];
			}
		}
		
		//insert assignment
		$assignment = trim($_POST['assignment']);
		$result = $mysqli->query("SELECT a.aid FROM assignment a WHERE a.number=$assignment AND a.sid=$sid");
		if($result) {
			if($result->num_rows == 0) {
				$result = $mysqli->query("INSERT INTO assignment(number, sid) VALUES ($assignment, $sid)");
				$aid = $mysqli->insert_id;
			} else {
				$row = $result->fetch_array();
				$aid = $row['aid'];
			}
		}
		
		//insert review
		$grade = $_POST['grade'];
		$time = doubleval($_POST['time']) * 60;
		$difficulty = $_POST['difficulty'];
		$description = $_POST['description'];
		$result = $mysqli->query("INSERT INTO review(grade, time, difficulty, aid, description) VALUES ('$grade', $time, $difficulty, $aid, '$description')");
		if($result) {
			$rid = $mysqli->insert_id;
			echo $rid;
		} else {
			echo null;
		}
		
		exit();
}




?>