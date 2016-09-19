<?php 

$conn = new mysqli("");//old account not accessible
$result=$conn->query("DROP TABLE review;");
if($result){printf("Dropped review.");}
$result=$conn->query("DROP TABLE assignment;");
if($result){printf("Dropped assignment.");}
$result=$conn->query("DROP TABLE section;");
if($result){printf("Dropped section.");}
$result=$conn->query("DROP TABLE class;");
if($result){printf("Dropped class.");}
$result=$conn->query("DROP TABLE professor;");
if($result){printf("Dropped professor.");}
$result=$conn->query("DROP TABLE department;");
if($result){printf("Dropped department.");}
?>
