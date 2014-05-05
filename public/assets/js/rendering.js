/**
*	数据渲染JS
*	
*	2013-11-08	by zyh
*/

/*-----
----课程view开始
-----*/
//得到任务列表html
function getTaskListHtml(data,style){
	var html=[
		'<ul class="task_list_'+style+'">'
	];
	for(i in data){
		var typeList= data[i].typeList;
		var desc=data[i].desc || "";
		html.push('<li class="task_list_li" task_id="'+data[i].id+'">');
		html.push('<h4><p>'+data[i].name+'</p>');
		html.push('&nbsp;<select id="'+data[i].id+'" style="font-size:12px;" class="task_type_select">');
		for(j in typeList) {
			if(typeList[j].id==data[i].type_id)
				html.push('<option selected="selected" value="'+typeList[j].id+'">'+typeList[j].name+'</option>');
			else
				html.push('<option value="'+typeList[j].id+'">'+typeList[j].name+'</option>');
		}
		html.push('</select> <span style="font-size:12px;">顺序:'+data[i].order+'</span>');
		html.push('<a href="javascript:;" task_id="'+data[i].id+'" class="delete_task_content_btn admin_link_btn"><i class="icon-trash"></i> 删除</a>');
		html.push('<a href="javascript:;" task_id="'+data[i].id+'" class="add_task_content_btn admin_link_btn"><i class="icon-external-link"></i> 添加内容</a>');
		html.push('<a href="javascript:;" task_id="'+data[i].id+'" class="edit_task_btn admin_link_btn"><i class="icon-edit"></i> 编辑</a>');
		html.push('</h4>');
		html.push('<div class="task_edit_wrap">');
		html.push('<input type="text" value="'+data[i].name+'" class="form-control" id="e_taskname'+data[i].id+'" /><a task_id="'+data[i].id+'" data-loading-text="wait..." class="btn btn-link edit_task_save_btn"><i class="icon-save"></i> 保存</a>');
		html.push('<input type="text" value="'+desc+'" class="form-control" id="e_taskdesc'+data[i].id+'" />');
		html.push('<input type="text" value="'+data[i].order+'" class="form-control" id="e_taskorder'+data[i].id+'" />');
		html.push('</div><div class="add_task_content_warp">');
		html.push('</div>');
		html.push('<h5>'+desc+'</h5>');
		html.push(getTaskContentListHtml(data[i].task_list_list,style));
		html.push('</li>');
	}
	html.push('</ul>');
	return html.join("");
}

//得到任务讨论列表html
function getTaskDiscusListHtml(task_id,data,style){
	var html=[
		'<ul class="task_discus_list_'+style+'">'
	];
	for(i in data){
		html.push('<li class="task_discus_list_li" task_discus_id="'+data[i].id+'">');
		html.push(data[i].content);
		html.push(getTaskRepsonseBody(task_id,data[i]));
		html.push('</li>');
	}
	$("#discus_count"+task_id).text(data.length);
	if(data.length>0)
		html.push('<li class="scroll_up"><i onclick="$(this).parent().parent().hide();//closeDiscus(\''+task_id+'\')" class="icon-caret-up icon-large"><i/></li></ul>');
	return html.join("");
}

