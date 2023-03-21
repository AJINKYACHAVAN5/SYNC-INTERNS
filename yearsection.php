<?php 
include('functions.php');
$loadAllYearLevel = System::loadAllYearLevel();
if(isset($_POST['valid'])):
?>
	<div class="container contentArea">
		<div class="row">
			<div class="col-md-8">
				<?php if(!empty($loadAllYearLevel)): ?>
					<div class="table-designed-header"><h3>Year Levels</h3></div>
					<div class="table-designed">
						<table id="subjectTable" class="table">
							<thead>
								<tr>
									<th>Title</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								<?php
								foreach($loadAllYearLevel as $yearlevel): 
								?>
								<tr>
									<td><?php echo $yearlevel['yearname']; ?></td>
									<td>
									<a class="btn btn-small btn-info" href="#!/yearlevel/<?php echo $yearlevel['yearlevelid']; ?>">Modify</a>
									<a class="btn btn-small btn-danger" id="deleteYearLevel" yearlevelid="<?php echo $yearlevel['yearlevelid']; ?>">Delete</a>
									</td>
								</tr>
								<?php endforeach; ?> 
							</tbody>
						</table>
					</div>
				<?php else: ?>
				<div class="alert alert-info">
					<p>No Levels!</p>
				</div>
				<?php endif; ?>
			</div>
			<div class="col-md-4">
				<form id="addYearLevel" rel="yearlevel" class="submitForm" role="form" action="ajax.php" method="POST" enctype="multipart/form-data">
					<input type="hidden" name="action" value="add_yearlevel" />
					<div class="form-group">
						<label for="yearname">Year Level:</label>
						<input type="text" class="form-control" name="yearname" id="yearname" placeholder="Enter Year Name" required>
					</div>
					<button type="submit" class="btn btn-success">Add Year Level</button>
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