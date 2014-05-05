<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Laravel PHP Framework</title>
    {{ HTML::script('assets/js/kindeditor-all.js') }}
	@include('include/layout_bak') 
	<script type="text/javascript">
		$(function(){
			//showCreateCourse();
			showCourseListAdmin();
			showEditTask('c73b3af472ed5d36ca4b533d4ac8995a','8c02e26c9ab3e0fefbc97a6ae1bcfcff');
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
		<a class="tooltip_right btns_list_btm" href="<?php echo URL::to('/logout');?>" title="退出">
			<i class="icon-signout icon-large icon-white"></i></a>
	</div>
	<!--left end-->
	<!--main content-->
	<div class="main_content_one">
		<div class="main_content_top">
			&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;">课程管理</a> >> 课程列表
			<a href="javascript:;" class="btn btn-default btn-sm admin_top_btns" id="create_course_show">
				<i class="icon-file-alt icon-large"></i> 创建新课程
			</a>
			<a href="javascript:;" class="btn btn-default btn-sm admin_top_btns" id="course_apply_list">
				<i class="icon-tasks icon-large"></i> 申请课程列表
			</a>
		</div>
		<div class="main_content_body fresh_list">
			<ul class="course_list_admin">
				<li>
					<h4>课程名称--课程子标题</h4>
					<p>&nbsp;&nbsp;课程简述</p>
				</li>
			</ul>
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