//得到任务讨论回复html
function getTaskRepsonseBody(task_id,data){
	var html=[];
	html.push('<div class="task_discus_response_body" id="task_discus_response_body'+data.id+'">');
	html.push('<div class="task_discus_content_btns">');
	if(data.child_list.length>0){
		html.push('<a id="show_discus_response'+data.id+'" href="javascript:;" onclick="$(this).parent().siblings(\'.discus_response_wrap\').show();$(this).siblings().show()" class="show_discus_response">显示回复('+data.child_list.length+')</a>');
		html.push('<a href="javascript:;" style="display:none;" onclick="$(this).parent().siblings(\'.discus_response_wrap\').hide();$(this).hide()" class="show_discus_response">收起</a>');
	}
	html.push('&nbsp;<a onclick="$(\'#discus_response_text_wrap'+data.id+'\').show().children(\'textarea\').focus();" href="javascript:;" class="show_discus_response">回复</a>');
	html.push('<a href="javascript:;">'+data.user.name+'</a>&nbsp;'+data.created_at+'</div>');
	html.push('<div class="discus_response_text_wrap" id="discus_response_text_wrap'+data.id+'">');
	html.push('<textarea placeholder="填写回复内容..." class="form-control" rows="3"></textarea>');
	html.push('<a class="btn btn-link task_response_btn" onclick="$(this).parent().hide()"><i class="icon-ban-circle"></i> 取消</a>'),
	html.push('<a task_id="'+task_id+'" parent_id="'+data.id+'" data-loading-text="wait..." class="btn btn-link task_response_btn task_save_response_btn"><i class="icon-ok"></i> 回复</a>');
	html.push('<div class="clear"></div></div>');
	html.push('<ul class="discus_response_wrap shadow_light">');
	//得到评论列表
	for(j in data.child_list){
		var floor=parseInt(j)+1;
		html.push('<li>'+data.child_list[j].content+'');
		html.push('<div class="task_discus_content_btns"><a href="javascript:;">'+data.child_list[j].user.name+'</a>&nbsp;'+data.child_list[j].created_at+'&nbsp;#'+floor+'</div></li>');
	}
	html.push('</ul></div>');
	return html.join("");
}

//得到任务作业讨论列表html
function getTaskAssignmentListHtml(data,style){
	var html=[
		'<ul class="task_assignment_response_'+style+'">'
	];
	for(i in data){
		html.push('<li class="task_assignment_response_li" task_discus_id="'+data[i].id+'">');
		html.push(data[i].content);
		html.push(getAssignmentRepsonseBody(data[i]));
		html.push('</li>');
	}
	html.push('</ul>');
	return html.join("");
}

//得到任务作业回复html
function getAssignmentRepsonseBody(data){
	var html=[];
	html.push('<div class="task_assignment_response_body" id="task_assignment_response_body'+data.id+'">');
	html.push('<div class="task_assignment_response_content_btns">');
	if(data.child_list.length>0){
		html.push('<a id="show_assignment_response'+data.id+'" href="javascript:;" onclick="$(this).parent().siblings(\'.discus_response_wrap\').show();$(this).siblings().show()" class="show_discus_response">显示回复('+data.child_list.length+')</a>');
		html.push('<a href="javascript:;" style="display:none;" onclick="$(this).parent().siblings(\'.discus_response_wrap\').hide();$(this).hide()" class="show_discus_response">收起</a>');
	}
	//html.push('&nbsp;<a onclick="$(\'#discus_response_text_wrap'+data.id+'\').show()" href="javascript:;" class="show_discus_response">回复</a>');
	html.push('<a href="javascript:;">'+data.user.name+'</a>&nbsp;'+data.created_at+'</div>');
	html.push('<div class="discus_response_text_wrap" id="discus_response_text_wrap'+data.id+'">');
	html.push('<textarea placeholder="填写回复内容..." class="form-control" rows="3"></textarea>');
	html.push('<a class="btn btn-link task_response_btn" onclick="$(this).parent().hide()"><i class="icon-ban-circle"></i> 取消</a>');
	html.push('<a assignment_id="'+data.assignment_id+'" parent_id="'+data.id+'" data-loading-text="wait..." class="btn btn-link task_response_btn task_save_response_btn"><i class="icon-ok"></i> 回复</a>');
	html.push('<div class="clear"></div></div>');
	//得到评论列表
	for(j in data.child_list){
		var floor=parseInt(j)+1;
		html.push('<div class="discus_response_wrap">'+data.child_list[j].content+'');
		html.push('<div class="task_discus_content_btns"><a href="javascript:;">'+data.child_list[j].user.name+'</a>&nbsp;'+data.child_list[j].created_at+'&nbsp;#'+floor+'</div></div>');
	}
	html.push('</div>');
	return html.join("");
}

//得到任务内容列表html
function getTaskContentListHtml(data,style){
	var html=[
		'<ul class="task_content_list_'+style+'">'
	];
	for(i in data){
		html.push('<li class="task_content_list_li" task_content_id="'+data[i].id+'">');
		html.push(data[i].desc);
		html.push('</li>');
	}
	html.push('</ul>');
	return html.join("");
}

