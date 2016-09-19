<?php 

$conn = new mysqli("classroom.cs.unc.edu", "sclewis", "comp426", "sclewisdb");

$result=$conn->query("CREATE TABLE department (did int NOT NULL AUTO_INCREMENT, name varchar(255), abbreviation varchar(255), PRIMARY KEY (did));");
$result=$conn->query("CREATE TABLE professor (pid int NOT NULL AUTO_INCREMENT, name varchar(255), did int NOT NULL, PRIMARY KEY (pid), FOREIGN KEY (did) REFERENCES department(did));");
$result=$conn->query("CREATE TABLE class (cid int NOT NULL AUTO_INCREMENT, name varchar(255), did int NOT NULL, PRIMARY KEY (cid), FOREIGN KEY (did) REFERENCES department(did));");
$result=$conn->query("CREATE TABLE section (sid int NOT NULL AUTO_INCREMENT, pid int NOT NULL, cid int NOT NULL, semester varchar(255), PRIMARY KEY (sid), FOREIGN KEY (pid) REFERENCES professor(pid), FOREIGN KEY (cid) REFERENCES class(cid));");
$result=$conn->query("CREATE TABLE assignment (aid int NOT NULL AUTO_INCREMENT, number int NOT NULL, sid int NOT NULL, PRIMARY KEY (aid), FOREIGN KEY (sid) REFERENCES section(sid));");
$result=$conn->query("CREATE TABLE review(rid int NOT NULL AUTO_INCREMENT, grade varchar(2), time int, difficulty int, aid int NOT NULL, description varchar(255), PRIMARY KEY (rid), FOREIGN KEY (aid) REFERENCES assignment(aid));");


$fileData = file_get_contents("finalData.txt");
if(!$fileData)	printf("File couldn't open.");
else {
	$entries = explode("\r\n~\r\n",$fileData);//going to use \n~\n as a delimeter between entities
	$count=0;
	foreach ($entries as $entry){
		$blocks=explode("\r\n^\r\n",$entry);
		//printf(sizeof($blocks));
		$lines = explode("\n",$blocks[0]);//break up entry into lines
		//printf(sizeof($lines));
		//An entry looks like (~ are delimeters between entries)
		//~
		//department name
		//professor name
		//class name
		//semester
		//^
		//assignmentNumber
		//numReviews
		//grade
		//hours minutes
		//difficulty
		//description (the last four lines (grade-description) are repeated numReviews times
		//~
		$count++;
		if(sizeof($lines)<5){continue;}
		//printf("$count   .  ");
		
		$department = rtrim($lines[0]);
		$abbreviation=rtrim($lines[1]);
		$professor = rtrim($lines[2]);
		$class = rtrim($lines[3]);
		$semester = rtrim($lines[4]);
		
		$result=$conn->query("SELECT * FROM department WHERE name='$department' AND abbreviation='$abbreviation';");
		if($result->num_rows==0){
			if(strlen("$department")==0){
				printf("Invalid department");
			}
			$result=$conn->query("INSERT INTO department (name,abbreviation) VALUES ('$department','$abbreviation');");
		}
		$result=$conn->query("SELECT * FROM department WHERE name='$department' AND abbreviation='$abbreviation';");
		$thisDepartment = $result->fetch_row();
		$did=$thisDepartment[0];
		//printf("Department found=$did     .");
		
		
		$result=$conn->query("SELECT * FROM  professor p WHERE p.name='$professor' AND p.did=$did;");
		if($result->num_rows==0){
			$result=$conn->query("INSERT INTO professor (name, did) VALUES('$professor', $did);");
		}
		$result=$conn->query("SELECT * FROM professor p WHERE p.name='$professor' AND p.did=$did;");
		$thisProf = $result->fetch_row();
		$pid=$thisProf[0];
	//	printf("Prof found=$pid      .");
		
		$result=$conn->query("SELECT * FROM class c WHERE c.name='$class' AND c.did=$did;");
		if($result->num_rows==0){
			$result=$conn->query("INSERT INTO class(name, did) VALUES('$class', $did);");
		}
		$result=$conn->query("SELECT * FROM class c WHERE c.name='$class' AND c.did=$did;");
		$thisClass = $result->fetch_row();
		$cid=$thisClass[0];
		//printf("Class found=$cid     .");
		
		$result=$conn->query("SELECT * FROM section s WHERE s.semester='$semester' AND s.pid=$pid AND s.cid=$cid;");
		if($result->num_rows==0){
			$result=$conn->query("INSERT INTO section(semester, pid, cid) VALUES('$semester', $pid, $cid);");
		}
		$result=$conn->query("SELECT * FROM section s WHERE s.semester='$semester' AND s.pid=$pid AND s.cid=$cid;");
		$thisSection = $result->fetch_row();
		$sid=$thisSection[0];
		//printf("Section found=$sid     .");
	
		$numAssigns=sizeof($blocks);
		for($j=1; $j<$numAssigns; $j++){
			$lines = explode("\n",$blocks[$j]);
			$assignment = rtrim($lines[0]);
			$numReviews = rtrim($lines[1]);
			$result=$conn->query("SELECT * FROM assignment a WHERE a.sid=$sid AND a.number=$assignment;");
			if($result->num_rows==0){
				$result=$conn->query("INSERT INTO assignment(number, sid) VALUES($assignment,$sid);");
			}
		
			$result=$conn->query("SELECT * FROM assignment a WHERE a.sid=$sid AND a.number=$assignment;");
			$thisAssignment = $result->fetch_row();
			$aid=$thisAssignment[0];
		//	printf("Assignment found=$aid     .");
			
			$start=2;
			for($i=0; $i<$numReviews; $i++){
				$offset=4*$i;
				$grade = rtrim($lines[$start+$offset]);
				$time = explode(" ",rtrim($lines[$start+$offset+1]));//break it up into hours, minutes
				$hours = $time[0];
				if(sizeof($time)==2){
					$minutes = $time[1] + 60*$hours;//only store number of minutes, do conversions back to hours/mins at end
				}
				else{
					$minutes = 60*$hours;//only store number of minutes, do conversions back to hours/mins at end
				}
				$difficulty = rtrim($lines[$start+$offset+2]);
				$description=rtrim($lines[$start+$offset+3]);
				$result=$conn->query("INSERT INTO review(grade, time, difficulty, aid,description) VALUES('$grade', $minutes, $difficulty, $aid,'$description');");//use it in the next query (simplifies this query greatly)
			}
		}
	}
}

printf("done");	
?>
