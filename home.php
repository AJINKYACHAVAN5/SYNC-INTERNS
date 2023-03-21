<?php 
if(isset($_POST['valid'])):
?>
	<div class="container">
		<div class="row">
			<div class="col-offset-4">
				<embed src="images/flashvortex.swf" style="width: 1000px; height: 460px; float: right"></embed>
			</div>
		</div>
	</div>
<?php else: ?>
	<p>Invalid Access</p>
<?php endif; ?>