//开启加载按钮
function beginRefresh(frame){
	frame.html('<br/>&nbsp;&nbsp;<i class="icon-spinner icon-spin"></i> 正在加载...');
}

function beginSildeRefresh(){
	$('.slide_fresh').html('<br/>&nbsp;&nbsp;<i class="icon-spinner icon-spin icon-white"></i> 正在加载...');
}

//得到创建课程view
function getCreateCourseHtml(id,c_name,s_name,summary,desc,deadline,question){
	id=id||"",c_name=c_name||"",s_name=s_name||"";
	summary=summary||"",desc=desc||"",deadline=deadline||0,question=question||"";
	var create_type=(id=="")?"创建":"修改";
	var html=[
		'<div class="container-fluid create_wrap">',
			'<fieldset>',
				'<legend>',
					'<span>课程'+create_type+'</span>',
				'</legend>',
			'</fieldset>',
			'<div class="form-group">',
				'<div class="input-group">',
				  '<span class="input-group-addon">',
				  	'<i class="icon-file-alt icon-large"></i>',
				  '</span>',
				 '<input type="text" id="c_name" value="'+c_name+'" empty="课程名称" class="form-control" placeholder="课程标题">',
				'</div>',
			'</div>',
			'<div class="form-group">',
				'<div class="input-group">',
				  '<span class="input-group-addon">',
				  	'<i class="icon-file icon-large"></i>',
				  '</span>',
				  '<input type="text" id="s_name" value="'+s_name+'" empty="课程子标题" class="form-control" placeholder="课程子标题">',
				'</div>',
			'</div>',
			'<div class="form-group">',
				'<div class="input-group">',
				  '<span class="input-group-addon">',
				  	'<i class="icon-align-left icon-large"></i>',
				  '</span>',
				  '<input type="text" id="summary" value="'+summary+'" empty="课程概要" class="form-control" placeholder="课程概要">',
				'</div>',
			'</div>',
			'<div class="form-group">',
				  '<div class="btn btn-link">课程描述</div>',
				  '<textarea id="editor">'+desc+'</textarea>',
			'</div>',
			'<div class="form-group">',
				  '<div class="btn btn-link">学习期限(以天为单位 0代表不限制)</div>',
				  '<input type="text" id="deadline" value="'+deadline+'" class="form-control" placeholder="学习期限" />',
			'</div>',
			'<div class="form-group">',
				  '<div class="btn btn-link">课程申请问题</div>',
				  '<input type="text" id="question" value="'+question+'" class="form-control" placeholder="课程申请问题" />',
			'</div>',
			'<button id="create_btn" data-loading-text="正在处理..." url="'+contextPath+'/course/savecourse" type="button" class="btn btn-default btn-lg btn-block" >'+create_type+'课程</button>',
		'</div>'
	];
	if(id!=""){
		html.push('<input type="hidden" id="c_course_id" value="'+id+'">');
	}
	return html.join("");
}

//得到课程列表view
function getCourseListHtml(data,style){
	var html=[
		'<ul class="course_list_'+style+'">'
	];
	for(i in data){
		html.push('<li class="course_list_li" course_id="'+data[i].id+'">');
		html.push('<h4>'+data[i].name+'--'+data[i].shortname+'</h4>');
		html.push('<p>&nbsp;&nbsp;'+data[i].summary+'</p>');
		html.push('</li>');
	}
	html.push('</ul>');
	return html.join("");
}

//得到课程内容view
function getCourseContentHtml(data,style){
	var html=[
		'<div class="course_content_wrap_'+style+'">',
			'<h2>'+data.name+'</h2><h4>'+data.shortname+'',
			'&nbsp;&nbsp;<a class="btn btn-default btn-xs edit_course_btn" course_id="'+data.id+'"><i class="icon-edit icon-large"></i> 编辑</a>',
			'&nbsp;&nbsp;<a class="btn btn-danger btn-xs delete_course" course_id="'+data.id+'"><i class="icon-trash icon-large"></i> 删除</a>',
			'</h4>',
			'<h5>课程学习期限：'+((data.course_ext.deadline==0)?"无限制":data.course_ext.deadline+"天"),
			'<br><br>申请问题：'+data.course_ext.question+'</h5><hr>',
			'<p>&nbsp;&nbsp;&nbsp;'+data.desc+'</p>',
			'<hr><h2>单元列表</h2>',
			'<a href="javascript:;" style="" class="btn btn-default btn-sm" id="create_units_show" >',
				'创建新单元',
			'</a><hr>',
			'<div class="units_wrap_'+style+'">',
			getUnitsList(data.units_list,style),
			'</div>',
		'</div>',
	];
	return html.join("");
}

