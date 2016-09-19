<?php

class Review
{
	private $rid;
	private $grade;
	private $time;
	private $difficulty;
	private $comment;
	private $aid;
	
	public static function create($grade, $time, $difficulty, $comment, $aid) {
		$mysqli = new mysqli("classroom.cs.unc.edu", "sclewis", "comp426", "sclewisdb");
		$result = $mysqli->query("insert into review values ('".
									$mysqli->real_escape_string($grade)."', '".
									$mysqli->real_escape_string($comment)."', ".
									$time.", ".
									$difficulty.", ".
									$aid.")");
		if($result) {
			$rid = $result->insert_id;
			return new Review($rid,$grade,$time,$difficulty,$comment, $aid);
		}
		return null;
	}
	
	public static function findById($id) {
		$mysqli = new mysqli("classroom.cs.unc.edu", "sclewis", "comp426", "sclewisdb");
		$result = $mysqli->query("select * from review where rid = ".$id);
		
		if($result) {
			if($result->num_rows == 0) {
				return null;
			}
			
			$data = $result->fetch_array();
			return new Review($data['rid'],
								$data['grade'],
								$data['time'],
								$data['difficulty'],
								$data['description'],
								$data['aid']);
		}
	}
	
	public static function getAllReviews($a_id) {
		$mysqli = new mysqli("classroom.cs.unc.edu", "sclewis", "comp426", "sclewisdb");
		$result = $mysqli->query("select r.*, c.name as cname, p.name as pname, s.semester, a.number 
									from review r, class c, professor p, assignment a, section s 
									where r.aid = a.aid
									and s.sid = a.sid
									and s.cid = c.cid
									and s.pid = p.pid
									and r.aid = ".$a_id);
		
		if($result->num_rows == 0) {
			return null;
		}
		
		$review_array = array();
		while($next_row = $result->fetch_array()) {
			$temp_array = array();
			
			$temp_array['rid'] = intval($next_row['rid']);
			$temp_array['grade'] = $next_row['grade'];
			$temp_array['time'] = intval($next_row['time']);
			$temp_array['difficulty'] = intval($next_row['difficulty']);
			$temp_array['comment'] = $next_row['description'];
			$temp_array['aid'] = intval($next_row['aid']);
			$temp_array['cname'] = $next_row['cname'];
			$temp_array['pname'] = $next_row['pname'];
			$temp_array['semester'] = $next_row['semester'];
			$temp_array['number'] = $next_row['number'];
			
			$review_array[] = json_encode($temp_array);
		}
		return $review_array;
	}
	
	private function __construct($rid, $grade, $time, $difficulty, $comment, $aid) {
		$this->$rid = $rid;
		$this->$grade = $grade;
		$this->$time = $time;
		$this->$difficulty = $difficulty;
		$this->$comment = $comment;
		$this->$aid = $aid;
	}
	
	public function getRid() {
		return $this->$rid;
	}
	
	public function getGrade() {
		return $this->$grade;
	}
	
	public function getTime() {
		return $this->$time;
	}
	
	public function getDifficulty() {
		return $this->$difficulty;
	}
	
	public function getComment() {
		return $this->$comment;
	}
	
	public function getAid() {
		return $this->$aid;
	}
}

?>