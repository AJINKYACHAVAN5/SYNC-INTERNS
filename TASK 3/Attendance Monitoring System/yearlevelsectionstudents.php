<?php 
include('functions.php');
if(isset($_POST['valid'])):
$loadSectionStudent = System::loadSectionStudent($_POST['yearlevelsectionid']);
$getStudentListWithoutSection = System::getStudentListWithoutSection($_POST['yearlevelsectionid']);
?>
<div class="container contentArea">
		<div class="row">
			<div class="col-md-8">
				<?php if(!empty($loadSectionStudent)): ?>
				<div id="printArea">
					<div class="table-designed-header"><h3>Students</h3></div>
					<div class="table-designed">
						<table id="studentTable" class="table">
							<thead>
								<tr>
									<th>#</th>
									<th>Student Name</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								<?php 
								$i = 0;
								foreach($loadSectionStudent as $sectionstud): 
								$i++;
								?>
								<tr id="secsubj_<?php echo $sectionstud['sid']; ?>">
									<td><?php echo $i; ?></td>
									<td><?php echo $sectionstud['firstname']; ?> <?php echo $sectionstud['lastname']; ?></td>
									<td><a id="removeStudentSection" class="btn btn-danger" sid="<?php echo $sectionstud['sid']; ?>" ylssid="<?php echo $sectionstud['ylssid']; ?>" yearlevel="<?php echo $_POST['yearlevelid']; ?>" yearsectionid="<?php echo $_POST['yearlevelsectionid']; ?>">Remove</a></td>
								</tr>
								<?php endforeach; ?> 
							</tbody>
						</table>
					</div>
				</div>
				<!-- <a class="btn btn-info pull-right" target="_blank" style="margin-top:10px;" href="reportpdf.php?action=print&type=studentsubj&sid=<?php echo $_POST['sid']; ?>"><i class="fa fa-print"></i> Print</a> -->
				<?php else: ?>
				<div class="alert alert-info">
					<p>No Students Found in this Section</p>
				</div>
				<?php endif; ?>
			</div>
			<div class="col-md-4">
				<?php
				if(!empty($getStudentListWithoutSection)):
				?>
				<form id="addStudentToSection" yearlevelid="<?php echo $_POST['yearlevelid']; ?>" rel="yearlevel/<?php echo $_POST['yearlevelid']; ?>/section/<?php echo $_POST['yearlevelsectionid']; ?>/students" role="form" action="ajax.php" method="POST" enctype="multipart/form-data">
					<input type="hidden" name="action" value="add_student_to_section" />
					<input type="hidden" name="yearsectionid" value="<?php echo $_POST['yearlevelsectionid']; ?>" />
					<div class="form-group">
						<label for="subject">Choose Student:</label>
						<select class="form-control" name="sid" id="studentSelect" required>
							<option value="">&nbsp;</option>
						<?php foreach($getStudentListWithoutSection as $student): ?>
							<option value="<?php echo $student['sid']; ?>"><?php echo $student['firstname']; ?> <?php echo $student['lastname']; ?></option>
						<?php endforeach; ?>
						</select>						
					</div>
					<button type="submit" class="btn btn-success">Add Student</button>
				</form>
				<div id="messageText" class="alert alert-danger hide" style="margin-top:10px;">
					<p><strong>Student is already added in this section.</strong></p>
				</div>
				<?php
					else:
				?>
				<p class="alert alert-info">No More Students found!</p>
				<?php
					endif;
				?>
			</div>
		</div>
	</div>
<?php else: ?>
	<p>Invalid Access</p>
<?php endif; ?>