//得到单元列表
function getUnitsList(data,style){
	var html=['<ul class="units_list_'+style+'">'];
	for(i in data){
		html.push('<li class="units_list_li" units_id="'+data[i].id+'">');
		html.push('<h4>'+data[i].name+' <span style="font-size:12px;">顺序:'+data[i].order+'</span>');
		html.push('<a href="javascript:;" units_id="'+data[i].id+'" class="btn btn-link units_edit_btn admin_link_btn"><i class="icon-edit"></i> 任务编辑</a>');
		html.push('<a href="javascript:;" units_id="'+data[i].id+'"  class="btn btn-link units_delete_btn admin_link_btn"><i class="icon-trash"></i> 删除</a>');
		html.push('<a href="javascript:;" units_id="'+data[i].id+'" order="'+data[i].order+'" name="'+data[i].name+'" class="btn btn-link units_content_edit_btn admin_link_btn"><i class="icon-edit"></i> 编辑</a>');
		html.push('</h4>');
		html.push('<div>&nbsp;&nbsp;'+data[i].desc+'</div>');
		html.push('</li>');
	}
	html.push('</ul>');
	return html.join("");
}

//得到创建单元view
function getCreateUnitsHtml(id,name,desc,course_id,order){
	var type_name=(id=="")?"创建":"修改",order=order||"";
	var html=[
		'<div class="container-fluid create_wrap">',
			'<div class="form-group">',
				'<div class="input-group">',
				  '<span class="input-group-addon">',
				  	'<i class="icon-file-alt icon-large"></i>',
				  '</span>',
				 '<input type="text" id="c_name" value="'+name+'" empty="单元名称" class="form-control" placeholder="单元名称">',
				'</div>',
			'</div>',
			'<div class="form-group">',
				  '<div class="btn btn-link">单元描述</div>',
				  '<textarea id="editor">'+desc+'</textarea>',
			'</div>',
			'<div class="form-group">',
				  '<div class="btn btn-link">单元顺序</div>',
				  '<input type="text" id="c_order" value="'+order+'" class="form-control" placeholder="顺序">',
			'</div>',
			'<button id="create_units_btn" data-loading-text="正在处理..." url="'+contextPath+'/course/saveunits/'+course_id+'" type="button" class="btn btn-default btn-lg btn-block" >'+type_name+'单元</button>',
		'</div>'
	];
	if(id!=""){
		html.push("<input type='hidden' id='units_id' value='"+id+"'>");
	}
	return html.join("");
}

//得到创建任务view
function getCreateTaskHtml(id,course_id,taskList){
	var html=[
		'<div class="container-fluid create_wrap">',
			'<fieldset>',
				'<legend>',
					'<span>任务创建</span> ',
					'<a href="javascript:;" id="return_course" course_id="'+course_id+'">返回</a>',
				'</legend>',
			'</fieldset>',
			'<div class="form-group">',
				'<div class="input-group">',
				  '<span class="input-group-addon">',
				  	'<i class="icon-file-alt icon-large"></i>',
				  '</span>',
				 '<input type="text" id="t_name" empty="任务名称" class="form-control" placeholder="任务标题">',
				'</div>',
			'</div>',
			'<div class="form-group">',
				'<div class="input-group">',
				  '<span class="input-group-addon">',
				  	'<i class="icon-file-alt icon-large"></i>',
				  '</span>',
				 '<input type="text" id="t_desc" class="form-control" placeholder="任务描述">',
				'</div>',
			'</div>',
			'<div class="form-group">',
				'<div class="input-group">',
				  '<span class="input-group-addon">',
				  	'<i class="icon-file-alt icon-large"></i>',
				  '</span>',
				 '<input type="text" id="t_order" class="form-control" placeholder="任务顺序(0,1,2,3...)">',
				'</div>',
			'</div>',
			'<div class="form-group">',
				'<div class="input-group">任务类型：',
				 '<select id="t_type"><option value="1">问答型</option>',
				 '<option value="2">流程型</option>',
				 '<option value="3">程序型</option>',
				 '<option value="4">讨论型</option>',
				 '</select>',
				'</div>',
			'</div>',
			'<button id="create_task_btn" data-loading-text="正在处理..." url="'+contextPath+'/units/saveunittask/'+id+'" type="button" class="btn btn-default btn-lg btn-block" >创建任务</button>',
			getTaskListHtml(taskList,"admin"),
		'</div>'
	]
	return html.join("");
}
/*-----
----课程view结束
-----*/

