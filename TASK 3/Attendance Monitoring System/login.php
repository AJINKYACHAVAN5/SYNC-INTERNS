<div class="container">
	<div class="row">
		<div class="col-md-offset-4 col-md-4 login-header"><br />
			<h1><img src="./images/logo.png" height="100px" width="380px"></h1>
		</div>
	</div>
	<div class="row">
		<div class="col-md-offset-4 col-md-4 login-body">
			<div class="login-inner">
				<h2>Student Attendance Monitoring System</h2>
				<form id="login-form" role="form" action="#">
					<input type="hidden" name="action" value="login" />
					<div class="form-group">
						<div class="input-group">
							<span class="input-group-addon"><i class="fa fa-user"></i></span>
							<input type="text" name="username" class="form-control" id="username" placeholder="Username">
						</div>
					</div>
					<div class="form-group">
						<div class="input-group">
							<span class="input-group-addon"><i class="fa fa-key"></i></span>
							<input type="password" name="password" class="form-control" id="password" placeholder="Password">
						</div>
					</div>
					<div class="clearfix">
						<button type="submit" class="btn btn-default col-md-12">Login</button>
					</div>
					<div id="login-bottom" class="alert hide" style="margin:10px 0 0;"></div>
				</form>
			</div>
		</div>
	</div>
</div>