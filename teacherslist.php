<?php 
session_start();
include('functions.php');
?>
<div class="container">
<?php
if(isset($_POST['valid'])):
	if($_SESSION['level'] == 0){
	$loadStudentsTeacher = System::loadStudentsTeacher($_SESSION['sid']);
?>
		<div id="teachersListWrap" class="row">
			<?php if(!empty($loadStudentsTeacher)): ?>
				<?php foreach($loadStudentsTeacher as $key => $teacher): ?>
				<?php
				$subjlist = System::loadTeachersSubjectUnderStudent($teacher['tid'],$_SESSION['sid']);
				?>
				<div class="col-xs-6 col-md-3">
					<div class="thumbnail">
						<img src="uploads/<?php echo $teacher['image']; ?>" alt="">
						<div class="caption">
							<h4><?php echo $teacher['firstname']." ".$teacher['lastname']; ?></h4>
							<?php if(!empty($subjlist)): ?>
							<h5>Subject(s) under:</h5>
							<ul class="list-group">
							<?php foreach($subjlist as $key => $subj): ?>
								<li style="list-style:none"><?php echo $subj['subject_name']; ?>: <?php echo date("h:i A",strtotime($subj['starttime'])); ?> - <?php echo date("h:i A",strtotime($subj['endtime']));; ?></li>
							<?php endforeach; ?>
							</ul>
							<?php endif; ?>
						</div>
					</div>
				</div>
				<?php endforeach; ?>
			<?php else: ?>
				<p class="alert alert-info">There are no classes connected to you yet.</p>
			<?php endif; ?>
		</div>
	<?php } else { ?>
		<p class="alert alert-danger" style="margin-top:10px;">Invalid Access</p>
	<?php } ?>
<?php else: ?>
	<p class="alert alert-danger" style="margin-top:10px;">Invalid Access</p>
<?php endif; ?>
</div>