/*-----
----学生view开始
-----*/
//得到创建学生view
function getCreateUserHtml(role_name){
	var html=[
		'<div class="container-fluid create_wrap">',
			'<fieldset>',
				'<legend>',
					'<span>'+role_name+'创建</span>',
				'</legend>',
			'</fieldset>',
			'<div class="form-group">',
				'<div class="input-group">',
				  '<span class="input-group-addon">',
				  	'<i class="icon-file-alt icon-large"></i>',
				  '</span>',
				 '<input type="text" id="name" key="name" empty="姓名" class="form-control" placeholder="姓名">',
				'</div>',
			'</div>',
			'<div class="form-group">',
				'<div class="input-group">',
				  '<span class="input-group-addon">',
				  	'<i class="icon-file icon-large"></i>',
				  '</span>',
				  '<input type="text" key="email" empty="邮箱" class="form-control" placeholder="邮箱">',
				'</div>',
			'</div>',
			'<div class="form-group">',
				'<div class="input-group">',
				  '<span class="input-group-addon">',
				  	'<i class="icon-align-left icon-large"></i>',
				  '</span>',
				  '<input type="password" key="password" password="first" empty="密码" class="form-control" placeholder="密码：6-18位的数字、字母的组合">',
				'</div>',
			'</div>',
			'<div class="form-group">',
				'<div class="input-group">',
				  '<span class="input-group-addon">',
				  	'<i class="icon-align-left icon-large"></i>',
				  '</span>',
				  '<input type="password" key="re-password" password="second" empty="重复密码" class="form-control" placeholder="确认密码输入无误！">',
				'</div>',
			'</div>',
			'<div class="form-group">',
				'<div class="input-group">',
				  '<span class="input-group-addon">',
				  	'<i class="icon-align-left icon-large"></i>',
				  '</span>',
			  	  '<div class="radio_block"><div class="radio_wrap"><input value="0" type="radio" key="gender" name="iCheck" id="man" checked></div><label for="man">男</label></div>',
		  		  '<div class="radio_block"><div class="radio_wrap"><input value="1" type="radio" key="gender" name="iCheck" id="woman" ></div><label for="woman">女</label></div>',
				'</div>',
			'</div>',
			'<button id="create_user_btn" data-loading-text="正在处理..." url="'+contextPath+'/users/register" type="button" class="btn btn-default btn-lg btn-block" >创建'+role_name+'</button>',
		'</div>'
	];
	return html.join("");
}

//得到用户列表view
function getUserListHtml(data,style){
	var html=['<ul class="users_list_'+style+'">'];
	for(i in data){
		html.push('<li class="users_list_li" role="'+data[i].user_role_id+'" user_id="'+data[i].id+'">');
		html.push('<h4>'+data[i].name+'<a href="javascript:;" user_id="'+data[i].id+'" class="delete_user_btn admin_link_btn"><i class="icon-trash"></i> 删除</a></h4>');
		html.push('</li>');
	}
	html.push('</ul>');
	return html.join("");
}

