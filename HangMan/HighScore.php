<?php
	error_reporting(E_ALL);
	require_once 'SupportPortalLogger.php';
	$filename = preg_replace('/\.php$/', '', __FILE__);
	$log = new SupportPortalLogger($filename); 

	$data = json_decode(file_get_contents("php://input"));

	$con = new mysqli("localhost", "root", "password", "test1");
	if ($con->connect_errno) {
		$log->error("Failed to connect to MySQL: (" . $con->connect_errno . ") " . $con->connect_error);
		exit(0);
	}   

	$log->info("Received data: score: $data->score, date: $data->date");

	$score = $data->score;
	$date = $data->date;
	$newScoreInsertionQuery = "INSERT INTO Scores (id, scoreDate, score) VALUES (NULL, NOW(), $score)";
	$res = $con->query($newScoreInsertionQuery);
	$log->info("Score has been updated via the following query: $newScoreInsertionQuery");

	$getHighScoreQuery = "SELECT * FROM `Scores` ORDER BY `score` desc";
	$result = $con->query($getHighScoreQuery);
	$jsonArray = array();
	$rowCount = 0;
	$highScore = false;
	while ($row = $result->fetch_assoc()) {
		if ($rowCount == 0) {
			if ($row["score"] == $data->score) {
				$log->info("NEW HIGH SCORE: $data->score");
				array_push($jsonArray, $row);
				$highScore = true;
				break;
			}
		}
		$rowCount+=1;
	}
 
 	/* this is wicked ghetto but idc */
 	if (!$highScore) {
 		$log->info("$data->score was NOT a high score!");
 		$falseArray = array();
 		array_push($falseArray, false);
 		array_push($jsonArray, $falseArray);
 	}

	$con->close();

	echo(json_encode($jsonArray));
?>
