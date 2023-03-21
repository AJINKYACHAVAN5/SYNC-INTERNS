<?php 
include('functions.php');
if(isset($_POST['valid'])):
$getYearLevelInfo = System::getYearLevelInfo($_POST['yearlevelid']);
$loadAllYearSections = System::loadAllYearSections($_POST['yearlevelid']); 
?>
	<div class="container contentArea">
		<div class="row">
			<div class="col-md-8">
				<?php if(!empty($loadAllYearSections)): ?>
					<div class="table-designed-header"><h3>Sections Under <?php echo $getYearLevelInfo['yearname']; ?></h3></div>
					<div class="table-designed">
						<table id="studentTable" class="table">
							<thead>
								<tr>
									<th>Section Name</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								<?php 
								foreach($loadAllYearSections as $yearsection): 
								?>
								<tr>
									<td><?php echo $yearsection['sectionname']; ?></td>
									<td>
									<a class="btn btn-small btn-info" href="#!/yearlevel/<?php echo $_POST['yearlevelid']; ?>/section/<?php echo $yearsection['yearsectionid']; ?>">Modify</a>
									</td>
								</tr>
								<?php endforeach; ?> 
							</tbody>
						</table>
					</div>
				<?php else: ?>
				<div class="alert alert-info">
					<p>No Sections Under <?php echo $getYearLevelInfo['yearname']; ?></p>
				</div>
				<?php endif; ?>
			</div>
			<div class="col-md-4">
				<form id="addSectionYearLevel" rel="yearlevel/<?php echo $_POST['yearlevelid']; ?>" role="form" action="ajax.php" method="POST" enctype="multipart/form-data">
					<input type="hidden" name="action" value="add_section_to_yearlevel" />
					<input type="hidden" name="yearlevelid" value="<?php echo $_POST['yearlevelid']; ?>" />
					<div class="form-group">
						<label for="subject">Add Section:</label>
						<input class="form-control" type="text" name="sectionname" id="sectionname" placeholder="Section Name" required />		
					</div>
					<button type="submit" class="btn btn-success">Add Section</button>
				</form>
				<div id="messageText" class="alert alert-danger hide" style="margin-top:10px;">
					<p><strong>Section name is required.</strong></p>
				</div>
			</div>
		</div>
	</div>
<?php else: ?>
	<p>Invalid Access</p>
<?php endif; ?>