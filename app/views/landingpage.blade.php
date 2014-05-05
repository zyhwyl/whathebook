<!doctype html>
<html lang="en" ng-app="fjj">
<head>
    <meta charset="UTF-8">
    <title>复唧唧--学习编程之道</title>

	<?php
	echo HTML::style('assets/css/bootstrap.min.css');
	echo HTML::style('assets/css/font-awesome.css');
	echo HTML::style('assets/css/landingpage.css');

	echo HTML::script('assets/js/jquery.min.js');
	echo HTML::script('assets/js/bootstrap.min.js');
	echo HTML::script('assets/js/jquery.icheck.min.js');
	echo HTML::script('thirdparty/message/js/messenger.min.js');
	?>
</head>
<body>
	<div class="scroll_screen shadow_all">
		<div class="header">
			<span class="logo shadow_all_white" title="复唧唧--学习编程之道">复</span>
			<span class="logo_font">学习编程便捷之道</span>
			<div class="hearer_btn">
				<button type="button" class="btn btn-default">免费注册</button>
				<button type="button" class="btn btn-success" data-toggle="modal" data-target="#login_modal">登录</button>
			</div>
			<div class="clear"></div>
		</div>
		<div class="content_wrap">
			<div class="code_font">
				...<br>
				void paopao(void) //待排序的数据存放在a[1]..a[n]数组中<br>
				{<br>
					<p>&nbsp;&nbsp;&nbsp;&nbsp;for(int i=1;i<n;i++)  //控制循环（冒泡）的次数，n个数，需要n-1次冒泡</p><br>
					<p>&nbsp;&nbsp;&nbsp;&nbsp;for(int j=1;j<=n-i;j++) //相邻的两两比较</p>
				    <p>&nbsp;&nbsp;&nbsp;&nbsp;if(a[j]<a[j+1]) {int temp=a[j];a[j]=a[j+1];a[j+1]=temp;}</p>
				<p>}</p>
				...
			</div>
		</div>
	</div>
	<div class="modal fade bs-modal-sm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" id="login_modal">
	  <div class="modal-dialog  modal-sm">
	    <div class="modal-content" style="width:430px;position:relative;top:150px;left:60px;">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title">欢迎登录</h4>
	      </div>
	      <div class="modal-body">
	      	<div class="form-group">
				<div class="input-group">
				  <span class="input-group-btn">
				    <div class="btn btn-success">邮&nbsp;&nbsp;&nbsp;箱</div>
				  </span>
				  <input type="text" id="email" ng-model="user.email" class="form-control" placeholder="输入你注册的邮箱" required />
				</div>
			</div>
			<div class="form-group">
				<div class="input-group">
				  <span class="input-group-btn">
				    <div class="btn btn-success">密&nbsp;&nbsp;&nbsp;码</div>
				  </span>
				  <input  id="password" type="password" ng-model="user.password" class="form-control" placeholder="6-18位的数字、字母的组合">
				</div>
			</div>
			<button id="loginbtn" click-disable data-loading-text="正在处理..." type="button" class="btn btn-default btn-lg btn-block">提交登录</button>	
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-link" data-dismiss="modal">关闭</button>
	      </div>
	    </div>
	  </div>
	</div>

</body>
<script type="text/javascript">
$(function(){
	$("#loginbtn").click(function(){
		var user={
			email:$("#email").val(),
			password:$("#password").val()
		};
		$(this).button("loading");
		$.post("{{URL::to('/')}}/users/login",user,function(data){
			if(data.ret==1){
				$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
				location="{{URL::to('/')}}";
			}else{
				$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
			}
			$(this).button("reset");
		});
	});
});
</script>
</html>
