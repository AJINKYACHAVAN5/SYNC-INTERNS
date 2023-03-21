<?php include('header.php'); ?>
<?php if(isset($_SESSION['uid'])): ?>
	<?php include('main.php'); ?>
<?php else: ?>
	<?php include('login.php'); ?>
<?php endif; ?>
<?php include('footer.php'); ?>