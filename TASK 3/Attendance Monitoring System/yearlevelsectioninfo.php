<?php 
include('functions.php');
if(isset($_POST['valid'])):
?>
<?php 
$getYearLevelSectionInfo = System::getYearLevelSectionInfo($_POST['yearlevelsectionid']); 
$getTeacherSubject = System::getTeacherSubject($_POST['yearlevelid']);
?>
	<div class="container contentArea">
		<div class="row">
			<div class="col-md-8">
				<?php $loadTeacherSubjectSection = System::loadTeacherSubjectSection($_POST['yearlevelsectionid']); ?>
				<?php if(!empty($loadTeacherSubjectSection)): ?>
				<div id="printArea">
					<div class="table-designed-header"><h3>Subject Under Section <?php echo $getYearLevelSectionInfo['sectionname']; ?><a href="#!/yearlevel/<?php echo $_POST['yearlevelid']; ?>/section/<?php echo $_POST['yearlevelsectionid']; ?>/students" class="btn btn-info btn-small pull-right">Manage Students</a></h3></div>
					<div class="table-designed">
						<table id="studentTable" class="table">
							<thead>
								<tr>
									<th>#</th>
									<th>Subject Name</th>
									<th>Teacher Name</th>
									<th>Time</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								<?php 
								$i = 0;
								foreach($loadTeacherSubjectSection as $tsubjstud): 
								$i++;
								?>
								<tr id="subj_<?php echo $tsubjstud['subjtid']; ?>">
									<td><?php echo $i; ?></td>
									<td><?php echo $tsubjstud['subject_name']; ?></td>
									<td><?php echo $tsubjstud['firstname']; ?> <?php echo $tsubjstud['lastname']; ?></td>
									<td><?php echo date("h:i A",strtotime($tsubjstud['starttime'])); ?> - <?php echo date("h:i A",strtotime($tsubjstud['endtime'])); ?></td>
									<td><a id="removeStudentSubjectTeacher" class="btn btn-danger" yearsectionid="<?php echo $tsubjstud['yearsectionid']; ?>" subjtid="<?php echo $tsubjstud['subjtid']; ?>" yearlevelid="<?php echo $_POST['yearlevelid']; ?>">Remove</a></td>
								</tr>
								<?php endforeach; ?> 
							</tbody>
						</table>
					</div>
				</div>
				<a class="btn btn-info pull-right" target="_blank" style="margin-top:10px;" href="reportpdf.php?action=print&type=studentsubj&sid=<?php echo $_POST['yearlevelsectionid']; ?>"><i class="fa fa-print"></i> Print</a>
				<?php else: ?>
				<div class="alert alert-info">
					<p>No Subjects For Section <?php echo $getYearLevelSectionInfo['sectionname']; ?></p>
				</div>
				<?php endif; ?>
			</div>
			<div class="col-md-4">
				<?php
				if(!empty($getTeacherSubject)):
				?>
				<form id="addSubjectTeacherSection" yearlevelid="<?php echo $_POST['yearlevelid']; ?>" rel="yearlevel/<?php echo $_POST['yearlevelid']; ?>/section/<?php echo $_POST['yearlevelsectionid']; ?>" role="form" action="ajax.php" method="POST" enctype="multipart/form-data">
					<input type="hidden" name="action" value="add_subject_teacher_section" />
					<input type="hidden" name="yearsectionid" value="<?php echo $_POST['yearlevelsectionid']; ?>" />
					<div class="form-group">
						<label for="subject">Choose Subject:</label>
						
						<select class="form-control" name="subjtid" id="subjectTidSelect" required>
							<option value="">&nbsp;</option>
						<?php foreach($getTeacherSubject as $subjectTeacher): ?>
							<option value="<?php echo $subjectTeacher['subjtid']; ?>"><?php echo $subjectTeacher['subject_name']; ?> - <?php echo $subjectTeacher['firstname']; ?> [ <?php echo date("h:i A",strtotime($subjectTeacher['starttime'])); ?> - <?php echo date("h:i A",strtotime($subjectTeacher['endtime'])); ?> ]</option>
						<?php endforeach; ?>
						</select>						
					</div>
					<button type="submit" class="btn btn-success">Add Subject</button>
				</form>
				<div id="messageText" class="alert alert-danger hide" style="margin-top:10px;">
					<p><strong>Subject is already added in this section.</strong></p>
				</div>
				<?php
					else:
				?>
				<p class="alert alert-info">No Subject and Teachers are linked to each other.</p>
				<?php
					endif;
				?>
			</div>
		</div>
	</div>
<?php else: ?>
	<p>Invalid Access</p>
<?php endif; ?>