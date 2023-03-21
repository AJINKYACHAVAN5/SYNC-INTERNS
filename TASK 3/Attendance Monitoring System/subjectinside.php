<?php 
include('functions.php');
$loadSubject = System::loadSubject();
if(isset($_POST['valid'])):
?>
	<div class="container contentArea">
		<div class="row">
			<div class="col-md-8">
				<?php if(!empty($loadSubject)): ?>
				<table id="subjectTable" class="table table-bordered">
					<thead>
						<tr>
							<th>#</th>
							<th>Subject Name</th>
							<th>Subject Description</th>
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
						</tr>
						<?php endforeach; ?> 
					</tbody>
				</table>
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
						<p class="help-block">Example block-level help text here.</p>
					</div>
					<div class="form-group">
						<label for="subject_description">Subject Description:</label>
						<textarea name="subject_description" class="form-control" placeholder="Enter Subject Description" required></textarea>
						<p class="help-block">Example block-level help text here.</p>
					</div>
					<button type="submit" class="btn btn-default">Add Subject</button>
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