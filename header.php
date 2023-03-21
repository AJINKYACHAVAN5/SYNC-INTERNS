<?php session_start(); ?>
<!DOCTYPE html>
<html>
	<head>
		<title>Student Attendance Monitoring System</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<link href="css/font-awesome.css" rel="stylesheet" media="screen">
		<link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
		<link href="css/jquery.timepicker.css" rel="stylesheet" media="screen">
		<link href="css/jquery-ui.css" rel="stylesheet" media="screen">
		<link href="css/custom.css" rel="stylesheet" media="screen">
		<!-- <script type="text/javascript">
			
		</script> -->
	</head>
	<body class='<?php echo (isset($_SESSION['uid'])) ? "" : "login"; ?>'>
	<div id="mainContext">