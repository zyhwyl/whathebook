<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Laravel PHP Framework</title>
    {{ HTML::script('assets/js/kindeditor-all.js') }}
	@include('include/layout_bak') 
	<script type="text/javascript">
		$(function(){
			showCreateStudent();
			showUserListAdmin(2);
		});
	</script>
</head>
<body>
	<!--left-->
	<div class="main_left shadow_all">
		<span class="left_logo" title="复唧唧--学习编程便捷之道">复</span>
		<ul class="btns_list">
			<li onclick="location='{{URL::to('/m')}}'" class="tooltip_right" data-placement="right" data-toggle="tooltip" title="课程管理">
				<i class="icon-book icon-large icon-white"></i>
			</li>
			<li onclick="location='{{URL::to('/s')}}'" class="tooltip_right" data-placement="right" data-toggle="tooltip" title="学生管理">
				<i class="icon-group icon-large icon-white"></i>
			</li>
			<li onclick="location='{{URL::to('/t')}}'" class="tooltip_right" data-placement="right" data-toggle="tooltip" title="指导老师管理">
				<i class="icon-user-md icon-large icon-white"></i>
			</li>
		</ul>
		<a class="tooltip_right btns_list_btm" data-placement="right" data-toggle="tooltip" title="帮助">
			<i class="icon-exclamation-sign icon-large icon-white"></i>
		</a>
	</div>
	<!--left end-->
	<!--main content-->
	<div class="main_content_one">
		<div class="main_content_top">
			&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;">学生管理</a> >> 学生列表
			<a href="javascript:;" class="btn btn-default btn-sm admin_top_btns" id="create_student_show" >
				<i class="icon-file-alt icon-large"></i> 创建一个学生
			</a>
			
		</div>
		<div class="main_content_body fresh_list">
		</div>
	</div>
	<div class="main_content_two">
		<div class="main_content_top">
			&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;">操作</a> 
		</div>
		<div class="main_content_body fresh_body">
		</div>
	</div>
	<!--main content end-->
</body>
</html>