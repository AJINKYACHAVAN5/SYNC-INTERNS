<?php
	require_once "db.php";
	require_once "libs/class.upload.php";
	
	class System extends Database{
		public function __construct(){
			parent::__construct();
		}
		public static function deleteStudent($sid){
			$conn = Database::getInstance();
			$deleteYLS = $conn->db->prepare("DELETE FROM yearlevelsectionstudent WHERE sid = :sid");
			$deleteYLS->bindValue(":sid",$sid);
			$deleteYLS->execute();
			$deleteLog = $conn->db->prepare("DELETE FROM attendance_log WHERE sid = :sid");
			$deleteLog->bindValue(":sid",$sid);
			$deleteLog->execute();
			$deleteLogin = $conn->db->prepare("DELETE FROM login WHERE sid = :sid");
			$deleteLogin->bindValue(":sid",$sid);
			$deleteLogin->execute();
			$deleteInfo = $conn->db->prepare("DELETE FROM student_info WHERE sid = :sid");
			$deleteInfo->bindValue(":sid",$sid);
			$deleteInfo->execute();
			return 1;
		}
		public static function deleteSubject($subjid){
			$conn = Database::getInstance();
			$select = $conn->db->prepare("SELECT * FROM teacher_subject WHERE subjid = :subjid");
			$select->bindValue(":subjid",$subjid);
			$select->execute();
			$rows = $select->fetchAll();
			if(!empty($rows)){
				$deleteSubjid = $conn->db->prepare("DELETE FROM subject_teacher_student WHERE subjtid = :subjtid");
				$deleteAttLog = $conn->db->prepare("DELETE FROM attendance_log WHERE subjtid = :subjtid");
				foreach($rows as $value){
					$deleteSubjid->bindValue(":subjtid",$value['subjtid']);
					$deleteSubjid->execute();
					$deleteAttLog->bindValue(":subjtid",$value['subjtid']);
					$deleteAttLog->execute();
				}
			}
			$deleteSubjYearLevel = $conn->db->prepare("DELETE FROM subj_yearlevel WHERE subjid = :subjid");
			$deleteSubjYearLevel->bindValue(":subjid",$subjid);
			$deleteSubjYearLevel->execute();
			$deleteSubjtid = $conn->db->prepare("DELETE FROM teacher_subject WHERE subjid = :subjid");
			$deleteSubjtid->bindValue(":subjid",$subjid);
			$deleteSubjtid->execute();
			$deleteSubj = $conn->db->prepare("DELETE FROM subject_info WHERE subjid = :subjid");
			$deleteSubj->bindValue(":subjid",$subjid);
			$deleteSubj->execute();
			return 1;
		}
		public static function teacherLogAttendance($subjtid){
			$conn = Database::getInstance();
			$select = $conn->db->prepare("SELECT * FROM subject_teacher_student LEFT JOIN yearlevelsectionstudent ON yearlevelsectionstudent.yearsectionid = subject_teacher_student.yearsectionid LEFT JOIN student_info ON student_info.sid = yearlevelsectionstudent.sid WHERE subject_teacher_student.subjtid = ?");
			$select->execute(array($subjtid));
			$rows = $select->fetchAll();
			$subjtidInfo = self::getSubjectTeacherInfo($subjtid);
			
			$date = date("Y-m-d");
			$time = date("h:i A",strtotime($subjtidInfo['endtime']));
			
			if(!empty($rows)){
				foreach( $rows as $student ){
					$check = $conn->db->prepare("SELECT logid FROM attendance_log WHERE sid = :sid AND subjtid = :subjtid AND logdate = :logdate");
					$check->bindValue(":sid",$student['sid']);
					$check->bindValue(":subjtid",$subjtid);
					$check->bindValue(":logdate",$date);
					$check->execute();
					$row = $check->rowCount();
					if($row == 0){
						$stmt = $conn->db->prepare("INSERT INTO attendance_log (subjtid,sid,barcodeid,logdate,logtime,time_difference,status,remarks,type,place) VALUES (:subjtid,:sid,:barcodeid,:logdate,TIME( STR_TO_DATE( :logtime, '%h:%i %p' ) ),:timediff,:status,:remarks,:type,:place)");
						$stmt->execute( array(':subjtid' => $subjtid,':sid' => $student['sid'],':barcodeid' => $student['barcodeid'],':logdate' => $date,':logtime' => $time,':timediff' => 60,':status' => 3,':remarks' => 'login',':type' => 'attendance',':place' => 'classroom'));
						$stmt2 = $conn->db->prepare("INSERT INTO attendance_log (subjtid,sid,barcodeid,logdate,logtime,time_difference,status,remarks,type,place) VALUES (:subjtid,:sid,:barcodeid,:logdate,TIME( STR_TO_DATE( :logtime, '%h:%i %p' ) ),:timediff,:status,:remarks,:type,:place)");
						$stmt2->execute( array(':subjtid' => $subjtid,':sid' => $student['sid'],':barcodeid' => $student['barcodeid'],':logdate' => $date,':logtime' => $time,':timediff' => 60,':status' => 3,':remarks' => 'logout',':type' => 'attendance',':place' => 'classroom'));
					}
				}
			}
		}
		public static function deleteSectionStudent($ylssid){
			$conn = Database::getInstance();
			$deleteYS = $conn->db->prepare("DELETE FROM yearlevelsectionstudent WHERE ylssid = ?");
			$deleteYS->execute(array($ylssid));
		}
		public static function deleteYearLevel($yearlevelid){
			$conn = Database::getInstance();
			$select = $conn->db->prepare("SELECT * FROM year_section WHERE yearlevelid = ?");
			$select->execute(array($yearlevelid));
			$rows = $select->fetchAll();
			if(!empty($rows)){
				$deleteYLSS = $conn->db->prepare("DELETE FROM yearlevelsectionstudent WHERE yearsectionid = ?");
				foreach( $rows as $yearsection ){
					$deleteYLSS->execute(array($yearsection['yearsectionid']));
				}				
			}
			$deleteYS = $conn->db->prepare("DELETE FROM year_section WHERE yearlevelid = ?");
			$deleteYS->execute(array($yearlevelid));
			$deleteYL = $conn->db->prepare("DELETE FROM yearlevel WHERE yearlevelid = ?");
			$deleteYL->execute(array($yearlevelid));
		}
		public static function loadYearSection(){
			$conn = Database::getInstance();
			$select = $conn->db->prepare("SELECT * FROM `year_section` LEFT JOIN yearlevel ON yearlevel.yearlevelid = year_section.yearlevelid");
			$select->execute();
			return $select->fetchAll();
		}
		public static function loadStudentSectionInfo($sid){
			$conn = Database::getInstance();
			$select = $conn->db->prepare("SELECT * FROM yearlevelsectionstudent LEFT JOIN subject_teacher_student ON subject_teacher_student.yearsectionid = yearlevelsectionstudent.yearsectionid LEFT JOIN teacher_subject ON teacher_subject.subjtid = subject_teacher_student.subjtid LEFT JOIN subject_info ON subject_info.subjid = teacher_subject.subjid LEFT JOIN teacher_info ON teacher_info.tid = teacher_subject.tid WHERE yearlevelsectionstudent.sid = ?");
			$select->execute(array($sid));
			return $select->fetchAll();
		}
		public static function loadYearLevels(){
			$conn = Database::getInstance();
			$select = $conn->db->prepare("SELECT * FROM yearlevel");
			$select->execute();
			return $select->fetchAll();
		}
		public static function getStudentListWithoutSection(){
			$conn = Database::getInstance();
			$select = $conn->db->prepare("SELECT * FROM student_info WHERE sid NOT IN (SELECT sid FROM yearlevelsectionstudent) GROUP BY sid ORDER BY sid DESC");
			$select->execute();
			return $select->fetchAll();
		}
		public static function addStudentToSection($POST){
			$conn = Database::getInstance();
			$insert = $conn->db->prepare("INSERT INTO yearlevelsectionstudent (sid,yearsectionid) VALUES (?,?)");
			return ($insert->execute(array($POST['sid'],$POST['yearsectionid']))) ? $POST['yearsectionid'] : 0;
		}
		public static function loadSectionStudent($yearsectionid){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT * FROM yearlevelsectionstudent LEFT JOIN student_info ON student_info.sid = yearlevelsectionstudent.sid WHERE yearlevelsectionstudent.yearsectionid = ?");
			$stmt->execute( array($yearsectionid) );
			return $stmt->fetchAll();
		}
		public static function addSubjectTeacherSection($POST){
			$conn = Database::getInstance();
			$yearsectionid = $POST['yearsectionid'];
			$subjtid = $POST['subjtid'];
			$stmt = $conn->db->prepare("INSERT INTO subject_teacher_student (subjtid,yearsectionid) VALUES (?,?)");
			return ($stmt->execute( array($subjtid,$yearsectionid) )) ? $yearsectionid : 0;
		}
		public static function loadTeacherSubjectSection($yearsectionid){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT * FROM subject_teacher_student LEFT JOIN teacher_subject ON teacher_subject.subjtid = subject_teacher_student.subjtid LEFT JOIN subject_info ON subject_info.subjid = teacher_subject.subjid LEFT JOIN teacher_info ON teacher_info.tid = teacher_subject.tid WHERE subject_teacher_student.yearsectionid = ?");
			$stmt->execute(array($yearsectionid));
			return $stmt->fetchAll();
		}
		public static function addSectionYearLevel($POST){
			$conn = Database::getInstance();
			$addSectionYearLevel = $conn->db->prepare("INSERT INTO year_section (sectionname,yearlevelid) VALUES (?,?)");
			return ($addSectionYearLevel->execute(array($POST['sectionname'],$POST['yearlevelid']))) ? $POST['yearlevelid'] : 0;
		}
		public static function getYearLevelSectionInfo($yearsectionid){
			$conn = Database::getInstance();
			$getYearLevelSectionInfo = $conn->db->prepare("SELECT * FROM year_section WHERE yearsectionid = ?");
			$getYearLevelSectionInfo->execute(array($yearsectionid));
			return $getYearLevelSectionInfo->fetch();
		}
		public static function getYearLevelInfo($yearlevelid){
			$conn = Database::getInstance();
			$getAllYearSections = $conn->db->prepare("SELECT * FROM yearlevel WHERE yearlevelid = ?");
			$getAllYearSections->execute(array($yearlevelid));
			return $getAllYearSections->fetch();
		}
		public static function loadAllYearSections($yearlevelid){
			$conn = Database::getInstance();
			$getAllYearSections = $conn->db->prepare("SELECT * FROM year_section WHERE yearlevelid = ? ORDER BY yearsectionid DESC");
			$getAllYearSections->execute(array($yearlevelid));
			return $getAllYearSections->fetchAll();
		}
		public static function addYearLevel($POST){
			$conn = Database::getInstance();
			$insertData = $conn->db->prepare("INSERT INTO yearlevel (yearname) VALUES (?)");
			return ($insertData->execute(array($POST['yearname']))) ? 1 : 0;
		}
		public static function loadAllYearLevel(){
			$conn = Database::getInstance();
			$loadData = $conn->db->prepare("SELECT * FROM yearlevel");
			$loadData->execute();
			return $loadData->fetchAll();
		}
		public static function getSubjectAndTeacherInfo($tid,$subjid){
			$conn = Database::getInstance();
			$getstarttime = $conn->db->prepare("SELECT * FROM teacher_subject LEFT JOIN subject_info ON teacher_subject.subjid = subject_info.subjid LEFT JOIN teacher_info ON teacher_info.tid = teacher_subject.tid WHERE teacher_subject.tid = ? AND teacher_subject.subjid = ?");
			$getstarttime->execute(array($tid,$subjid));
			return $getstarttime->fetch();
		}
		public static function getSubjectInfo($subjtid){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT * FROM subject_info LEFT JOIN teacher_subject ON teacher_subject.subjid = subject_info.subjid LEFt JOIN teacher_info ON teacher_info.tid = teacher_subject.tid WHERE teacher_subject.subjtid = ?");
			$stmt->execute(array($subjtid));
			return $stmt->fetch();
		}
		public static function getTeachersStudentBySubject($tid,$subjid){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT * FROM student_info LEFT JOIN yearlevelsectionstudent ON yearlevelsectionstudent.sid = student_info.sid LEFT JOIN subject_teacher_student ON subject_teacher_student.yearsectionid = yearlevelsectionstudent.yearsectionid LEFT JOIN teacher_subject ON teacher_subject.subjtid = subject_teacher_student.subjtid WHERE teacher_subject.tid = ? AND teacher_subject.subjid = ?");
			$stmt->execute(array($tid,$subjid));
			return $stmt->fetchAll();
		}
		public static function loadTeachersSubjectUnderStudent($tid,$sid){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT * FROM subject_teacher_student LEFT JOIN teacher_subject ON teacher_subject.subjtid = subject_teacher_student.subjtid LEFT JOIN subject_info ON subject_info.subjid = teacher_subject.subjid LEFT JOIN yearlevelsectionstudent ON yearlevelsectionstudent.yearsectionid = subject_teacher_student.yearsectionid WHERE teacher_subject.tid = ? AND yearlevelsectionstudent.sid = ?");
			$stmt->execute(array($tid,$sid));
			return $stmt->fetchAll();
		}
		public static function loadStudentsTeacher($sid){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT * FROM teacher_info LEFT JOIN teacher_subject ON teacher_subject.tid = teacher_info.tid LEFT JOIN subject_teacher_student ON subject_teacher_student.subjtid = teacher_subject.subjtid LEFT JOIN yearlevelsectionstudent ON yearlevelsectionstudent.yearsectionid = subject_teacher_student.yearsectionid WHERE yearlevelsectionstudent.sid = ? GROUP BY teacher_info.tid ORDER BY teacher_info.tid DESC");
			$stmt->execute(array($sid));
			return $stmt->fetchAll();
		}
		public static function loadTrackingLogWithRange($place,$from,$to){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT * FROM attendance_log LEFT JOIN student_info ON student_info.sid = attendance_log.sid  WHERE attendance_log.place = ? AND (logdate BETWEEN ? AND ? ) ORDER BY attendance_log.logid DESC");
			$stmt->execute(array($place,$from,$to));
			return $stmt->fetchAll();
		}
		public static function loadTrackingLog($place){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT * FROM attendance_log LEFT JOIN student_info ON student_info.sid = attendance_log.sid  WHERE attendance_log.place = ? ORDER BY attendance_log.logid DESC");
			$stmt->execute(array($place));
			return $stmt->fetchAll();
		}
		public static function loadStudentLogWithRange($sid,$from,$to){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT * FROM attendance_log LEFT JOIN student_info ON student_info.sid = attendance_log.sid LEFT JOIN teacher_subject ON teacher_subject.subjtid = attendance_log.subjtid LEFT JOIN subject_info ON subject_info.subjid = teacher_subject.subjid WHERE attendance_log.sid = ? AND (logdate BETWEEN ? AND ?) ORDER BY attendance_log.logid DESC");
			$stmt->execute(array($sid,$from,$to));
			return $stmt->fetchAll();
		}
		public static function loadStudentLog($sid){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT * FROM attendance_log LEFT JOIN student_info ON student_info.sid = attendance_log.sid LEFT JOIN teacher_subject ON teacher_subject.subjtid = attendance_log.subjtid LEFT JOIN subject_info ON subject_info.subjid = teacher_subject.subjid WHERE attendance_log.sid = ? GROUP BY attendance_log.logdate, attendance_log.subjtid, attendance_log.sid ORDER BY attendance_log.logid DESC");
			$stmt->execute(array($sid));
			return $stmt->fetchAll();
		}
		public static function getAttendanceLogWithRange($subjtid,$from,$to){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT * FROM attendance_log LEFT JOIN student_info ON student_info.sid = attendance_log.sid WHERE attendance_log.subjtid = ? AND (logdate BETWEEN ? AND ?) GROUP BY attendance_log.logdate, attendance_log.subjtid, attendance_log.sid ORDER BY attendance_log.logid DESC");
			$stmt->execute(array($subjtid,$from,$to));
			return $stmt->fetchAll();
		}
		public static function getAttendanceLog($subjtid){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT * FROM attendance_log LEFT JOIN student_info ON student_info.sid = attendance_log.sid WHERE attendance_log.subjtid = ? GROUP BY attendance_log.logdate, attendance_log.subjtid, attendance_log.sid ORDER BY attendance_log.logid DESC");
			$stmt->execute(array($subjtid));
			return $stmt->fetchAll();
		}
		public static function getSubjectTeacherInfo($subjtid){
			$conn = Database::getInstance();
			$getstarttime = $conn->db->prepare("SELECT * FROM teacher_subject WHERE subjtid = ?");
			$getstarttime->execute(array($subjtid));
			return $getstarttime->fetch();
		}
		public static function logTracking($POST){
			date_default_timezone_set("Etc/GMT-8");
			$conn = Database::getInstance();
			$barcodeid = $POST['barcodeid'];
			$place = $POST['type'];
			if(!empty($barcodeid)){
				$date = date("Y-m-d");
				$time = date("h:i A");
				$stmt = $conn->db->prepare("SELECT * FROM student_info WHERE barcodeid = ?");
				$stmt->execute(array($barcodeid));
				$student = $stmt->fetch();
				if($stmt->rowCount() != 0){
					$check = $conn->db->prepare("SELECT * FROM attendance_log WHERE barcodeid = ? AND place = ? AND logdate = ? ORDER BY logid DESC");
					$check->execute(array($barcodeid,$place,$date));
					$checkStat = $check->fetch();
					$stmt1 = $conn->db->prepare("INSERT INTO attendance_log (sid,barcodeid,logdate,logtime,remarks,type,place) VALUES (:sid,:barcodeid,:logdate,TIME( STR_TO_DATE( :logtime, '%h:%i %p' ) ),:remarks,:type,:place)");
					if($checkStat['remarks'] == "login"){
						return ($stmt1->execute(array(':sid' => $student['sid'],':barcodeid' => $barcodeid,':logdate' => $date,':logtime' => $time,':remarks' => 'logout',':type' => 'tracking',':place' => $place))) ? $student['sid']."_2" : 0;
					} else if($checkStat['remarks'] == "logout"){
						return ($stmt1->execute(array(':sid' => $student['sid'],':barcodeid' => $barcodeid,':logdate' => $date,':logtime' => $time,':remarks' => 'login',':type' => 'tracking',':place' => $place))) ? $student['sid']."_1" : 0;
					} else {
						return ($stmt1->execute(array(':sid' => $student['sid'],':barcodeid' => $barcodeid,':logdate' => $date,':logtime' => $time,':remarks' => 'login',':type' => 'tracking',':place' => $place))) ? $student['sid']."_1" : 0;
					}
				} else {
					return "error-3";
				}
			} else {
				return "error-4";
			}
		}
		public static function logAttendace($POST){
			date_default_timezone_set("Etc/GMT-8");
			$conn = Database::getInstance();
			$subjtidInfo = self::getSubjectTeacherInfo($POST['subjtid']);
			
			$stmt = $conn->db->prepare("SELECT * FROM student_info WHERE barcodeid = ?");
			$stmt->execute(array($POST['barcodeid']));
			$student = $stmt->fetch();
			
			$date = date("Y-m-d");
			$time = date("h:i A");
			$time1 = strtotime(date("h:i A",strtotime($subjtidInfo['starttime'])));
			$time2 = strtotime($time);
			$diff = $time2 - $time1;
			$diff = round($diff/60);

			$barcodeid= $POST['barcodeid'];
			$check = $conn->db->prepare("SELECT * FROM attendance_log WHERE barcodeid = ? AND place = ? AND logdate = ? AND remarks = ? AND subjtid = ?");
			$check->execute(array($barcodeid,'classroom',$date,'login',$POST['subjtid']));
			$checkCount = $check->rowCount();
			if($diff < 15){
				$status = 1;
			} else if( $diff < 30 ){
				$status = 2;
			} else {
				$status = 3;
			}
			$stmt1 = $conn->db->prepare("INSERT INTO attendance_log (subjtid,sid,barcodeid,logdate,logtime,time_difference,status,remarks,type,place) VALUES (:subjtid,:sid,:barcodeid,:logdate,TIME( STR_TO_DATE( :logtime, '%h:%i %p' ) ),:timediff,:status,:remarks,:type,:place)");
			if($checkCount == 0){
				return ($stmt1->execute( array(':subjtid' => $POST['subjtid'],':sid' => $student['sid'],':barcodeid' => $barcodeid,':logdate' => $date,':logtime' => $time,':timediff' => $diff,':status' => $status,':remarks' => 'login',':type' => 'attendance',':place' => 'classroom')) ) ? $status : 0;
			} else {
				$checkLogout = $conn->db->prepare("SELECT * FROM attendance_log WHERE barcodeid = ? AND place = ? AND logdate = ? AND remarks = ? AND subjtid = ?");
				$checkLogout->execute(array($barcodeid,'classroom',$date,'logout',$POST['subjtid']));
				$checkLogoutCount = $checkLogout->rowCount();
				if($checkLogoutCount == 0){
					return ( $stmt1->execute(array(':subjtid' => $POST['subjtid'],':sid' => $student['sid'],':barcodeid' => $barcodeid,':logdate' => $date,':logtime' => $time,':timediff' => $diff,':status' => $status,':remarks' => 'logout',':type' => 'attendance',':place' => 'classroom')) ) ? $status : 0;
				} else {
					return $status;
				}
			}
		}
		public static function loadAllTeacherSubject($tid){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT * FROM teacher_subject LEFT JOIN subject_info ON subject_info.subjid = teacher_subject.subjid WHERE teacher_subject.tid = ? GROUP BY teacher_subject.subjtid");
			$stmt->execute(array($tid));
			return $stmt->fetchAll();
		}
		public static function loadAllTeacherSubjectStudent($POST){
			$conn = Database::getInstance();
			$date = date('Y-m-d');
			$stmt = $conn->db->prepare("SELECT *, student_info.barcodeid AS barcode_id, (SELECT status FROM attendance_log WHERE attendance_log.sid = student_info.sid AND attendance_log.logdate = ? AND attendance_log.remarks = ? AND attendance_log.type = ? AND attendance_log.subjtid = ?) AS loginStat, (SELECT status FROM attendance_log WHERE attendance_log.sid = student_info.sid AND attendance_log.logdate = ? AND attendance_log.remarks = ? AND attendance_log.type = ? AND attendance_log.subjtid = ?) AS logoutStat FROM yearlevelsectionstudent LEFT JOIN subject_teacher_student ON subject_teacher_student.yearsectionid = yearlevelsectionstudent.yearsectionid LEFT JOIN student_info ON student_info.sid = yearlevelsectionstudent.sid LEFT JOIN teacher_subject ON teacher_subject.subjtid = subject_teacher_student.subjtid WHERE teacher_subject.tid = ? AND subject_teacher_student.subjtid = ?");
			$stmt->execute(array($date,'login','attendance',$POST['subjtid'],$date,'logout','attendance',$POST['subjtid'],$POST['tid'],$POST['subjtid']));
			return $stmt->fetchAll();
		}
		public static function deleteTeacher($POST){
			$conn = Database::getInstance();
			$loadTeacherInfo = self::loadTeacherInfo($POST['tid']);
			@unlink('uploads/'.$loadTeacherInfo['image']);
			$getAllSubjectStudent = self::getAllSubjectStudent($POST['tid']);
			$arrayID = array();
			foreach( $getAllSubjectStudent as $subjtid ):
				$arrayID[] = $subjtid['subjtid'];
			endforeach;
			$getAllSubjectStudent = implode(",",$arrayID);
			$stmt = $conn->db->prepare("DELETE FROM subject_teacher_student WHERE subjtid IN ($getAllSubjectStudent)");
			$stmt->execute();
			$stmt3 = $conn->db->prepare("DELETE FROM attendance_log WHERE subjtid IN ($getAllSubjectStudent)");
			$stmt3->execute();
			$stmt1 = $conn->db->prepare("DELETE FROM teacher_info WHERE tid = ?");
			$stmt1->execute(array($POST['tid']));
			$stmt2 = $conn->db->prepare("DELETE FROM teacher_subject WHERE tid = ?");
			$stmt2->execute(array($POST['tid']));
			$stmt4 = $conn->db->prepare("DELETE FROM login WHERE tid = ?");
			$stmt4->execute(array($POST['tid']));
			return 1;
		}
		public static function getAllSubjectStudent($tid){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT subject_teacher_student.subjtid FROM subject_teacher_student LEFT JOIN teacher_subject ON teacher_subject.subjtid = subject_teacher_student.subjtid WHERE teacher_subject.tid = ?");
			$stmt->execute(array($tid));
			return $stmt->fetchAll();
		}
		public static function removeSubjectTeacher($POST){
			$conn = Database::getInstance();
			$getsubjtid = $conn->db->prepare("SELECT * FROM teacher_subject WHERE tid = ? AND subjid = ?");
			$getsubjtid->execute(array($POST['tid'],$POST['subjid']));
			$subjinfo = $getsubjtid->fetch();
			$stmt = $conn->db->prepare("DELETE FROM subject_teacher_student WHERE subjtid = ?");
			if( $stmt->execute(array($subjinfo['subjtid'])) ){
				$stmt2 = $conn->db->prepare("DELETE FROM teacher_subject WHERE tid = ? AND subjid = ?");
				return ($stmt2->execute(array($POST['tid'],$POST['subjid']))) ? $POST['tid'] : 0;
			} else {
				return 0;
			}
		}
		public static function removeStudentSubjectTeacher($POST){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("DELETE FROM subject_teacher_student WHERE yearsectionid = ? AND subjtid = ?");
			return ($stmt->execute(array($POST['yearsectionid'],$POST['subjtid']))) ? $POST['yearsectionid'] : 0;
		}
		public static function loadTeacherInfo($tid){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT * FROM teacher_info WHERE tid = ?");
			$stmt->execute(array($tid));
			return $stmt->fetch();
		}
		public static function loadStudentInfo($sid){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT * FROM student_info LEFT JOIN yearlevelsectionstudent ON yearlevelsectionstudent.sid = student_info.sid LEFT JOIN year_section ON year_section.yearsectionid = yearlevelsectionstudent.yearsectionid LEFT JOIN yearlevel ON yearlevel.yearlevelid = year_section.yearlevelid WHERE student_info.sid = ?");
			$stmt->execute(array($sid));
			return $stmt->fetch();
		}
		public static function loadTeacherSubject($tid){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT * FROM teacher_subject LEFT JOIN subject_info ON subject_info.subjid = teacher_subject.subjid WHERE teacher_subject.tid = ?");
			$stmt->execute(array($tid));
			return $stmt->fetchAll();
		}
		public static function loadTeacherSubjectStudent($sid){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT * FROM subject_teacher_student LEFT JOIN teacher_subject ON teacher_subject.subjtid = subject_teacher_student.subjtid LEFT JOIN subject_info ON subject_info.subjid = teacher_subject.subjid LEFT JOIN teacher_info ON teacher_info.tid = teacher_subject.tid LEFT JOIN yearlevelsectionstudent ON yearlevelsectionstudent.yearsectionid = subject_teacher_student.yearsectionid WHERE yearlevelsectionstudent.sid = ?");
			$stmt->execute(array($sid));
			return $stmt->fetchAll();
		}
		public static function getTeacherSubject($yearlevelid){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT * FROM teacher_subject LEFT JOIN subject_info ON subject_info.subjid = teacher_subject.subjid LEFT JOIN teacher_info ON teacher_info.tid = teacher_subject.tid LEFT JOIN subj_yearlevel ON subj_yearlevel.subjid = subject_info.subjid LEFT JOIN yearlevel ON yearlevel.yearlevelid = subj_yearlevel.yearlevelid WHERE teacher_subject.subjtid NOT IN (SELECT subjtid FROM subject_teacher_student) AND subj_yearlevel.yearlevelid = ? ORDER BY teacher_subject.subjtid DESC");
			$stmt->execute(array($yearlevelid));
			return $stmt->fetchAll();
		}
		public static function loadPersonnel(){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT * FROM personnel_info ORDER BY personnel_id DESC");
			$stmt->execute();
			return $stmt->fetchAll();
		}
		public static function loadStudent(){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT * FROM student_info ORDER BY sid DESC");
			$stmt->execute();
			return $stmt->fetchAll();
		}	
		public static function loadTeacher(){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT teacher_info.*, login.username FROM teacher_info LEFT JOIN login ON login.tid = teacher_info.tid ORDER BY teacher_info.tid DESC");
			$stmt->execute();
			return $stmt->fetchAll();
		}
		public static function loadSubject(){
			$conn = Database::getInstance();
			$stmt = $conn->db->prepare("SELECT * FROM subject_info LEFT JOIN subj_yearlevel ON subj_yearlevel.subjid = subject_info.subjid LEFT JOIN yearlevel ON yearlevel.yearlevelid = subj_yearlevel.yearlevelid ORDER BY subject_info.subjid DESC");
			$stmt->execute();
			return $stmt->fetchAll();
		}
		public static function addSubject($POST){
			$conn = Database::getInstance();
			$subject_name = $POST['subject_name'];
			$subject_description = $POST['subject_description'];
			$stmt = $conn->db->prepare("INSERT INTO subject_info (subject_name,subject_description) VALUES (?,?)");
			if( $stmt->execute( array($subject_name,$subject_description) )){
				$subjid = $conn->db->lastInsertId();
				$stmt2 = $conn->db->prepare("INSERT INTO subj_yearlevel (subjid,yearlevelid) VALUES (?,?)");
				$stmt2->execute(array($subjid,$POST['yearlevelid']));
				return 1;
			} else {
				return 0;
			}
		}		
		public static function addStudent($POST,$FILES){
			$conn = Database::getInstance();
			$barcode = substr(number_format(time() * rand(),0,'',''),0,13);
			$firstname = $POST['fname'];
			$lastname = $POST['lname'];
			$email = $POST['email'];
			$schoolyear = $POST['schoolyear'];
			$image = self::uploadImage($FILES,$barcode);
			if(!$image){
				return 0;
			} else {
				$check = $conn->db->prepare("SELECT * FROM student_info WHERE email = ?");
				$check->execute(array($email));
				if($check->rowCount() == 0){
					$barcodeimg = $barcode.".png";
					$password = self::generatePassword();
					$stmt = $conn->db->prepare("INSERT INTO student_info (barcodeid,barcodeimg,firstname,lastname,email,password,image,schoolyear) VALUES (?,?,?,?,?,?,?,?)");
					if($stmt->execute( array($barcode,$barcodeimg,$firstname,$lastname,$email,$password,$image,$schoolyear) )):
						$sid = $conn->db->lastInsertId();
						$addToLogin = $conn->db->prepare("INSERT INTO login (sid,username,password,level) VALUES (?,?,?,?)");
						$addToLogin->execute(array($sid,$email,md5($password),0));
						$insertToSection = $conn->db->prepare("INSERT INTO yearlevelsectionstudent (sid,yearsectionid) VALUES (?,?)");
						$insertToSection->execute(array($sid,$POST['yearsectionid']));
						self::generateBarcodeImage($barcode,20,"horizontal","code128","");
						return 1;
					else:
						return 0;
					endif;
				} else {
					return 2;
				}
			}
		}
		public static function addTeacher($POST,$FILES){
			$conn = Database::getInstance();
			$imagename = substr(number_format(time() * rand(),0,'',''),0,13);
			$firstname = $POST['fname'];
			$lastname = $POST['lname'];
			$schoolyear = $POST['schoolyear'];
			$image = self::uploadImage($FILES,$imagename);
			// var_dump($image);
			if(!$image){
				return 0;
			} else {
				$stmt = $conn->db->prepare("INSERT INTO teacher_info (firstname,lastname,image,schoolyear) VALUES (?,?,?,?)");
				$stmt->execute( array($firstname,$lastname,$image,$schoolyear) );
				$tid = $conn->db->lastInsertId();
				$username = $POST['username'];
				$password = md5($POST['password']);
				$stmt1 = $conn->db->prepare("INSERT INTO login (tid,username,password,level) VALUES (?,?,?,?)");
				if($stmt1->execute( array($tid,strtolower($username),$password,2) )):
					return 1;
				else:
					return 0;
				endif;
			}
		}
		public static function addSubjectTeacher($POST){
			$conn = Database::getInstance();
			$tid = $POST['tid'];
			$subjid = $POST['subjid'];
			$start = date("h:i A",strtotime($POST['start']));
			$end = date("h:i A",strtotime($POST['end']));
			
			$stmt = $conn->db->prepare("INSERT INTO teacher_subject (subjid,tid,starttime,endtime) VALUES (:subjtid,:tid,TIME( STR_TO_DATE( :start, '%h:%i %p' ) ),TIME( STR_TO_DATE( :end, '%h:%i %p' ) ))");
			return ($stmt->execute( array(':subjtid' => $subjid, ':tid' => $tid, ':start' => $POST['start'], ':end' => $POST['end'] ))) ? $tid : 0;
		}
		public static function addSubjectTeacherStudent($POST){
			$conn = Database::getInstance();
			$sid = $POST['sid'];
			$subjtid = $POST['subjtid'];
			$stmt = $conn->db->prepare("INSERT INTO subject_teacher_student (subjtid,sid) VALUES (?,?)");
			return ($stmt->execute( array($subjtid,$sid) )) ? $sid : 0;
		}
		public static function uploadImage($FILE,$imagename){
			$output_dir = "uploads/";

			if(isset($FILE["photo"]))
			{
				if ($FILE["photo"]["error"] > 0)
				{
					return false;
				}
				else
				{
					// $handle = new Upload($FILE["photo"]);
					// if ($handle->uploaded){
					// 	$handle->file_new_name_body = $imagename;
					// 	$handle->image_resize = true;
					// 	$handle->image_x = 300;
					// 	$handle->image_y = 300;
					// 	$handle->Process($output_dir);
					// 	if ($handle->processed) {
					// 		$handle->clean();
					// 		return $imagename.".".$handle->file_src_name_ext;
					// 	} else {
					// 		$handle->error;
					// 	}
					// }
					$fname =time().'_'.$FILE['photo']['name'];
					$move = move_uploaded_file($FILE['photo']['tmp_name'],$output_dir.$fname);
					if($move){
						return $fname;
					}
				}

			} else {
				return false;
			}
		}
		public static function generatePassword($length = 6) {
			$chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
			$randomPass = '';
			for ($i = 0; $i < $length; $i++) {
				$randomPass .= $chars[rand(0, strlen($chars) - 1)];
			}
			return $randomPass;
		}
		public static function generateBarcodeImage($text="0",$size="20",$orientation="horizontal",$code_type="code128",$code_string = ""){

			// Translate the $text into barcode the correct $code_type
			if(strtolower($code_type) == "code128")
			{
				$chksum = 104;
				// Must not change order of array elements as the checksum depends on the array's key to validate final code
				$code_array = array(" "=>"212222","!"=>"222122","\""=>"222221","#"=>"121223","$"=>"121322","%"=>"131222","&"=>"122213","'"=>"122312","("=>"132212",")"=>"221213","*"=>"221312","+"=>"231212",","=>"112232","-"=>"122132","."=>"122231","/"=>"113222","0"=>"123122","1"=>"123221","2"=>"223211","3"=>"221132","4"=>"221231","5"=>"213212","6"=>"223112","7"=>"312131","8"=>"311222","9"=>"321122",":"=>"321221",";"=>"312212","<"=>"322112","="=>"322211",">"=>"212123","?"=>"212321","@"=>"232121","A"=>"111323","B"=>"131123","C"=>"131321","D"=>"112313","E"=>"132113","F"=>"132311","G"=>"211313","H"=>"231113","I"=>"231311","J"=>"112133","K"=>"112331","L"=>"132131","M"=>"113123","N"=>"113321","O"=>"133121","P"=>"313121","Q"=>"211331","R"=>"231131","S"=>"213113","T"=>"213311","U"=>"213131","V"=>"311123","W"=>"311321","X"=>"331121","Y"=>"312113","Z"=>"312311","["=>"332111","\\"=>"314111","]"=>"221411","^"=>"431111","_"=>"111224","\`"=>"111422","a"=>"121124","b"=>"121421","c"=>"141122","d"=>"141221","e"=>"112214","f"=>"112412","g"=>"122114","h"=>"122411","i"=>"142112","j"=>"142211","k"=>"241211","l"=>"221114","m"=>"413111","n"=>"241112","o"=>"134111","p"=>"111242","q"=>"121142","r"=>"121241","s"=>"114212","t"=>"124112","u"=>"124211","v"=>"411212","w"=>"421112","x"=>"421211","y"=>"212141","z"=>"214121","{"=>"412121","|"=>"111143","}"=>"111341","~"=>"131141","DEL"=>"114113","FNC 3"=>"114311","FNC 2"=>"411113","SHIFT"=>"411311","CODE C"=>"113141","FNC 4"=>"114131","CODE A"=>"311141","FNC 1"=>"411131","Start A"=>"211412","Start B"=>"211214","Start C"=>"211232","Stop"=>"2331112");
				$code_keys = array_keys($code_array);
				$code_values = array_flip($code_keys);
				for($X = 1; $X <= strlen($text); $X++)
				{
					$activeKey = substr( $text, ($X-1), 1);
					$code_string .= $code_array[$activeKey];
					$chksum=($chksum + ($code_values[$activeKey] * $X));
				}
				$code_string .= $code_array[$code_keys[($chksum - (intval($chksum / 103) * 103))]];

				$code_string = "211214" . $code_string . "2331112";
			}
			elseif(strtolower($code_type) == "code39")
			{
				$code_array = array("0"=>"111221211","1"=>"211211112","2"=>"112211112","3"=>"212211111","4"=>"111221112","5"=>"211221111","6"=>"112221111","7"=>"111211212","8"=>"211211211","9"=>"112211211","A"=>"211112112","B"=>"112112112","C"=>"212112111","D"=>"111122112","E"=>"211122111","F"=>"112122111","G"=>"111112212","H"=>"211112211","I"=>"112112211","J"=>"111122211","K"=>"211111122","L"=>"112111122","M"=>"212111121","N"=>"111121122","O"=>"211121121","P"=>"112121121","Q"=>"111111222","R"=>"211111221","S"=>"112111221","T"=>"111121221","U"=>"221111112","V"=>"122111112","W"=>"222111111","X"=>"121121112","Y"=>"221121111","Z"=>"122121111","-"=>"121111212","."=>"221111211"," "=>"122111211","$"=>"121212111","/"=>"121211121","+"=>"121112121","%"=>"111212121","*"=>"121121211");

				// Convert to uppercase
				$upper_text = strtoupper($text);

				for($X = 1; $X<=strlen($upper_text); $X++)
				{
					$code_string .= $code_array[substr( $upper_text, ($X-1), 1)] . "1";
				}

				$code_string = "1211212111" . $code_string . "121121211";
			}
			elseif(strtolower($code_type) == "code25")
			{
				$code_array1 = array("1","2","3","4","5","6","7","8","9","0");
				$code_array2 = array("3-1-1-1-3","1-3-1-1-3","3-3-1-1-1","1-1-3-1-3","3-1-3-1-1","1-3-3-1-1","1-1-1-3-3","3-1-1-3-1","1-3-1-3-1","1-1-3-3-1");

				for($X = 1; $X <= strlen($text); $X++)
				{
					for($Y = 0; $Y < count($code_array1); $Y++)
					{
						if(substr($text, ($X-1), 1) == $code_array1[$Y])
							$temp[$X] = $code_array2[$Y];
					}
				}

				for($X=1; $X<=strlen($text); $X+=2)
				{
					$temp1 = explode( "-", $temp[$X] );
					$temp2 = explode( "-", $temp[($X + 1)] );
					for($Y = 0; $Y < count($temp1); $Y++)
						$code_string .= $temp1[$Y] . $temp2[$Y];
				}

				$code_string = "1111" . $code_string . "311";
			}
			elseif(strtolower($code_type) == "codabar")
			{
				$code_array1 = array("1","2","3","4","5","6","7","8","9","0","-","$",":","/",".","+","A","B","C","D");
				$code_array2 = array("1111221","1112112","2211111","1121121","2111121","1211112","1211211","1221111","2112111","1111122","1112211","1122111","2111212","2121112","2121211","1121212","1122121","1212112","1112122","1112221");

				// Convert to uppercase
				$upper_text = strtoupper($text);

				for($X = 1; $X<=strlen($upper_text); $X++)
				{
					for($Y = 0; $Y<count($code_array1); $Y++)
					{
						if(substr($upper_text, ($X-1), 1) == $code_array1[$Y] )
							$code_string .= $code_array2[$Y] . "1";
					}
				}
				$code_string = "11221211" . $code_string . "1122121";
			}

			// Pad the edges of the barcode
			$code_length = 20;
			for($i=1; $i <= strlen($code_string); $i++)
				$code_length = $code_length + (integer)(substr($code_string,($i-1),1));

			if(strtolower($orientation) == "horizontal")
			{
				$img_width = $code_length;
				$img_height = $size;
			}
			else
			{
				$img_width = $size;
				$img_height = $code_length;
			}

			$image = imagecreate($img_width, $img_height);
			$black = imagecolorallocate ($image, 0, 0, 0);
			$white = imagecolorallocate ($image, 255, 255, 255);

			imagefill( $image, 0, 0, $white );

			$location = 10;
			for($position = 1 ; $position <= strlen($code_string); $position++)
			{
				$cur_size = $location + ( substr($code_string, ($position-1), 1) );
				if(strtolower($orientation) == "horizontal")
					imagefilledrectangle( $image, $location, 0, $cur_size, $img_height, ($position % 2 == 0 ? $white : $black) );
				else
					imagefilledrectangle( $image, 0, $location, $img_width, $cur_size, ($position % 2 == 0 ? $white : $black) );
				$location = $cur_size;
			}
			// Draw barcode to the screen
			header('Content-type: image/png');
			imagepng($image, "barcode/".$text.".png");
			imagedestroy($image);
		}	
	}
?>