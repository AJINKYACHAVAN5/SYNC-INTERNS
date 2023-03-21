<?php 
include('functions.php');
$loadStudent = System::loadStudent();
if(isset($_POST['valid'])):
?>
	<div class="container contentArea">
		<div class="row">
			<div class="col-md-8">
				<?php if(!empty($loadStudent)): ?>
					<div class="table-designed-header"><h3>Student List</h3></div>
					<div class="table-designed">
						<table id="studentTable" class="table">
							<thead>
								<tr>
									<th>#</th>
									<th>Image</th>
									<th>Barcode</th>
									<th>FirstName</th>
									<th>LastName</th>
									<th>Password</th>
									<th>Email</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								<?php 
								$i = 0;
								foreach($loadStudent as $student): 
								$i++;
								?>
								<tr>
									<td><?php echo $i; ?></td>
									<td><a href="#!/student/<?php echo $student['sid']; ?>" class="thumbnail"><img style="width:100%" src="uploads/<?php echo $student['image']; ?>" class="img-thumbnail" /></a></td>
									<td><?php echo $student['barcodeid']; ?></td>
									<td><?php echo $student['firstname']; ?></td>
									<td><?php echo $student['lastname']; ?></td>
									<td><?php echo $student['password']; ?></td>
									<td><?php echo $student['email']; ?></td>
									<td><a id="deleteStudent" sid="<?php echo $student['sid']; ?>" class="btn btn-xs btn-danger">Delete</a></td>
								</tr>
								<?php endforeach; ?> 
							</tbody>
						</table>
					</div>
				
				<?php else: ?>
				<div class="alert alert-info">
					<p>No Student!</p>
				</div>
				<?php endif; ?>
			</div>
			<div class="col-md-4">
				<form id="addStudent" rel="student" class="submitForm" formtype="student" role="form" action="ajax.php" method="POST" enctype="multipart/form-data">
					<input type="hidden" name="action" value="add_student" />
					<div class="form-group">
						<label for="fname">First Name:</label>
						<input type="text" class="form-control" name="fname" id="fname" placeholder="Enter First Name" required>
					</div>
					<div class="form-group">
						<label for="lname">Last Name:</label>
						<input type="text" class="form-control" name="lname" id="lname" placeholder="Enter Last Name" required>
					</div>
					<div class="form-group">
						<label for="email">Email:</label>
						<input type="email" class="form-control" name="email" id="email" placeholder="Enter Email" required>
					</div>
					<div class="form-group">
						<label for="photo">Photo:</label>
						<input type="file" class="form-control" name="photo" id="photo" placeholder="Enter your Photo" required>
					</div>
					<div class="form-group">
						<label for="yearsectionid">Year Section</label>
						<?php 
						$loadYearSection = System::loadYearSection(); 
						if(!empty($loadYearSection)){
						?>
						<select class="form-control" name="yearsectionid">
						<?php foreach($loadYearSection as $yearsection): ?>
						<option value="<?php echo $yearsection['yearsectionid']; ?>"><?php echo $yearsection['yearname']; ?> - <?php echo $yearsection['sectionname']; ?></option>
						<?php endforeach; ?>
						</select>
						<?php } ?>
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
					<button type="submit" class="btn btn-success">Add Student</button>
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