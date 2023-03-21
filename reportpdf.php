<?php
require_once "tcpdf/tcpdf.php";
require_once "functions.php";

$pdf = new TCPDF('L', 'mm', 'A4', true, 'UTF-8', false);

$pdf->SetCreator('TCPDF');
$pdf->SetAuthor('PSITS');
$pdf->SetTitle('Report');
$pdf->SetSubject('System Report');
$pdf->SetKeywords('report, PSITS, attmonsys, system report');

$pdf->SetHeaderData('../images/default.png', 19, 'Report Generation', "PSITS\nAddress: Rizal Street, Talisay City 6115\nTel No: (055) 495-5555", array(0,0,0), array(0,0,0));
$pdf->setFooterData(array(0,0,0), array(0,0,0));

$pdf->setHeaderFont(Array('helvetica', '', 10));
$pdf->setFooterFont(Array('helvetica', '', 8));

$pdf->SetDefaultMonospacedFont('courier');

$pdf->SetMargins(15, 27, 15);
$pdf->SetHeaderMargin(5);
$pdf->SetFooterMargin(10);

$pdf->SetAutoPageBreak(TRUE, 25);

$pdf->setImageScale(1.25);

if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
	require_once(dirname(__FILE__).'/lang/eng.php');
	$pdf->setLanguageArray($l);
}

$pdf->setFontSubsetting(true);

$pdf->SetFont('dejavusans', '', 11, '', true);

$pdf->AddPage();

$pdf->setTextShadow(array('enabled'=>true, 'depth_w'=>0.2, 'depth_h'=>0.2, 'color'=>array(196,196,196), 'opacity'=>1, 'blend_mode'=>'Normal'));

