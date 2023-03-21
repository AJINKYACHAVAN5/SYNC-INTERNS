<?php 
if(!session_id()):
	session_start(); 
endif;
?>
		<div class="navbar navbar-fixed-top" role="navigation">
		  <div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
			  <span class="sr-only">Toggle navigation</span>
			  <span class="icon-bar"></span>
			  <span class="icon-bar"></span>
			  <span class="icon-bar"></span>
			</button>
			<a class="navbar-brand"><h1><b>Attendance Monitoring System</b></h1></a>
		  </div>
		  <div class="collapse navbar-collapse navbar-ex1-collapse">
			<ul id="topNav" class="nav navbar-nav navbar-right">
					<div class="clock">
						<ul>
							<li id="Date"> </li>&nbsp&nbsp&nbsp
							<li id="hours"> </li>
							<li id="point">:</li>
							<li id="min"> </li>
							<li id="point">:</li>
							<li id="sec"> </li>
						</ul>
					</div>
				<li><a rel="index" href="#!/index"><button type="button" class="btn btn-info">HOME</button></a></li>
			<?php if($_SESSION['level'] == 3): ?>
				<li><a rel="subject" href="#!/subject"><button type="button" class="btn btn-info">SUBJECT</button></a></li>
				<li><a rel="yearlevel" href="#!/yearlevel"><button type="button" class="btn btn-info">YEAR LEVELS</button></a></li>
				<li><a rel="teacher" href="#!/teacher"><button type="button" class="btn btn-info">TEACHER</button></a></li>
				<li><a rel="student" href="#!/student"><button type="button" class="btn btn-info">STUDENT</button></a></li>
				<?php endif; ?>
				<?php if($_SESSION['level'] == 2): ?>
				<li><a href="#!/attendance" rel="attendance"><button type="button" class="btn btn-info">ATTENDANCE</button></a></li>
				<li><a href="#!/teacherstudents" rel="teacherstudents"><button type="button" class="btn btn-info">STUDENT</button></a></li>
				<?php endif; ?>
				<?php if($_SESSION['level'] == 1): ?>
				<li><a rel="tracking" href="#!/tracking">TRACKING</a></li>
				<?php endif; ?>
				<?php if($_SESSION['level'] == 0): ?>
				<li><a rel="teacherslist" href="#!/teacherslist"><button type="button" class="btn btn-info">TEACHER</button></a></li>
				<li><a rel="sectioninfo" href="#!/sectioninfo"><button type="button" class="btn btn-info">SECTION INFO</button></a></li>
				<li><a rel="checklog" href="#!/checklog"><button type="button" class="btn btn-info">ATTENDANCE LOG</button></a></li>
				<?php endif; ?>
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown"><button type="button" class="btn btn-info">Welcome <?php echo $_SESSION['firstname']; ?> <b class="caret"></b></button></a>
					<ul class="dropdown-menu">
						<li><a href="#!/logout"><i class="fa fa-sign-out"></i> Logout</a></li>
					</ul>
				</li>
			</ul>
		  </div>
		</div>
			<?php if($_SESSION['level'] == 1): ?>
			<a class="btn btn-info" target="_blank" style="margin-top:10px;width:100%;" href="reportpdf.php?action=print&type=tracking&place=<?php echo $_SESSION['area_privilege']; ?>"><i class="fa fa-print"></i> Generate Report</a>
			<?php endif; ?>
		<div id="contextArea" class="row"></div>