//得到老师控制view
function getTeacherControllView(data){
	var html=[
		'<div class="container-fluid create_wrap">',
			'<button type="button" class="btn btn-default">',
			    '<i class="icon-reorder icon-large"></i> 课程分配',
			'</button>',
			'<ul class="select_crouse_list">',
	]
	for(i in data){
		html.push('<li class="select_crouse_list_li">');
		if(data[i].is_selected==1)
			html.push('<div class="check_wrap"><input checked="checked" type="checkbox" name="crouse_list" id="'+data[i].id+'" ></div>');
		else
			html.push('<div class="check_wrap"><input type="checkbox" name="crouse_list" id="'+data[i].id+'" ></div>');
		html.push('<label for="'+data[i].id+'">'+data[i].name+'</label> <i id="load'+data[i].id+'" class="icon-spinner icon-spin hide"></i></li>');
	}
	html.push('<div class="clear"></div>');
	html.push('</ul>');
	html.push('</div>');
	return html.join("");
}

//得到学生控制view
function getStudentControllView(data){
	console.log(data);
	var html=[
		'<div class="container-fluid create_wrap">',
			'<button type="button" class="btn btn-default">',
			    '<i class="icon-reorder icon-large"></i> 课程分配',
			'</button>',
			'<ul class="select_crouse_list">',
	]
	for(i in data){
		html.push('<li class="select_crouse_list_li" course_id="'+data[i].id+'">');
		if(data[i].is_selected==1)
			html.push('<div class="check_wrap"><input checked="checked" type="checkbox" name="crouse_list" id="'+data[i].id+'" ></div>');
		else
			html.push('<div class="check_wrap"><input type="checkbox" name="crouse_list" id="'+data[i].id+'" ></div>');
		html.push('<label for="'+data[i].id+'">'+data[i].name+'</label> <i id="load'+data[i].id+'" class="icon-spinner icon-spin hide"></i>');
		if(data[i].is_selected==1){
			html.push('<div class="instructor_select_wrap" id="instructor_select_wrap'+data[i].id+'">');
			if(data[i].instructor_list.length>0){
				html.push('<select id="instructor_select'+data[i].id+'" course_id="'+data[i].id+'" name="ins_select">');
				html.push('<option value="0">选择教师</option>');
				for (var j = 0; j < data[i].instructor_list.length; j++) {
					if(data[i].instructor_id==data[i].instructor_list[j].instructor_id)
						html.push('<option selected="selected" value="'+data[i].instructor_list[j].instructor.id+'">'+data[i].instructor_list[j].instructor.name+'</option>');
					else
						html.push('<option value="'+data[i].instructor_list[j].instructor.id+'">'+data[i].instructor_list[j].instructor.name+'</option>');
				};
				html.push('</select>');
			}else{
				html.push('还没有指导老师！');
			}
			html.push('</div>');
		}
		html.push('</li>');
	}
	html.push('<div class="clear"></div>');
	html.push('</ul>');
	html.push('</div>');
	return html.join("");
}

/**
*  用户前端view开始
*/
//滑动速度
var silde_speed=300;

function sildeOpen(){
	//得到页面宽度
	var page_width=document.body.clientWidth;
	$('.slide_fresh').show();
	$("body").animate({paddingLeft:page_width*0.25+42+"px"},silde_speed);
	$(".main_left_silde").show();
	$(".main_left_silde").animate({width:"25%"},silde_speed);
	beginSildeRefresh();
}

function sildeClose(){
	$('.slide_fresh').fadeOut();
	$("body").animate({paddingLeft:"42px"},silde_speed);
	$(".main_left_silde").animate({width:"0%"},silde_speed,function(){
		$(".main_left_silde").hide();
	});
}

//修改个人资料html
function editPersonInfo(data){
	var html=[
		'',
		'',
		'',
		'',
		'',
		'',
		'',
	];
	return html.join("");
}

//增加选择单元按钮
function addSelectUnitsBtn(course_id){
	$("#units_select_btn").remove();
	var html=[
		'<li id="units_select_btn" onclick="" class="tooltip_right" data-placement="right" data-toggle="tooltip" title="选择单元">',
			'<i class="icon-list icon-large icon-white"></i>',
		'</li>',
	]
	$(".btns_list").append(html.join(""));
	//事件绑定
	$("#units_select_btn").click(function(){
		sildeOpen();
		crouseUnitsShow(course_id,$('.slide_fresh'));
	});
	$(".tooltip_right").tooltip();
}