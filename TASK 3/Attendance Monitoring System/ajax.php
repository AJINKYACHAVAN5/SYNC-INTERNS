<?php
	session_start();
	require_once "db.php";
	require_once "functions.php";
	$conn = Database::getInstance();
	date_default_timezone_set("Etc/GMT-8");
	if(isset($_POST['action'])){
		if($_POST['action'] == "deleteStudent"){
			echo System::deleteStudent($_POST['sid']);
		}
		if($_POST['action'] == "deleteSubject"){
			echo System::deleteSubject($_POST['subjid']);
		}
		if($_POST['action'] == "teacherLogAttendance"){
			echo System::teacherLogAttendance($_POST['subjtid']);
		}
		if($_POST['action'] == "deleteSectionStudent"){
			echo System::deleteSectionStudent($_POST['ylssid']);
		}
		if($_POST['action'] == "delete_yearlevel"){
			echo System::deleteYearLevel($_POST['yearlevelid']);
		}
		if($_POST['action'] == "add_student_to_section"){
			echo System::addStudentToSection($_POST);
		}
		if($_POST['action'] == "add_subject_teacher_section"){
			echo System::addSubjectTeacherSection($_POST);
		}
		if($_POST['action'] == "add_section_to_yearlevel"){
			echo System::addSectionYearLevel($_POST);
		}
		if($_POST['action'] == "add_yearlevel"){
			echo System::addYearLevel($_POST);
		}
		if($_POST['action'] == "login"){
			$username = $_POST['username'];
			$password = md5($_POST['password']);
			$stmt = $conn->db->prepare("SELECT * FROM login WHERE username = ? AND password = ? ");
			$stmt->execute( array($username,$password) );
			$row = $stmt->fetch();
			if(!empty($row)){
				$_SESSION['uid'] = $row['uid'];
				$_SESSION['username'] = $row['username'];
				$_SESSION['level'] = $row['level'];
				if($row['level'] == 2){
					$fetchInfo = $conn->db->prepare("SELECT * FROM teacher_info WHERE tid = ?");
					$fetchInfo->execute( array($row['tid']) );
					$info = $fetchInfo->fetch();
					$_SESSION['firstname'] = $info['firstname'];
					$_SESSION['lastname'] = $info['lastname'];
					$_SESSION['tid'] = $info['tid'];
					$_SESSION['image'] = $info['image'];
				} else if($row['level'] == 0){
					$fetchInfo = $conn->db->prepare("SELECT * FROM student_info WHERE sid = ?");
					$fetchInfo->execute( array($row['sid']) );
					$info = $fetchInfo->fetch();
					$_SESSION['firstname'] = $info['firstname'];
					$_SESSION['lastname'] = $info['lastname'];
					$_SESSION['sid'] = $info['sid'];
					$_SESSION['image'] = $info['image'];
				} else if($row['level'] == 1){
					$fetchInfo = $conn->db->prepare("SELECT * FROM personnel_info WHERE personnel_id = ?");
					$fetchInfo->execute( array($row['personnel_id']) );
					$info = $fetchInfo->fetch();
					$_SESSION['firstname'] = $info['firstname'];
					$_SESSION['lastname'] = $info['lastname'];
					$_SESSION['personnel_id'] = $info['personnel_id'];
					$_SESSION['image'] = $info['image'];
					$_SESSION['area_privilege'] = $info['area_privilege'];
				} else {
					$_SESSION['firstname'] = $row['firstname'];
					$_SESSION['lastname'] = $row['lastname'];
				}
				echo 1;
			} else {
				echo 0;
			}	
		}
		if($_POST['action'] == "loginForm"){
			if(isset( $_SESSION['uid'] )){
				echo 1;
			} else {
				echo 0;
			}	
		}
		if($_POST['action'] == "logout"){
			unset($_SESSION);
			session_destroy();
		}
		if($_POST['action'] == "add_subject"){
			echo System::addSubject($_POST);
		}
		if($_POST['action'] == "add_student"){
			echo System::addStudent($_POST,$_FILES);
		}
		if($_POST['action'] == "add_personnel"){
			echo System::addPersonnel($_POST,$_FILES);
		}
		if($_POST['action'] == "add_teacher"){
			echo System::addTeacher($_POST,$_FILES);
		}
		if($_POST['action'] == "add_subject_teacher"){
			echo System::addSubjectTeacher($_POST);
		}
		if($_POST['action'] == "add_subject_teacher_student"){
			echo System::addSubjectTeacherStudent($_POST);
		}
		if($_POST['action'] == "removeSubjectTeacher"){
			echo System::removeSubjectTeacher($_POST);
		}
		if($_POST['action'] == "removeStudentSubjectTeacher"){
			echo System::removeStudentSubjectTeacher($_POST);
		}
		if($_POST['action'] == "deleteTeacher"){
			echo System::deleteTeacher($_POST);
		}
		if($_POST['action'] == "logAttendace"){
			echo System::logAttendace($_POST);
		}
		if($_POST['action'] == "loadTeachersStudentBySubject"){
			$studentsList = System::getTeachersStudentBySubject($_POST['tid'],$_POST['subjtid']);
			if(!empty($studentsList)):
?>
			<div class="row">
			<?php foreach($studentsList as $key => $student): ?>
			<div class="col-xs-6 col-md-2">
				<div class="thumbnail">
					<img src="uploads/<?php echo $student['image']; ?>" alt="">
					<div class="caption">
						<h5><?php echo $student['firstname']." ".$student['lastname']; ?></h5>
					</div>
				</div>
			</div>
			<?php endforeach; ?>
			</div>
			<a class="btn btn-info pull-right" target="_blank" style="margin-top:10px;" href="reportpdf.php?action=print&type=subjstudents&tid=<?php echo $_POST['tid']; ?>&subjid=<?php echo $_POST['subjtid']; ?>"><i class="fa fa-print"></i> Print</a>
<?php		
			else:
?>
			<div class="alert alert-info">
				<p>No Student's are enrolled in this subject.</p>
			</div>
<?php			
			endif;
		}
		if($_POST['action'] == "loadAllTeacherSubjectStudent"){
			$currentTime = strtotime(date("h:i A"));
			$subjtidInfo = System::getSubjectTeacherInfo($_POST['subjtid']);
			if($currentTime >= strtotime(date("h:i A", strtotime($subjtidInfo['starttime']))) && $currentTime <= strtotime(date("h:i A", strtotime($subjtidInfo['endtime'])))){
			$loadAllTeacherSubjectStudent = System::loadAllTeacherSubjectStudent($_POST);
			if(!empty($loadAllTeacherSubjectStudent)):
				$html = '';
				$html .= '<div class="row"><div id="formAttendance" class="form-group col-md-offset-4 col-md-4"><input type="text" class="form-control" id="barcode" value="" name="barcodeid" placeholder="" typetrack="attendance"><input type="hidden" id="subjtid" name="subjtid" value="'.$_POST['subjtid'].'" /></div></div>';
				$html .= '<div class="row">';
				foreach($loadAllTeacherSubjectStudent as $student):
					if($student['loginStat'] == 1){
						$active = '<div class="alert alert-info" style="margin:0;text-align:center;font-family:opensans_semibold_macroman">Present</div>';
					} else if($student['loginStat'] == 2){
						$active = '<div class="alert alert-warning" style="margin:0;text-align:center;font-family:opensans_semibold_macroman">Late</div>';
					} else if($student['loginStat'] == 3){
						$active = '<div class="alert alert-danger" style="margin:0;text-align:center;font-family:opensans_semibold_macroman">Absent</div>';
					} else {
						$active = '';
					}
					
					$html .= '<div class="col-sm-2 col-md-2" id="'.$student['barcode_id'].'">';
						$html .= '<div class="thumbnail">';
						$html .= '<img class="img-thumbnail" data-src="holder.js/300x200" alt="img" src="uploads/'.$student['image'].'" />';
						$html .= '<div class="caption">';
							$html .= '<h4>'.$student['firstname']." ".$student['lastname'].'</h4>';
							$html .= $active;
						$html .= '</div>';
						$html .= '</div>';
					$html .= '</div>';
				endforeach;
					$html .= '</div><div class="clearfix"></div><a id="teacherLogAttendance" tid="'.$_POST['tid'].'" subjtid="'.$_POST['subjtid'].'" class="btn btn-info">Log Attendance</a>';
				$html .= '<a class="btn btn-info" target="_blank" style="margin-top:10px;" href="reportpdf.php?action=print&type=attendance&tid'.$_POST['tid'].'&subjtid='.$_POST['subjtid'].'"><i class="fa fa-print"></i> Print</a>';
					
				echo $html;
			else:
				echo "<p class='alert alert-danger'>No Student(s) are Enrolled in this Subject</p>";
			endif;
			} else {
				echo "<p class='alert alert-info'>Not Yet Subject Time.</p>";
			}
		}
		if($_POST['action'] == 'logTracking'){
			$getResponse = System::logTracking($_POST);
			if($getResponse == "error-3"){
			
			} else if ($getResponse == "error-4"){
			
			} else if ($getResponse == 0){
			
			} else {
				$id = explode("_",$getResponse);
				$student = System::loadStudentInfo($id[0]);
				if($id[1] == 1){
					$html = '<div class="col-sm-6 col-md-3 col-md-offset-4"><div class="thumbnail"><img src="uploads/'.$student['image'].'" alt="image"><div class="caption" style="text-align:center;background:#eee;"><h3>'.$student['firstname'].' '.$student['lastname'].'</h3><p style="font-weight:bold;"><i class="fa fa-sign-in"></i> Logged In</p></div></div></div>';
					echo $html;
				} else {
					$html = '<div class="col-sm-6 col-md-3 col-md-offset-4"><div class="thumbnail"><img src="uploads/'.$student['image'].'" alt="image"><div class="caption" style="text-align:center;background:#eee;"><h3>'.$student['firstname'].' '.$student['lastname'].'</h3><p style="font-weight:bold;"><i class="fa fa-sign-out"></i> Logged Out</p></div></div></div>';
					echo $html;
				}
			}
		}
	} else {
		echo "Invalid Access!";
	}
?>