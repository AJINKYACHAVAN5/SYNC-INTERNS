<?php 
include('functions.php');
$loadTeacher = System::loadTeacher();
if(isset($_POST['valid'])):
?>
	<div class="container contentArea">
		<div class="row">
			<div class="col-md-8">
				<?php if(!empty($loadTeacher)): ?>
					<div class="table-designed-header"><h3>Teachers List</h3></div>
					<div class="table-designed">
						<table id="studentTable" class="table">
							<thead>
								<tr>
									<th>#</th>
									<th>Image</th>
									<th>FirstName</th>
									<th>LastName</th>
									<th style="width:38%">Action</th>
								</tr>
							</thead>
							<tbody>
								<?php 
								$i = 0;
								foreach($loadTeacher as $teacher): 
								$i++;
								?>
								<tr>
									<td><?php echo $i; ?></td>
									<td><img src="uploads/<?php echo $teacher['image']; ?>" class="img-thumbnail" width="150" height="150" /></td>
									<td><?php echo $teacher['firstname']; ?></td>
									<td><?php echo $teacher['lastname']; ?></td>
									<td>
									<a id="modifyTeacher" href="#!/teacher/<?php echo $teacher['tid']; ?>" class="btn btn-info">Modify Teacher</a>
									<a id="deleteTeacher" tid="<?php echo $teacher['tid']; ?>" class="btn btn-danger">Delete Teacher</a>
									</td>
								</tr>
								<?php endforeach; ?> 
							</tbody>
						</table>
					</div>

				<?php else: ?>
				<div class="alert alert-info">
					<p>No Teacher!</p>
				</div>
				<?php endif; ?>
			</div>
			<div class="col-md-4">
				<form id="addTeacher" rel="teacher" class="submitForm" role="form" action="ajax.php" method="POST" enctype="multipart/form-data">
					<input type="hidden" name="action" value="add_teacher" />
					<div class="form-group">
						<label for="username">Username:</label>
						<input type="text" class="form-control" name="username" id="username" placeholder="Enter Username" required>
					</div>
					<div class="form-group">
						<label for="password">Password:</label>
						<input type="password" class="form-control" name="password" id="password" placeholder="Enter Password" required>
					</div>
					<div class="form-group">
						<label for="fname">First Name:</label>
						<input type="text" class="form-control" name="fname" id="fname" placeholder="Enter First Name" required>
					</div>
					<div class="form-group">
						<label for="lname">Last Name:</label>
						<input type="text" class="form-control" name="lname" id="lname" placeholder="Enter Last Name" required>
					</div>
					<div class="form-group">
						<label for="photo">Photo:</label>
						<input type="file" class="form-control" name="photo" id="photo" placeholder="Enter your Photo" required>
					</div>
					<div class="form-group">
						<label for="schoolyear">School Year:</label>
						<select class="form-control" name="schoolyear" required>
							<option value="">Select School Year</option>
							<?php for($i = date('Y'); $i >= 1900; $i--){ ?>
							<option value="<?php echo $i; ?>-<?php echo $i+1; ?>"><?php echo $i; ?>-<?php echo $i+1; ?></option>
							<?php } ?>
						</select>
					</div>
					<button type="submit" class="btn btn-success">Add Teacher</button>
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