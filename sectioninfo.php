<?php 
session_start();
include('functions.php');
$loadStudentInfo = System::loadStudentInfo($_SESSION['sid']);
?>
<div class="container">
<?php
if(isset($_POST['valid'])):
	if($_SESSION['level'] == 0){
	$loadStudentSectionInfo = System::loadStudentSectionInfo($_SESSION['sid']);
?>
	<div class="row" style="margin-top:20px;">
		<div class="table-designed-header"><h3><?php echo $loadStudentInfo['yearname']; ?> - <?php echo $loadStudentInfo['sectionname']; ?> Schedule</h3></div>
		<div class="table-designed">
			<table class="table">
				<thead>
					<tr>
						<th>Subject Name</th>
						<th>Teacher</th>
						<th>Time</th>
					</tr>
				</thead>
				<tbody>
					<?php 
					foreach($loadStudentSectionInfo as $sectionstud): 
					?>
					<tr>
						<td><?php echo $sectionstud['subject_name']; ?></td>
						<td><?php echo $sectionstud['firstname']; ?> <?php echo $sectionstud['lastname']; ?></td>
						<td><?php echo date("h:i A",strtotime($sectionstud['starttime'])); ?> - <?php echo date("h:i A",strtotime($sectionstud['endtime'])); ?></td>
					</tr>
					<?php endforeach; ?> 
				</tbody>
			</table>
		</div>
		</div>
	<?php } else { ?>
		<p class="alert alert-danger" style="margin-top:10px;">Invalid Access</p>
	<?php } ?>
<?php else: ?>
	<p class="alert alert-danger" style="margin-top:10px;">Invalid Access</p>
<?php endif; ?>
</div>