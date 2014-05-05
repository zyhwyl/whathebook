<!doctype html>
<html lang="en" ng-app>
<head>
    <meta charset="UTF-8">
    <title>复唧唧--学习编程之道</title>
    <?php include 'include/layout.php'; ?>
    <?php echo HTML::style('assets/css/landingpage.css');?>
    <style type="text/css">
    	.form-group{padding:0;}
    </style>
    <script type="text/javascript">
		function register($scope,$http){
			$scope.submitRegister=function(){
				$scope.user.gender=0;
				$http.post(contextPath+"/users/register",$scope.user).success(function(data){
					$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
					if(data.ret==1){
						location==contextPath+"/";
					}
				});
			}
		}
	</script>
</head>
<body style="background:url('<?php URL::to('/')?>/assets/img/l_back.jpg')">
	<!--main content-->
	<div class="front_main_content">
		<div class="front_body">
			<form class="container-fluid login_wrap_single" ng-controller="register">
				<div style="position:absolute;width:100%;height:100%;background:#000;top:0;left:0;border-radius:15px;z-index:0;" 
					class="shadow_all opacity_20">
				</div>
				<div style="z-index:22px;position:relative;">
					<span class="logo shadow_all_white" title="复唧唧--学习编程之道">复</span>
					<span class="logo_font">学习编程便捷之道</span>
					<div class="clear"></div>
					<br><br>
					<div class="form-group">
						<div class="input-group">
						  <span class="input-group-addon"><i class="icon-list-alt black" ></i></span>
						  <input type="text" ng-model="user.name" class="form-control" placeholder="请输入你的真实名字">
						</div>
					</div>
					<div class="form-group">
						<div class="input-group">
						  <span class="input-group-addon"><i class="icon-envelope-alt black" ></i></span>
						  <input type="text" ng-model="user.email" class="form-control" placeholder="test@example.com 邮箱将会是你的登录账户">
						</div>
					</div>
					<div class="form-group">
						<div class="input-group">
						  <span class="input-group-addon"><i class="icon-key  black" ></i></span>
						  <input type="password" ng-model="user.password" class="form-control" placeholder="输入密码:6-18位的数字、字母的组合">
						</div>
					</div>
					<div class="form-group">
						<div class="input-group">
						  <span class="input-group-addon"><i class="icon-key  black" ></i></span>
						  <input type="password" ng-model="user.repassword" class="form-control" placeholder="确认密码输入无误！">
						</div>
					</div>
					<input value="0" type="hidden" ng-model="user.gender" id="woman" name="gender">
					<div class="form-group">
						<div class="input-group">
						  <span class="input-group-addon"> <i class="icon-lock black" ></i>&nbsp;</span> 
						  <input type="text" class="form-control" placeholder="var i=3; i--; i=?">
						</div>
					</div>
					<br>
					<div style="">
						<button data-loading-text="正在处理..." type="button" ng-click="submitRegister()"
							class="btn btn-default btn-block button button-rounded button-flat">提交注册</button>
					</div>
					<br>
					<div>
						<hr>
						<span style="color:#eee;">有账号？点击 <a href="login" style="color:#222;font-weight:bold;">登录</a></span>
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
	