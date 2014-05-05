<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Laravel PHP Framework</title>
	@include('include/layout_bak') 
	<script type="text/javascript">
		$(function(){
			//滑动侧边动画
			$(".close_silde_btn").click(sildeClose);
		});
	</script>
</head>
<body>
	<!--left-->
	<div class="main_left shadow_all">
		<span class="left_logo" title="复唧唧--学习编程便捷之道">复</span>
		<ul class="btns_list">
			<li onclick="javascript:;" class="tooltip_right" data-placement="right" data-toggle="tooltip" title="返回根目录">
				<i class="icon-home icon-large icon-white"></i>
			</li>
			@if($user)
			<li onclick="javascript:;" class="tooltip_right" data-placement="right" data-toggle="tooltip" title="个人设置">
				<i class="icon-user icon-large icon-white"></i>
			</li>
			<li onclick="javascript:;" class="tooltip_right" data-placement="right" data-toggle="tooltip" title="课程选择">
				<i class="icon-book icon-large icon-white"></i>
			</li>
			@else
			<li onclick="javascript:;" class="tooltip_right" data-placement="right" data-toggle="tooltip" title="登录注册">
				<i class="icon-user-md icon-large icon-white"></i>
			</li>
			@endif
		</ul>
		<div class="btns_list_btm">
			<a class="tooltip_right" data-placement="right" data-toggle="tooltip" title="帮助">
				<i class="icon-exclamation-sign icon-large icon-white"></i>
			</a>
			@if($user)
			<a class="tooltip_right" data-placement="right" data-toggle="tooltip" title="退出登录">
				<i class="icon-signout icon-large icon-white" style="left:2px;"></i>
			</a>
			@endif
		</div>
	</div>
	<!--left end-->
	<!--left silde-->
	<div class="main_left_silde shadow_all">
		<div class="close_silde_btn"><i class="icon-reply icon-large icon-2x icon-white"></i></div>
	</div>
	<!--left silde end-->
	<!--main content-->
	<div class="front_main_content">
		@if($user)
	  		欢迎登录：{{$user->name}}&nbsp;<a href="{{URL::to('/logout')}}">退出</a>
	  		&nbsp;&nbsp;{{link_to_action('CourseController@showList', $title="进入课程目录", 
				$parameters = array(), $attributes = array("class"=>"btn btn-default"))}}
	  	@else
	  		<div class="container-fluid register_wrap">
		<fieldset>
			<legend>
				<span>会员注册</span>
				<a href="{{URL::to('/')}}" style="float:right;margin:0 5px;">登录</a>
			</legend>
		</fieldset>
		<div class="form-group">
			<div class="input-group">
			  <span class="input-group-btn">
			    <div class="btn btn-primary">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 名</div>
			  </span>
			  <input type="text" name="name" key="name" empty="姓名" class="form-control" placeholder="请输入你的真实名字">
			</div>
		</div>
		<div class="form-group">
			<div class="input-group">
			  <span class="input-group-btn">
			    <div class="btn btn-primary">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 箱</div>
			  </span>
			  <input type="text" key="email" empty="邮箱" class="form-control" placeholder="test@example.com 邮箱将会是你的登录账户">
			</div>
		</div>
		<div class="form-group">
			<div class="input-group">
			  <span class="input-group-btn">
			    <div class="btn btn-primary">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 码</div>
			  </span>
			  <input type="password" key="password" password="first" empty="密码" class="form-control" placeholder="6-18位的数字、字母的组合">
			</div>
		</div>
		<div class="form-group">
			<div class="input-group">
			  <span class="input-group-btn">
			    <div class="btn btn-primary">重复密码</div>
			  </span>
			  <input type="password" key="re-password" password="second" empty="重复密码" class="form-control" placeholder="确认密码输入无误！">
			</div>
		</div>
		<div class="form-group">
			<div class="input-group">
			  <span class="input-group-btn">
			    <div class="btn btn-primary">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 别</div>
			  </span>
			  <div class="radio_block"><div class="radio_wrap"><input value="0" type="radio" key="gender" name="iCheck" id="man" checked></div><label for="man">男</label> 
			  </div>
			  <div class="radio_block"><div class="radio_wrap"><input value="1" type="radio" key="gender" name="iCheck" id="woman" ></div><label for="woman">女</label></div>
			</div>
		</div>
		<div class="form-group">
			<div class="input-group">
			  <span class="input-group-btn">
			    <div class="btn btn-primary">验&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 证</div>
			  </span>
			  <input type="password" key="re-password" empty="验证问题" class="form-control" placeholder="var i=3; i--; i=?">
			</div>
		</div>
		<button id="register_btn" data-loading-text="正在处理..." return_url="{{URL::to('/');}}" url="{{URL::to('/users/register');}}" type="button" class="btn btn-default btn-lg btn-block" >提交信息</button>
	</div>
		@endif
	</div>
	<!--main content end-->
</body>
</html>