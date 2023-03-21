<?php 
session_start();
include('functions.php');
?>
<div class="container">
<?php
if(isset($_POST['valid'])):
	if($_SESSION['level'] == 0){
	$loadStudentLog = System::loadStudentLog($_SESSION['sid']);
?>
		<div class="row" style="margin-top:20px;">
			<?php if(!empty($loadStudentLog)): ?>
			<div class="table-designed-header"><h3>Attendance Log</h3></div>
			<div class="table-designed">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>#</th>
							<th>Date</th>
							<th>Time</th>
							<th>Remarks</th>
							<th>Place</th>
						</tr>
					</thead>
					<tbody>
						<?php foreach($loadStudentLog as $key => $log): ?>
						<tr>
							<td><?php echo $key + 1; ?></td>
							<td><?php echo $log['logdate']; ?></td>
							<td><?php echo date("h:i A",strtotime($log['logtime'])); ?></td>
							<td>
							<?php if($log['time_difference'] < 15){ ?>
							Present
							<?php } else if($log['time_difference'] < 30) { ?>
							Late
							<?php } else { ?>
							Absent
							<?php } ?>
							</td>
							<td><?php echo ucfirst($log['place']); ?><?php echo ($log['place'] == "classroom") ? ": Subject - ".$log['subject_name'] : ""; ?></td>
						</tr>
						<?php endforeach; ?>
					</tbody>
				</table>
			</div>
			<div class="clearfix"></div>
			<a class="btn btn-info" target="_blank" style="margin-top:10px;" href="reportpdf.php?action=print&type=attendancelogstud&sid=<?php echo $_SESSION['sid']; ?>"><i class="fa fa-print"></i> Generate Print For All Record</a>
			<?php else: ?>
			<p class="alert alert-info">You don't have any activity yet!</p>
			<?php endif; ?>
		</div>
	<?php } else { ?>
		<p class="alert alert-danger" style="margin-top:10px;">Invalid Access</p>
	<?php } ?>
<?php else: ?>
	<p class="alert alert-danger" style="margin-top:10px;">Invalid Access</p>
<?php endif; ?>
</div>