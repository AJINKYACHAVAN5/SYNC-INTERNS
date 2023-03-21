<?php 
include('functions.php');
$loadSubject = System::loadSubject();
if(isset($_POST['valid'])):
?>
<?php 
$loadTeacherInfo = System::loadTeacherInfo($_POST['tid']); 
?>
	<div class="container contentArea">
		<div class="row">
			<div class="col-md-8">
				<?php $loadTeacherSubject = System::loadTeacherSubject($_POST['tid']); ?>
				<?php if(!empty($loadTeacherSubject)): ?>
				<div class="table-designed-header"><h3>Subject Under Teacher <?php echo $loadTeacherInfo['firstname']; ?></h3></div>
				<div class="table-designed">
					<table id="studentTable" class="table">
						<thead>
							<tr>
								<th>#</th>
								<th>Subject Name</th>
								<th>Start</th>
								<th>End</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<?php 
							$i = 0;
							foreach($loadTeacherSubject as $tsubj): 
							$i++;
							?>
							<tr id="subj_<?php echo $tsubj['subjid']; ?>">
								<td><?php echo $i; ?></td>
								<td><?php echo $tsubj['subject_name']; ?></td>
								<td><?php echo date("h:i A",strtotime($tsubj['starttime'])); ?></td>
								<td><?php echo date("h:i A",strtotime($tsubj['endtime'])); ?></td>
								<td><a id="removeSubjectTeacher" class="btn btn-danger" tid="<?php echo $tsubj['tid']; ?>" subjid="<?php echo $tsubj['subjid']; ?>">Remove</a></td>
							</tr>
							<?php endforeach; ?> 
						</tbody>
					</table>
				</div>
				
				<?php else: ?>
				<div class="alert alert-info">
					<p>No Subjects For Teacher <?php echo $loadTeacherInfo['firstname']; ?></p>
				</div>
				<?php endif; ?>
			</div>
			<div class="col-md-4">
				<form id="addSubjectTeacher" rel="teacher/<?php echo $_POST['tid']; ?>" role="form" action="ajax.php" method="POST" enctype="multipart/form-data">
					<input type="hidden" name="action" value="add_subject_teacher" />
					<input type="hidden" name="tid" value="<?php echo $_POST['tid']; ?>" />
					<div class="form-group">
						<label for="subject">Choose Subject:</label>
						<?php
						if(!empty($loadSubject)):
						?>
						<select class="form-control" name="subjid" id="subjectIDSelect" required>
							<option value="">&nbsp;</option>
						<?php foreach($loadSubject as $subject): ?>
							<option value="<?php echo $subject['subjid']; ?>"><?php echo $subject['subject_name']; ?></option>
						<?php endforeach; ?>
						</select>
						<?php
						else:
						?>
						
						<?php
						endif;
						?>
					</div>
					<div class="form-group">
						<label for="start">Set Time Start:</label>
						<input type="text" name="start" id="start" value="07:30am" />
					</div>
					<div class="form-group">
						<label for="end">Set Time End:</label>
						<input type="text" name="end" id="end" value="08:30am" />
					</div>
					<button type="submit" class="btn btn-success">Add Subject</button>
				</form>
				<div id="messageText" class="alert alert-danger hide" style="margin-top:10px;">
					<p><strong>Subject is already added in this teacher.</strong></p>
				</div>
			</div>
		</div>
	</div>
<?php else: ?>
	<p>Invalid Access</p>
<?php endif; ?>