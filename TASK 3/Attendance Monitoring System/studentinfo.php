<?php 
include('functions.php');
if(isset($_POST['valid'])):
?>
<?php 
$loadStudentInfo = System::loadStudentInfo($_POST['sid']); 
?>
	<div class="container contentArea">
		<div class="row">
			<div class="col-md-8">
				<?php $loadTeacherSubjectStudent = System::loadTeacherSubjectStudent($_POST['sid']); ?>
				<?php if(!empty($loadTeacherSubjectStudent)): ?>
				<div id="printArea">
					<div class="table-designed-header"><h3>Subjects Under <?php echo $loadStudentInfo['yearname']; ?> Section <?php echo $loadStudentInfo['sectionname']; ?></h3></div>
					<div class="table-designed">
						<table id="studentTable" class="table">
							<thead>
								<tr>
									<th>#</th>
									<th>Subject Name</th>
									<th>Teacher Name</th>
									<th>Time</th>
								</tr>
							</thead>
							<tbody>
								<?php 
								$i = 0;
								foreach($loadTeacherSubjectStudent as $tsubjstud): 
								$i++;
								?>
								<tr id="subj_<?php echo $tsubjstud['subjtid']; ?>">
									<td><?php echo $i; ?></td>
									<td><?php echo $tsubjstud['subject_name']; ?></td>
									<td><?php echo $tsubjstud['firstname']; ?> <?php echo $tsubjstud['lastname']; ?></td>
									<td><?php echo date("h:i A",strtotime($tsubjstud['starttime'])); ?> - <?php echo date("h:i A",strtotime($tsubjstud['endtime'])); ?></td>
								</tr>
								<?php endforeach; ?> 
							</tbody>
						</table>
					</div>
				</div>
				<a class="btn btn-info pull-right" target="_blank" style="margin-top:10px;" href="reportpdf.php?action=print&type=studentsubj&sid=<?php echo $_POST['sid']; ?>"><i class="fa fa-print"></i> Print</a>
				<?php else: ?>
				<div class="alert alert-info">
					<p>No Subjects For <?php echo $loadStudentInfo['firstname']; ?></p>
				</div>
				<?php endif; ?>
			</div>
			<div class="col-md-4">
				
			</div>
		</div>
	</div>
<?php else: ?>
	<p>Invalid Access</p>
<?php endif; ?>