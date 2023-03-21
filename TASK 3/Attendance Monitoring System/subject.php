<?php 
include('functions.php');
$loadSubject = System::loadSubject();
if(isset($_POST['valid'])):
?>
	<div class="container contentArea">
		<div class="row">
			<div class="col-md-8">
				<?php if(!empty($loadSubject)): ?>
					<div class="table-designed-header"><h3>Subjects List</h3></div>
					<div class="table-designed">
						<table id="subjectTable" class="table">
							<thead>
								<tr>
									<th>#</th>
									<th>Subject Name</th>
									<th>Subject Description</th>
									<th>Year Level</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								<?php 
								$i = 0;
								foreach($loadSubject as $subject): 
								$i++;
								?>
								<tr>
									<td><?php echo $i; ?></td>
									<td><?php echo $subject['subject_name']; ?></td>
									<td><?php echo $subject['subject_description']; ?></td>
									<td><?php echo $subject['yearname']; ?></td>
									<td><a id="deleteSubject" class="btn btn-xs btn-danger" subjid="<?php echo $subject['subjid']; ?>">Delete</a></td>
								</tr>
								<?php endforeach; ?> 
							</tbody>
						</table>
					</div>
				
				<?php else: ?>
				<div class="alert alert-info">
					<p>No Subject!</p>
				</div>
				<?php endif; ?>
			</div>
			<div class="col-md-4">
				<form id="addSubject" rel="subject" class="submitForm" role="form" action="ajax.php" method="POST" enctype="multipart/form-data">
					<input type="hidden" name="action" value="add_subject" />
					<div class="form-group">
						<label for="subject_name">Subject Name:</label>
						<input type="text" class="form-control" name="subject_name" id="subject_name" placeholder="Enter Subject Name" required>
					</div>
					<div class="form-group">
						<label for="subject_description">Subject Description:</label>
						<textarea name="subject_description" class="form-control" placeholder="Enter Subject Description" required></textarea>
					</div>
					<?php $loadYearLevels = System::loadYearLevels(); ?>
					<div class="form-group">
						<label for="yearlevel">Assign to Year Level:</label>
						<?php 
						if(!empty($loadYearLevels)): 
						?>
						<select name="yearlevelid" required class="form-control">
						<?php
						foreach($loadYearLevels as $yearlevel):
						?>
						<option value="<?php echo $yearlevel['yearlevelid']; ?>"><?php echo $yearlevel['yearname']; ?></option>
						<?php 
						endforeach;
						?>
						</select>
						<?php
						endif; 
						?>
					</div>
					<button type="submit" class="btn btn-success">Add Subject</button>
				</form>
				<div id="statuses" class="col-md-12">
					<div class="progress hide">
						<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
					</div>
					<div id="percent" class="hide"><p>0% Complete (success)</p></div>
					<div id="message" class="alert hide"></div>
				</div>
			</div>
		</div>
	</div>
<?php else: ?>
	<p>Invalid Access</p>
<?php endif; ?>