<!doctype html>
<html lang="en" ng-app>
<head>
    <meta charset="UTF-8">
    <title>复唧唧--学习编程之道</title>
    <link rel="icon" type="image/png" href="<?php URL::to('/')?>/assets/img/logo/favicon-big-x2.ico">
    <?php include 'include/layout.php'; ?>
    <?php echo HTML::style('assets/css/landingpage.css');?>
    <style type="text/css">
    	.form-group{padding:5px 0;}
    </style>
    <script type="text/javascript">
		function login($scope,$http){
			$scope.loginSave=function(){
				angular.element("#login_btn").button("loading");
				$http.post(contextPath+"/users/login",$scope.user)
				.success(function(data){
					$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
					if(data.ret==1){
						location=contextPath+"/";
					}
				});
			}
		}
	</script>
</head>
<body style="background:url('<?php echo URL::to('/');?>/assets/img/back2.jpg');background-size:100%;">
	<!--main content-->
	<div class="front_main_content">
		<div class="front_body">
			<br>
			<!-- <img src="<?php echo URL::to('/');?>/assets/img/logo/logo-font.png"> -->
			<form class="container-fluid login_wrap_single" ng-controller="login">
				<div style="position:absolute;width:100%;height:100%;background:#000;top:0;left:0;border-radius:15px;z-index:0;" 
					class="shadow_all opacity_20">
				</div>
				<div style="z-index:22px;position:relative;">
					<img src="<?php echo URL::to('/');?>/assets/img/logo/logo.png" style="float:left;margin-top:23px;width:36px;">
					<!-- <span class="logo shadow_all_white" title="复唧唧--学习编程之道">复</span> -->
					<span class="logo_font">学习编程便捷之道</span>
					<div class="clear"></div>
					<br><br>
					<div class="form-group">
						<div class="input-group">
						  <span class="input-group-addon"><i class="icon-envelope-alt black" ></i></span>
						  <input type="text" ng-model="user.email" class="form-control" placeholder="输入你注册的邮箱" required />
						</div>
					</div>
					<div class="form-group">
						<div class="input-group">
						  <span class="input-group-addon"><i class="icon-key black"></i></span>
						  <input type="password" ng-model="user.password" class="form-control" placeholder="输入密码:	6-18位的数字、字母的组合">
						</div>
					</div>
					<br>
					<div style="">
						<button id="login_btn" data-loading-text="正在处理..." type="button" ng-click="loginSave()"
							class="btn btn-default btn-block button button-rounded button-flat">提交登录</button>
					</div>
					<br>
					<div>
						<hr>
						<span style="color:#eee;">没有账号？点击 <a href="register" style="color:#00a1cb;font-weight:bold;">免费注册</a></span>
						<span style="float:right;color:#eee;">@复唧唧 2013</span>
						<div class="clear"></div>
					</div>
				</div>
			</form>
		</div>
	</div>
	<!--main content end-->
</body>

</html>