if(isset($_GET['action'])){
	if($_GET['action'] == "print"){
		if(isset($_GET['type'])){
			if($_GET['type'] == "students"){ 
				$loadStudent = System::loadStudent();

				$html = '
				<h3>Students List</h3>
				<table cellpadding="2" border="0" border-collapse="0">
					<thead>
						<tr>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">First Name</td>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Last Name</td>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Barcode</td>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Username/Email</td>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Password</td>			
						</tr>
					</thead>
				';

				$html .= '<tbody>';

				foreach($loadStudent as $student):

				$html .= '<tr>
					<td>'.$student['firstname'].'</td>
					<td>'.$student['lastname'].'</td>
					<td><img src="barcode/'.$student['barcodeid'].'.png" /></td>
					<td>'.$student['email'].'</td>
					<td>'.$student['password'].'</td>	
				</tr>';

				endforeach;

				$html .= '</tbody>';

				$html .= '</table>';
			}	
			
			if($_GET['type'] == "personnels"){ 
				$loadPersonnel = System::loadPersonnel();

				$html = '
				<h3>Personnels List</h3>
				<table cellpadding="2" border="0" border-collapse="0">
					<thead>
						<tr>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">First Name</td>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Last Name</td>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Password</td>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Area of Privilege</td>			
						</tr>
					</thead>
				';

				$html .= '<tbody>';

				foreach($loadPersonnel as $personnel):

				$html .= '<tr>
					<td>'.$personnel['firstname'].'</td>
					<td>'.$personnel['lastname'].'</td>
					<td>'.$personnel['password'].'</td>
					<td>'.strtoupper($personnel['area_privilege']).'</td>	
				</tr>';
				
				endforeach;

				$html .= '</tbody>';

				$html .= '</table>';
			}	
			
			if($_GET['type'] == "subjects"){ 
				$loadSubject = System::loadSubject();

				$html = '
				<h3>Subjects List</h3>
				<table cellpadding="2" border="0" border-collapse="0">
					<thead>
						<tr>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Subject Name</td>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Subject Description</td>			
						</tr>
					</thead>
				';

				$html .= '<tbody>';

				foreach($loadSubject as $subject):

				$html .= '<tr>
					<td>'.$subject['subject_name'].'</td>
					<td>'.$subject['subject_description'].'</td>
				</tr>';
				
				endforeach;

				$html .= '</tbody>';

				$html .= '</table>';
			}	
			
			if($_GET['type'] == "teachers"){ 
				$loadTeacher = System::loadTeacher();

				$html = '
				<h3>Teachers List</h3>
				<table cellpadding="2" border="0" border-collapse="0">
					<thead>
						<tr>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">First Name</td>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Last Name</td>			
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Username</td>			
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Subjects Under</td>			
						</tr>
					</thead>
				';

				$html .= '<tbody>';

				foreach($loadTeacher as $teacher):
				$loadTeacherSubject = System::loadTeacherSubject($teacher['tid']); 
				$html .= '<tr>
					<td>'.$teacher['firstname'].'</td>
					<td>'.$teacher['lastname'].'</td>
					<td>'.$teacher['username'].'</td>';
				$html .= '<td style="font-size:12px;">';
				if(!empty($loadTeacherSubject)){
				foreach($loadTeacherSubject as $info):
					$html .= $info['subject_name'].': '.date('h:i A',strtotime($info['starttime'])).' - '.date('h:i A',strtotime($info['starttime'])).'<br/>';
				endforeach;
				} else {
					$html .= 'No Assigned Subject(s)';
				}
				$html .= '</td></tr>';
				
				endforeach;

				$html .= '</tbody>';

				$html .= '</table>';
			}	
			
			if($_GET['type'] == "teachersubj"){ 
				$loadTeacherSubjects = System::loadTeacherSubject($_GET['tid']); 
				$loadTeacherInfo = System::loadTeacherInfo($_GET['tid']); 

				$html = '
				<h3>Teacher '.$loadTeacherInfo['firstname'].'\'s Schedule</h3>
				<table cellpadding="2" border="0" border-collapse="0">
					<thead>
						<tr>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Subject Name</td>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Start Class Time</td>			
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">End Class Time</td>		
						</tr>
					</thead>
				';

				$html .= '<tbody>';
				if(!empty($loadTeacherSubjects)):
					foreach($loadTeacherSubjects as $subj):
						$html .= '<tr>';
						$html .= '<td>'.$subj['subject_name'].'</td>';
						$html .= '<td>'.date('h:i A',strtotime($subj['starttime'])).'</td>';
						$html .= '<td>'.date('h:i A',strtotime($subj['endtime'])).'</td>';
						$html .= '</tr>';
					endforeach;
				else:
					$html .= '<tr>';
					$html .= '<td colspan="3" align="center">No Subject Assigned</td>';
					$html .= '</tr>';
				endif;
				

				$html .= '</tbody>';

				$html .= '</table>';
			}
			
			if($_GET['type'] == "studentsubj"){ 
				$loadTeacherSubjectStudent = System::loadTeacherSubjectStudent($_GET['sid']);
				$loadStudentInfo = System::loadStudentInfo($_GET['sid']); 

				$html = '
				<h3>'.$loadStudentInfo['firstname'].'\'s Schedule</h3>
				<table cellpadding="2" border="0" border-collapse="0">
					<thead>
						<tr>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Subject Name</td>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Teacher Name</td>			
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Start Class Time</td>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">End Class Time</td>		
						</tr>
					</thead>
				';

				$html .= '<tbody>';
				if(!empty($loadTeacherSubjectStudent)):
					foreach($loadTeacherSubjectStudent as $tsubjstud): 
						$html .= '<tr>';
						$html .= '<td>'.$tsubjstud['subject_name'].'</td>';
						$html .= '<td>'.$tsubjstud['firstname'].' '.$tsubjstud['lastname'].'</td>';
						$html .= '<td>'.date('h:i A',strtotime($tsubjstud['starttime'])).'</td>';
						$html .= '<td>'.date('h:i A',strtotime($tsubjstud['endtime'])).'</td>';
						$html .= '</tr>';
					endforeach;
				else:
					$html .= '<tr>';
					$html .= '<td colspan="3" align="center">No Subject</td>';
					$html .= '</tr>';
				endif;
				

				$html .= '</tbody>';

				$html .= '</table>';
			}
			
			if($_GET['type'] == "attendance"){ 
				if(isset($_GET['custom'])){
					$getAttendanceLog = System::getAttendanceLogWithRange($_GET['subjtid'],$_GET['fromRange'],$_GET['toRange']);
				} else {
					$getAttendanceLog = System::getAttendanceLog($_GET['subjtid']);
				}
				$getSubjectInfo = System::getSubjectInfo($_GET['subjtid']);

				$html = '
				<h3>Attendance Log for '.$getSubjectInfo['subject_name'].'</h3>
				<h4>Adviser: '.$getSubjectInfo['firstname']." ".$getSubjectInfo['lastname'].'</h4>
				<table cellpadding="2" border="0" border-collapse="0">
					<thead>
						<tr>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Student Name</td>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Date</td>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Remarks</td>		
						</tr>
					</thead>
				';

				$html .= '<tbody>';
				if(!empty($getAttendanceLog)):
					foreach($getAttendanceLog as $log): 
						$html .= '<tr>';
						$html .= '<td>'.$log['firstname'].' '.$log['lastname'].'</td>';
						$html .= '<td>'.date('F d, Y',strtotime($log['logdate'])).'</td>';
						if($log['time_difference'] < 15){ 
						$html .= '<td>Present</td>';
						} else if($log['time_difference'] < 30) {
						$html .= '<td>Late</td>';
						} else {
						$html .= '<td>Absent</td>';
						}
						$html .= '</tr>';
					endforeach;
				else:
					$html .= '<tr>';
					$html .= '<td colspan="4" align="center">No Attendance Log</td>';
					$html .= '</tr>';
				endif;
				

				$html .= '</tbody>';

				$html .= '</table>';
			}
			
			if($_GET['type'] == "attendancelogstud"){ 
				if(isset($_GET['custom'])){
					$loadStudentLog = System::loadStudentLogWithRange($_GET['sid'],$_GET['fromRange'],$_GET['toRange']);
				} else {
					$loadStudentLog = System::loadStudentLog($_GET['sid']);
				}
				
				$loadStudentInfo = System::loadStudentInfo($_GET['sid']);

				$html = '
				<h3>Attendance Log for '.$loadStudentInfo['firstname']." ".$loadStudentInfo['lastname'].'</h3>
				<table cellpadding="2" border="0" border-collapse="0">
					<thead>
						<tr>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Date</td>			
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Time</td>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Remarks</td>		
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Place</td>		
						</tr>
					</thead>
				';

				$html .= '<tbody>';
				if(!empty($loadStudentLog)):
					foreach($loadStudentLog as $log): 
						$html .= '<tr>';
						$html .= '<td>'.date('m-d-Y',strtotime($log['logdate'])).'</td>';
						$html .= '<td>'.date('h:i A',strtotime($log['logtime'])).'</td>';
						$html .= '<td>'.$log['remarks'].'</td>';
						$html .= '<td>'.$log['place'].'</td>';
						$html .= '</tr>';
					endforeach;
				else:
					$html .= '<tr>';
					$html .= '<td colspan="4" align="center">No Attendance Log</td>';
					$html .= '</tr>';
				endif;
				

				$html .= '</tbody>';

				$html .= '</table>';
			}
			
			if($_GET['type'] == "tracking"){
				if(isset($_GET['custom'])){
					$loadTrackingLog = System::loadTrackingLogWithRange($_GET['place'],$_GET['fromRange'],$_GET['toRange']);
				} else {
					$loadTrackingLog = System::loadTrackingLog($_GET['place']);
				}

					$html = '
					<h3>Tracking Log for '.strtoupper($_GET['place']).'</h3>
					<table cellpadding="2" border="0" border-collapse="0">
						<thead>
							<tr>
								<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Student Name</td>			
								<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Date</td>			
								<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Time</td>
								<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Remarks</td>	
							</tr>
						</thead>
					';

					$html .= '<tbody>';
					if(!empty($loadTrackingLog)):
						foreach($loadTrackingLog as $log): 
							$html .= '<tr>';
							$html .= '<td>'.$log['firstname'].' '.$log['lastname'].'</td>';
							$html .= '<td>'.date('m-d-Y',strtotime($log['logdate'])).'</td>';
							$html .= '<td>'.date('h:i A',strtotime($log['logtime'])).'</td>';
							$html .= '<td>'.$log['remarks'].'</td>';
							$html .= '</tr>';
						endforeach;
					else:
						$html .= '<tr>';
						$html .= '<td colspan="4" align="center">No Attendance Log</td>';
						$html .= '</tr>';
					endif;
					

					$html .= '</tbody>';

					$html .= '</table>';
			}
			
			if($_GET['type'] == "subjstudents"){ 
				$getTeachersStudentBySubject = System::getTeachersStudentBySubject($_GET['tid'],$_GET['subjid']);
				$getSubjectAndTeacherInfo = System::getSubjectAndTeacherInfo($_GET['tid'],$_GET['subjid']);

				$html = '
				<h3>Students for '.$getSubjectAndTeacherInfo['subject_name'].'</h3>
				<h4>Adviser: '.$getSubjectAndTeacherInfo['firstname']." ".$getSubjectAndTeacherInfo['lastname'].'</h4>
				<table cellpadding="2" border="0" border-collapse="0">
					<thead>
						<tr>
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">First Name</td>	
							<td style="border-bottom:1px solid #000000;border-top:1px solid #000000;font-weight:bold;">Last Name</td>	
						</tr>
					</thead>
				';

				$html .= '<tbody>';
				if(!empty($getTeachersStudentBySubject)):
					foreach($getTeachersStudentBySubject as $stud): 
						$html .= '<tr>';
						$html .= '<td>'.$stud['firstname'].'</td>';
						$html .= '<td>'.$stud['lastname'].'</td>';
						$html .= '</tr>';
					endforeach;
				else:
					$html .= '<tr>';
					$html .= '<td colspan="2" align="center">No Students</td>';
					$html .= '</tr>';
				endif;
				

				$html .= '</tbody>';

				$html .= '</table>';
			}
		}
	}
}

$pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);

$pdf->Output('reportpdf.pdf', 'I');
?>