<?php 
session_start();
include('functions.php');
?>
<div class="container">
<?php
if(isset($_POST['valid'])):
	if($_SESSION['level'] == 1){
?>
			<div class="row" id="resultAreaDisplay">
				<?php 
				$loadTrackingLog = System::loadTrackingLog($_SESSION['area_privilege']); 
				if(!empty($loadTrackingLog)):
				?>
				<div class="table-designed-header"><h3><?php if($_SESSION['area_privilege'] == "entrance"){ ?>Entrance Gate Tracking<?php } else if($_SESSION['area_privilege'] == "avr"){ ?>AVR Tracking<?php } else { ?>Clinic Tracking<?php } ?> Log</h3></div>
				<div class="table-designed">
					<table class="table table-bordered">
						<thead>
							<tr>
								<th>#</th>
								<th>Student Name</th>
								<th>Date</th>
								<th>Time</th>
								<th>Remarks</th>
								<th>Place</th>
							</tr>
						</thead>
						<tbody>
							<?php foreach($loadTrackingLog as $key => $log): ?>
							<tr>
								<td><?php echo $key + 1; ?></td>
								<td><?php echo $log['firstname']; ?> <?php echo $log['lastname']; ?></td>
								<td><?php echo $log['logdate']; ?></td>
								<td><?php echo date("h:i A",strtotime($log['logtime'])); ?></td>
								<td><?php echo $log['remarks']; ?></td>
								<td><?php echo ucfirst($log['place']); ?><?php echo ($log['place'] == "classroom") ? ": Subject - ".$log['subject_name'] : ""; ?></td>
							</tr>
							<?php endforeach; ?>
						</tbody>
					</table>
				</div>
				<?php else: ?>
				<p class="alert alert-info">No Records Found!</p>
				<?php endif; ?>				
				<div class="clearfix"></div>
				<input type="hidden" id="selectOfficePlaces" name="officePlaces" value="<?php echo $_SESSION['area_privilege']; ?>" />
				<div id="formAttendance" class="form-group col-md-offset-4 col-md-3"><input type="text" class="form-control" id="barcode" value="" name="barcodeid" placeholder="" typetrack="tracking"></div></div>
				<div id="userDisplay" class="row">
			</div>
	<?php } else { ?>
		<p class="alert alert-danger" style="margin-top:10px;">Invalid Access</p>
	<?php } ?>
<?php else: ?>
	<p class="alert alert-danger" style="margin-top:10px;">Invalid Access</p>
<?php endif; ?>
</div>