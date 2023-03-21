<?php 
session_start();
include('functions.php');
?>
<div class="container">
<?php
if(isset($_POST['valid'])):
	if($_SESSION['level'] == 2){
	$loadAllTeacherSubject = System::loadAllTeacherSubject($_SESSION['tid']);
?>
	<div class="row">
		<div class="col-md-4">
			<h3>Select Subject:</h3>
			<div class="form-group">
				<select id="loadStudentPerSubject" class="form-control" name="subjid" tid="<?php echo $_SESSION['tid']; ?>">
					<option value="">Select Subject</option>
				<?php foreach($loadAllTeacherSubject as $subject): ?>
					<option value="<?php echo $subject['subjid']; ?>"><?php echo $subject['subject_name']; ?> [<?php echo date("h:i",strtotime($subject['starttime'])); ?> - <?php echo date("h:i A",strtotime($subject['endtime'])); ?>]</option>
				<?php endforeach; ?>
				</select>
			</div>
		</div>
	</div>
	<div class="row">
		<div id="resultAreaDisplay" class="col-md-12 hide"></div>
	</div>
	<?php } else { ?>
		<p class="alert alert-danger" style="margin-top:10px;">Invalid Access</p>
	<?php } ?>
<?php else: ?>
	<p class="alert alert-danger" style="margin-top:10px;">Invalid Access</p>
<?php endif; ?>
</div>