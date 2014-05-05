/**
*	主要的js特效
*	
*	2013-10-30	by zyh
*/
;
$(function(){
	//设置一个全局的token 记录用户登录的信息
	var token = null,user = null;
	//message全局样式
	$._messengerDefaults = {
		extraClasses: 'messenger-fixed messenger-theme-air messenger-on-bottom messenger-on-right'
	}
	
	//tooltip设置
	$(".tooltip_right").tooltip();

	$('input').iCheck({
		checkboxClass: 'icheckbox_minimal',
		radioClass: 'iradio_minimal',
		increaseArea: '20%' // optional
	});

	//注册提交
	$("#register_btn").click(function(){
		registerUser($(this),4);
	});

	//登录提交
	$("#login_btn").click(function(){
		var form=getKeyValueForm(),sub_form={},$this=$(this);
		$this.button('loading');
		$(".center_loading").show();
		if(validateForm(form)){
			for(var obj in form){
				sub_form[obj]=form[obj].value||form[obj];
			}
			var url=$this.attr("url");
		    postJSON(url,sub_form,function (msg) {
	        	if(msg.ret==0){
	        		$this.button('reset');
	        		$.globalMessenger().post({message: msg.message,hideAfter: 3,hideOnNavigate: true, type: 'error'});
	        	}else{
	        		//将返回的token存入cookie中
	        		addCookie("auth_token",msg.userAuth.id);
	        		$.globalMessenger().post({message: msg.message,hideAfter: 3,hideOnNavigate: true});
	        		setTimeout(function(){location.reload(),1000});
	        	}
	        },function (msg) {
	        	$.globalMessenger().post({message: msg.message,hideAfter: 3,hideOnNavigate: true, type: 'error'});
	        });
		}else{
			$(".center_loading").hide();
			$this.button('reset');
		}
	});

	//点击显示创建课程
	$("#create_course_show").click(function(){
		showCreateCourse();
	});
	//点击显示创建学生
	$("#create_student_show").click(function(){
		showCreateStudent();
	});
	//点击显示创建老师
	$("#create_teacher_show").click(function(){
		showCreateTeacher();
	});
	//点击显示申请课程的列表
	$("#course_apply_list").click(function(){
		showApplyList();
	});
	
});

//显示申请课程的列表
function showApplyList(){
	beginRefresh($(".fresh_body"));
	$.getJSON(contextPath+"/course/apply/list",{random:Math.random()},function(data){
		if(data.length>0){
			var html='<br><div class="list-group">';
			for(var i = 0; i < data.length; i++) {
				html+='<a class="list-group-item">'+data[i].student.name+" : 申请了<b>"+data[i].course.name;
				html+='</b>&nbsp;&nbsp;<d style="cursor:pointer;" id="'+data[i].id+'" class="setApplyPass btn btn-default">允许</d>';
				html+='&nbsp;&nbsp;<d style="cursor:pointer;" id="'+data[i].id+'" class="setApplyReject btn btn-default">拒绝</d>';
				html+='<div id="reject'+data[i].id+'" style="position:relative;display:none;"><br><input id="reject_message'+data[i].id+'" placeholder="拒绝理由" type="text" class="form-control">';
				html+='<d style="position:absolute;right:0;top:20px;" id="'+data[i].id+'" class="sendApplyReject btn btn-link">提交</d>';
				html+='</div>';
				html+='<div style="padding:5px 0;">申请留言：'+data[i].apply_message+'</div>';
				html+='</a>';
			}
			html+='</div>';
			$(".fresh_body").html(html).hide().fadeIn();
			//通过事件绑定
			$(".setApplyPass").unbind("click");
			$(".setApplyPass").click(function(){
				var id=$(this).attr("id");
				postJSON(contextPath+"/course/apply/status/"+id,{status:1},function(data){
					if(data.ret==1){
						showApplyList();
					}
					$.globalMessenger().post({message: data.message,hideAfter: 3,hideOnNavigate: true});
				});
			});
			//拒绝显示事件绑定
			$(".setApplyReject").unbind("click");
			$(".setApplyReject").click(function(){
				var id=$(this).attr("id");
				$("#reject"+id).show();
			});
			//拒绝事件绑定
			$(".sendApplyReject").unbind("click");
			$(".sendApplyReject").click(function(){
				$(this).button("loading");
				var id=$(this).attr("id");
				postJSON(contextPath+"/course/apply/reject/"+id,{message:$("#reject_message"+id).val()},function(data){
					if(data.ret==1){
						showApplyList();
					}
					$(this).button("reset");
					$.globalMessenger().post({message: data.message,hideAfter: 3,hideOnNavigate: true});
				});
			});
		}else{
			$(".fresh_body").html("<br/>&nbsp;&nbsp;还没有用户申请课程!");
		}
	});
}

//显示课程列表_后台
function showCourseListAdmin(){
	beginRefresh($(".fresh_list"));
	$.getJSON(contextPath+"/course/list/admin",{random:Math.random()},function(data){
		if(data.length>0){
			$(".fresh_list").html(getCourseListHtml(data,"admin")).hide().fadeIn();
			//绑定课程单击事件
			$(".course_list_li").click(function(){
				beginRefresh($(".fresh_body"));
				showCourseContent($(this).attr("course_id"));
			});
		}else{
			$(".fresh_list").html("<br/>&nbsp;&nbsp;还没创建课程");
		}
	});
}

//显示用户列表
function showUserListAdmin(role){
	beginRefresh($(".fresh_list"));
	$.getJSON(contextPath+"/users/list/"+role,{random:Math.random()},function(data){
		if(data.length>0){
			$(".fresh_list").html(getUserListHtml(data,"admin")).hide().fadeIn();
			//绑定用户删除事件
			bindDeleteUser(role);
			//绑定用户选择课程事件
			bindUserSelectCourse(role);
		}else{
			$(".fresh_list").html("<br/>&nbsp;&nbsp;还没有注册用户！！");
		}
	});
}

//绑定用户选择课程事件
function bindUserSelectCourse(role){
	$(".users_list_li").click(function(){
		var user_id=$(this).attr("user_id");
		beginRefresh($(".fresh_body"));
		if(role==2){	//处理学生事件
			$.getJSON(contextPath+"/course/2/list",{student_id:user_id,random:Math.random()},function(data){
				$(".fresh_body").html(getStudentControllView(data));
				//分配课程事件绑定
				bindAssignCourse(user_id,2);
				bindAssignInstructor(user_id);
			});
		}else if(role==3){	//处理老师事件
			//取得课程列表以及老师加入课程情况
			$.getJSON(contextPath+"/course/3/list",{instructor_id:user_id,random:Math.random()},function(data){
				$(".fresh_body").html(getTeacherControllView(data));
				//分配课程事件绑定
				bindAssignCourse(user_id,3);
			});
		}
	});
}

//分配课程事件绑定
function bindAssignCourse(user_id,role){
	$('input').iCheck({
		checkboxClass: 'icheckbox_minimal',
		radioClass: 'iradio_minimal',
		increaseArea: '20%' // optional
	});

	//选择课程
	$('input').on('ifChecked', function(event){
		var course_id=$(this).attr("id");
		$("#load"+course_id).removeClass("hide");
		$('input').iCheck('disable');
		$.getJSON(contextPath+"/course/"+role+"/select",{course_id:course_id,user_id:user_id},function(data){
			if(data.ret==1){
				$.globalMessenger().post({message: data.message,hideAfter: 3,hideOnNavigate: true});
			}else{
				$.globalMessenger().post({message: data.message,hideAfter: 3,hideOnNavigate: true
				});
			}
			$('input').iCheck('enable');
			$("#load"+course_id).addClass("hide");
			if(role==2){
				//重新刷新一下课程列表，加载选择老师选项
				beginRefresh($(".fresh_body"));
				$.getJSON(contextPath+"/course/2/list",{student_id:user_id,random:Math.random()},function(data){
					$(".fresh_body").html(getStudentControllView(data));
					//分配课程事件绑定
					bindAssignCourse(user_id,2);
					bindAssignInstructor(user_id);
				});
			}
		});
	});
	//取消课程
	$('input').on('ifUnchecked', function(event){
		var course_id=$(this).attr("id");
		$("#load"+course_id).removeClass("hide");
		$('input').iCheck('disable');
		$.getJSON(contextPath+"/course/"+role+"/cancle",{course_id:course_id,user_id:user_id},function(data){
			if(data.ret==1){
				$.globalMessenger().post({message: data.message,hideAfter: 3, hideOnNavigate: true});
			}else{
				$.globalMessenger().post({message: data.message,hideAfter: 3,hideOnNavigate: true});
			}
			$('input').iCheck('enable');
			$("#load"+course_id).addClass("hide");
			$("#instructor_select_wrap"+course_id).hide();
		});
	});
}

//学生分配课程老师事件绑定
function bindAssignInstructor(user_id){
	$(":input[name='ins_select']").change(function(){
		var instructor_id=$(this).val();
		var course_id=$(this).attr("course_id");
		$.getJSON(contextPath+"/course/student/select_ins",
			{course_id:course_id,student_id:user_id,instructor_id:instructor_id},function(data){
			if(data.ret==1){
				$.globalMessenger().post({message:data.message,hideAfter: 3, hideOnNavigate: true});
			}
			$.globalMessenger().post({message: data.message,hideAfter: 3, hideOnNavigate: true});
		});
	});
}

//课程详细内容显示
function showCourseContent(id){
	$.getJSON(contextPath+"/course/content/"+id,{random:Math.random()},function(data){
		$(".fresh_body").html(getCourseContentHtml(data,"admin")).hide().fadeIn();
		bindEditTask(id);
		//绑定创建单元事件
		$("#create_units_show").click(function(){
			showUnitsCreate("","","",id)
		});
		//课程删除绑定
		bindDeleteCourse();
		//课程编辑绑定
		bindCourseEdit(id,data.name,data.shortname,data.summary,data.desc,
			data.course_ext.deadline,data.course_ext.question);
		//单元删除绑定
		bindDeleteUnits(id);
		//单元编辑绑定
		bindUnitsEdit(id);
	});
}

//进入单元学习事件绑定
function bindEnterUnitsStudy(course_id){
	$(".units_enter_btn").click(function(){
		var units_id =$(this).attr("units_id");
		enterStudyShow(course_id,units_id);
	});
}

//教师进入单元学习事件绑定
function bindEnterUnitsInstructor(course_id){
	$(".units_enter_btn").click(function(){
		var units_id =$(this).attr("units_id");
		var student_list_id=$(this).attr("student_list_id");
		enterStudyInstructorShow(course_id,units_id,student_list_id);
	});
}

//显示单元列表
function crouseUnitsShow(course_id,fresh_body){
	//得到单元列表
	$.getJSON(contextPath+"/course/content/"+course_id,{random:Math.random()},function(data){
		$(fresh_body).html(getUnitsListFront(data.units_list,"front",false)).hide().fadeIn();
		bindEnterUnitsStudy(course_id);
	});
}

//显示任务列表
function enterStudyShow(course_id,units_id){
	beginRefresh($(".front_fresh_body"));
	//增加选择单元按钮
	addSelectUnitsBtn(course_id);

	//得到单元任务列表
	$.getJSON(contextPath+"/units/content/"+units_id,{random:Math.random()},function(data){
		//事件绑定放到dom上
		$(".front_fresh_body").html(getTaskListFrontHtml(data,data.task_list,"admin")).hide().fadeIn();
		$('.task_complete_btn').iCheck({checkboxClass:'icheckbox_minimal',radioClass:'iradio_minimal',increaseArea:'20%'});
		bindCompleteTask();
	});
}

//创建修改单元显示
function showUnitsCreate(id,name,desc,course_id,order){
	$(".units_wrap_admin").html(getCreateUnitsHtml(id,name,desc,course_id,order));
	//加载
	var editor = getEditorHtml();
	//保存按钮
	$("#create_units_btn").click(function(){
		saveUnitsEdit(editor,$(this));
		//刷新单元列表
		showUnitsList(course_id);
	});
}

//得到单元列表显示
function showUnitsList(id){
	beginRefresh($(".units_wrap_admin"));
	$.getJSON(contextPath+"/course/content/"+id,{random:Math.random()},function(data){
		$(".units_wrap_admin").html(getUnitsList(data.units_list,"admin"));
		bindEditTask(id);
		bindDeleteUnits(id);
		bindUnitsEdit(id);
	});
}

//绑定完成任务事件
function bindCompleteTask(){
	$(".task_complete_btn").on('ifChecked', function(event){
		var task_id=$(this).attr("task_id");
		postJSON(contextPath+"/units/task/complete/"+task_id+"/1",{},function(msg){
			$.globalMessenger().post({message:msg.message,hideAfter: 3, hideOnNavigate: true});
		});
	}).on('ifUnchecked', function(event){

	});;
}

//绑定任务删除事件
function bindDeleteTask(course_id,units_id){
	$(".delete_task_content_btn").click(function(){
		if(confirm("确定删除该任务\n任务删除后将不能复原！")){
			beginRefresh($(".fresh_body"));
			var task_id=$(this).attr("task_id");
			$.getJSON(contextPath+"/task/delete/"+task_id,{random:Math.random()},function(data){
				if(data.ret==1){
					$.globalMessenger().post({message:data.message,hideAfter: 3, hideOnNavigate: true});
					showEditTask(course_id,units_id);
				}else{
					$.globalMessenger().post({message:data.message,hideAfter: 3, hideOnNavigate: true});
				}
			});
		}
	});
}

//绑定单元删除事件
function bindDeleteUnits(course_id){
	$(".units_delete_btn").click(function(){
		if(confirm("确定删除该单元\n单元删除后将不能复原！")){
			var units_id=$(this).attr("units_id");
			beginRefresh($(".units_wrap_admin"));
			$.getJSON(contextPath+"/units/delete/"+units_id,{random:Math.random()},function(data){
				if(data.ret==1){
					$.globalMessenger().post({message:data.message,hideAfter: 3, hideOnNavigate: true});
					showUnitsList(course_id);
				}else{
					$.globalMessenger().post({message:data.message,hideAfter: 3, hideOnNavigate: true});
				}
			});
		}
	});
}

//绑定课程删除事件
function bindDeleteCourse(){
	$(".delete_course").click(function(){
		if(confirm("确定删除该课程\n课程删除后将不能复原！")){
			beginRefresh($(".fresh_body"));
			var course_id=$(this).attr("course_id");
			$.getJSON(contextPath+"/course/delete/"+course_id,{random:Math.random()},function(data){
				if(data.ret==1){
					$.globalMessenger().post({message:data.message,hideAfter: 3, hideOnNavigate: true});
					showCreateCourse();
					showCourseListAdmin();
				}else{
					$.globalMessenger().post({message:data.message,hideAfter: 3, hideOnNavigate: true});
				}
			});
		}
	});
}

//绑定课程编辑事件
function bindCourseEdit(id,c_name,s_name,summary,desc,deadline){
	$(".edit_course_btn").click(function(){
		showEditCourse(id,c_name,s_name,summary,desc,deadline);
	});
}

//绑定单元编辑事件
function bindUnitsEdit(course_id){
	$(".units_content_edit_btn").click(function(){
		var id=$(this).attr("units_id");
		var name=$(this).attr("name");
		var order=$(this).attr("order");
		var desc=$(this).parent().siblings("div").html();
		showUnitsCreate(id,name,desc,course_id,order);
	});
}

//显示任务编辑列表
function showEditTask(course_id,units_id){
	beginRefresh($(".fresh_body"));
	//得到单元任务列表
	$.getJSON(contextPath+"/units/content/"+units_id+"/"+course_id,{random:Math.random()},function(data){
		$(".fresh_body").html(getCreateTaskHtml(units_id,course_id,data.task_list)).hide().fadeIn();
		bindCreateTaskContent();
		//删除任务绑定
		bindDeleteTask(course_id,units_id);
		//绑定返回按钮
		$("#return_course").click(function(){
			beginRefresh($(".fresh_body"));
			showCourseContent($(this).attr("course_id"));
		});
		//任务名修改绑定
		bindEditTaskName();

		//创建任务事件绑定
		$("#create_task_btn").click(function(){
			var task_name=$.trim($("#t_name").val());
			var task_desc=$.trim($("#t_desc").val());
			var order=$.trim($("#t_order").val());
			var url=$(this).attr("url");
			if(task_name!=""){
				$("#t_name").val("").focus();
				postJSON(url,{name:task_name,type:$("#t_type").val(),desc:task_desc,order:order},function(msg){
					if(msg.ret==1){
						$("#create_task_btn").button('reset');
						$.globalMessenger().post({message: "创建成功！",hideAfter: 3,hideOnNavigate: true});
						//刷新任务列表
						$(".task_list_admin").remove();
						$(".create_wrap").append(getTaskListHtml(msg.unitTaskList,"admin"));
						bindCreateTaskContent();
						//删除任务绑定
						bindDeleteTask(course_id,units_id);
						//任务名修改绑定
						bindEditTaskName();
					}else{
						$.globalMessenger().post({message: "创建失败！",hideAfter: 3,hideOnNavigate: true});
					}
				},function(msg){
					alert(msg);
				})
			}else{
				new Toast({left:"40%",top:"40%",message:"任务名不能为空",type:"alert_warning"}).show();
			}
		});
		//任务类型变换事件
		$(".task_type_select").unbind("change");
		$(".task_type_select").change(function(){
			var id=$(this).attr("id");
			var value=$(this).val();
			postJSON(contextPath+"/task/typechange/"+id,{type:value},function(msg){
				$.globalMessenger().post({message:msg.message,hideAfter: 3,hideOnNavigate: true});
			});
		});
	});
}

//绑定编辑任务名称事件
function bindEditTaskName(){
	$(".edit_task_btn").click(function(){
		$(this).parent().hide();
		$(this).parent().siblings(".task_edit_wrap").show();
	});
	$(".edit_task_save_btn").click(function(){
		var task_id=$(this).attr("task_id");
		var name=$("#e_taskname"+task_id).val();
		var desc=$("#e_taskdesc"+task_id).val();
		var order=$("#e_taskorder"+task_id).val();
		var $this=$(this);
		$this.button("loading");

		$.getJSON(contextPath+"/units/editunittask/"+task_id,{name:name,desc:desc,order:order},function(msg){
			if(msg.ret==1){
				$this.parent().hide();
				$this.parent().siblings("h4").show();
				$this.parent().siblings("h4").children("p").text(name);
				$this.parent().siblings("h5").text(desc);
				$this.button("reset");
			}
			$.globalMessenger().post({message:msg.message,hideAfter: 3,hideOnNavigate: true});
		});
	});
}

//绑定任务讨论发布事件
function bindTaskDiscusSave(){
	$(".task_discus_save_btn").unbind("click");
	$(".task_discus_save_btn").click(function(){
		var $this=$(this);
		var task_id=$this.attr("task_id");
		var content=$this.siblings("textarea").val();
		var parent_id=$this.attr("parent_id")||"";
		var response=$this.attr("response");
		$this.button("loading");
		postJSON(contextPath+"/units/saveunittaskdiscus/"+task_id,{content:content,parent_id:parent_id},function(msg){
			if(msg.ret==1){
				showTaskDiscus(task_id);
			}
			$this.button("reset");
			$.globalMessenger().post({message: msg.message,hideAfter: 3,hideOnNavigate: true});
		},function(msg){
			$.globalMessenger().post({message: "error:程序错误！！",hideAfter: 3,hideOnNavigate: true});
		});
	});
}

//绑定任务讨论回复事件
function bindTaskDidcusResponse(){
	$(".task_save_response_btn").unbind('click');
	$(".task_save_response_btn").click(function(){
		var $this=$(this);
		var task_id=$this.attr("task_id");
		var content=$this.siblings("textarea").val();
		var parent_id=$this.attr("parent_id")||"";
		$this.button("loading");
		postJSON(contextPath+"/units/saveunittaskdiscus/"+task_id,{content:content,parent_id:parent_id},function(msg){
			if(msg.ret==1){
				beginRefresh($("#task_discus_response_body"+parent_id));
				$.getJSON(contextPath+"/units/taskdiscuslistresponse/"+parent_id,{random:Math.random()},function(data){
					$("#task_discus_response_body"+parent_id).html(getTaskRepsonseBody(task_id,data));
					$("#show_discus_response"+parent_id).click();
					bindTaskDidcusResponse();
					//更新讨论数
					$("#discus_count"+task_id).text(data.discus_count);
				});
				$this.siblings("textarea").val("");
			}
			$this.button("reset");
			$.globalMessenger().post({message: msg.message,hideAfter: 3,hideOnNavigate: true});
		},function(msg){
			$.globalMessenger().post({message: "error:程序错误！！",hideAfter: 3,hideOnNavigate: true});
		});
	});
}

//显示任务讨论列表
function showTaskDiscusList(task_id){
	$("#discus_content_wrap"+task_id).show();
	beginRefresh($("#discus_content_wrap"+task_id));
	$.getJSON(contextPath+"/units/taskdiscuslist/"+task_id,{random:Math.random()},function(data){
		if(data.length>0){
			$("#discus_content_wrap"+task_id).html(getTaskDiscusListHtml(task_id,data,"front"));
			bindTaskDidcusResponse(task_id);
		}else{
			$("#discus_content_wrap"+task_id).html("");
		}
	});
	bindTaskDiscusSave(task_id);
	$("#discus_wrap"+task_id).children("textarea").focus();
}

//任务作业提交
function showTaskSubmit(task_id){
	$("#discus_content_wrap"+task_id).hide();
	var html='<textarea id="task_assignment'+task_id+'"></textarea>';
	html+='<a class="btn btn-link task_submit_btn" onclick="$(this).parent().hide()"><i class="icon-ban-circle"></i> 取消</a>';
	html+='<a task_id="'+task_id+'" data-loading-text="wait..." class="btn btn-link task_submit_btn task_submit_save_btn"><i class="icon-ok"></i> 保存</a>';
	$("#discus_wrap"+task_id).html(html).show();
	var editor=getEditorHtmlFront("#task_assignment"+task_id);
	//作业保存
	$(".task_submit_save_btn").unbind("click");
	$(".task_submit_save_btn").click(function(){
		$this=$(this);
		if($.trim(editor.html())==""){
			$.globalMessenger().post({message:"内容不能为空!",hideAfter: 3,hideOnNavigate: true,type:"error"});
		}else{
			$this.button("loading");
			$.post(contextPath+"/units/taskassignmentsave/"+task_id,{content:editor.html()},function(msg){
				if(msg.ret==1){
					$("#task_submit_btn"+task_id).remove();
					$("#task_submited_btn"+task_id).show();
					$("#discus_wrap"+task_id).html("");
					$.globalMessenger().post({message:msg.message,hideAfter:3,hideOnNavigate: true});
				}else{
					$this.button("reset");
					$.globalMessenger().post({message:msg.message,hideAfter:3,hideOnNavigate: true,type:"error"});
				}
			});
		}
	});
}

//任务作业修改显示
function showTaskSubmitEdit(task_id,assigment_id){
	is_show_assignment[task_id]=false;
	$("#discus_content_wrap"+task_id).hide();
	var tmp_content=$("#assigment_content"+assigment_id).html();
	var html='<textarea id="task_assignment'+task_id+'"></textarea>';
	html+='<a class="btn btn-link task_submit_btn" onclick="$(this).parent().hide()"><i class="icon-ban-circle"></i> 取消</a>';
	html+='<a task_id="'+task_id+'" data-loading-text="wait..." class="btn btn-link task_submit_btn task_edit_save_btn"><i class="icon-ok"></i> 保存</a>';
	$("#discus_wrap"+task_id).html(html).show();
	var editor=getEditorHtmlFront("#task_assignment"+task_id);
	editor.html(tmp_content);
	//作业保存
	$(".task_edit_save_btn").unbind("click");
	$(".task_edit_save_btn").click(function(){
		$this=$(this);
		if($.trim(editor.html())==""){
			$.globalMessenger().post({message:"内容不能为空!",hideAfter: 3,hideOnNavigate: true,type:"error"});
		}else{
			$this.button("loading");
			$.post(contextPath+"/units/taskassignmentedit/"+assigment_id,{content:editor.html()},function(msg){
				if(msg.ret==1){
					$.globalMessenger().post({message:msg.message,hideAfter:3,hideOnNavigate: true});
					showTaskSubmited(task_id);
				}else{
					$this.button("reset");
					$.globalMessenger().post({message:msg.message,hideAfter:3,hideOnNavigate: true,type:"error"});
				}
			});
		}
	});
}

//任务作业显示
var is_show_assignment=[];
function showTaskSubmited(task_id){
	if(is_show_assignment[task_id]){
		is_show_assignment[task_id]=false;
		$("#discus_wrap"+task_id).hide();
	}else{
		is_show_assignment[task_id]=true;
		$("#discus_content_wrap"+task_id).hide();
		$("#discus_wrap"+task_id).show();
		beginRefresh($("#discus_wrap"+task_id));
		$.getJSON(contextPath+"/units/taskassignment/"+task_id,{},function(data){
			$("#discus_wrap"+task_id).html("<div id='assigment_content"+data.id+"'>"+data.content+"</div>");
			//加载按钮
			var btn_html=[
				'<div class="discus_assignment_btns">',
				'<a onclick="showTaskSubmited(\''+task_id+'\')" title="收起" href="javascript:;"><i class="icon-caret-up"></i></a>',
				'<a onclick="showAssignmentResponse(\''+task_id+'\',\''+data.id+'\')" title="评论" href="javascript:;" class="discus_assignment_comment"><i class="icon-comment"></i>('+data.discus_count+')</a>',
				'<a onclick="showTaskSubmitEdit(\''+task_id+'\',\''+data.id+'\')" title="编辑" href="javascript:;" class="discus_assignment_edit"><i class="icon-pencil"></i></a>',
				'<div class="clear"></div></div>',
				'<div class="assigment_response" id="assigment_response'+data.id+'"></div>'
			];
			$("#discus_wrap"+task_id).append(btn_html.join(""));
		});
	}
}

//任务作业显示——教师
function showTaskSubmitedInstructor(task_id,student_list_id){
	if(is_show_assignment[task_id]){
		is_show_assignment[task_id]=false;
		$("#discus_wrap"+task_id).hide();
	}else{
		is_show_assignment[task_id]=true;
		$("#discus_content_wrap"+task_id).hide();
		$("#discus_wrap"+task_id).show();
		beginRefresh($("#discus_wrap"+task_id));
		$.getJSON(contextPath+"/units/taskassignment_i/"+task_id,{userIds:student_list_id,random:Math.random()},function(data){
			$("#discus_wrap"+task_id).html(getAssignmentInstructorHtml(data,"instructor"));
			//收起事件
			$(".assignment_scroll_up").unbind("click");
			$(".assignment_scroll_up").click(function(){
				var i=$(this).children("i");
				if(i.attr("class")=="icon-caret-up"){
					i.removeClass("icon-caret-up").addClass("icon-caret-down").attr("title","展开");
					$(this).siblings(".assignment_content_instructor").hide();
				}else{
					i.removeClass("icon-caret-down").addClass("icon-caret-up").attr("title","收起");
					$(this).siblings(".assignment_content_instructor").show();
				}
			});
		});
	}
}

//显示任务作业评论
function showAssignmentResponse(task_id,assigment_id){
	$("#assigment_response"+assigment_id).show();
	var html=[
		'<textarea placeholder="填写讨论内容..." class="form-control" rows="5"></textarea>',
		'<a class="btn btn-link task_discus_cancle_btn" onclick="$(\'#assigment_response'+assigment_id+'\').hide()"><i class="icon-ban-circle"></i> 取消</a>',
		'<a assigment_id="'+assigment_id+'" data-loading-text="wait..." class="btn btn-link task_assignment_save_btn"><i class="icon-ok"></i> 提交</a>',
		'<div class="assignment_response_content" id="assignment_response_content'+assigment_id+'"></div>'
	];
	$("#assigment_response"+assigment_id).html(html.join(""));
	$("#discus_content"+task_id).focus();
	showAssignmentResponseList(assigment_id);
	bindAssignmentResponseSave();
}

//显示任务作业评论列表
function showAssignmentResponseList(assigment_id){
	beginRefresh($("#assignment_response_content"+assigment_id));
	$.getJSON(contextPath+"/units/taskassignmentdiscus/"+assigment_id,{},function(data){
		$("#assignment_response_content"+assigment_id).html(getTaskAssignmentListHtml(data,"front")).show();
	});
}

//显示任务作业评论列表——教师
function showAssignmentResponseListInstructor(assigment_id){
	if(is_show_assignment[assigment_id]){
		is_show_assignment[assigment_id]=false;
		$("#assignment_response_content"+assigment_id).html("");
	}else{
		beginRefresh($("#assignment_response_content"+assigment_id));
		$.getJSON(contextPath+"/units/taskassignmentdiscus/"+assigment_id,{},function(data){
			$("#assignment_response_content"+assigment_id).html(getTaskAssignmentListHtmlInstructor(data,"instructor")).show();
			$("#assignment_discus_count"+assigment_id).text(data.length);
			$('.task_assignment_response_li_instructor').tooltip();
			$(".assignment_save_response_btn").unbind("click");
			$(".assignment_save_response_btn").click(function(){
				var $this=$(this);
				var content=$(this).siblings("textarea").val();
				$this.button("loading");
				postJSON(contextPath+"/units/taskassignmentdiscussave/"+assigment_id,{content:content,parent_id:""},function(msg){
					if(msg.ret==1){
						is_show_assignment[assigment_id]=false;
						showAssignmentResponseListInstructor(assigment_id);
						$this.siblings("textarea").val("");
					}
					$this.button("reset");
					$.globalMessenger().post({message: msg.message,hideAfter: 3,hideOnNavigate: true});
				},function(msg){
					$.globalMessenger().post({message: "error:程序错误！！",hideAfter: 3,hideOnNavigate: true});
				});
			});
		});
		is_show_assignment[assigment_id]=true;
	}
}

//绑定任务作业评论保存
function bindAssignmentResponseSave(){
	$(".task_assignment_save_btn").unbind("click");
	$(".task_assignment_save_btn").click(function(){
		var $this=$(this);
		var assigment_id=$this.attr("assigment_id");
		var content=$this.siblings("textarea").val();
		var parent_id=$this.attr("parent_id")||"";
		var response=$this.attr("response");
		$this.button("loading");
		postJSON(contextPath+"/units/taskassignmentdiscussave/"+assigment_id,{content:content,parent_id:parent_id},function(msg){
			if(msg.ret==1){
				showAssignmentResponseList(assigment_id);
				$this.siblings("textarea").val("");
			}
			$this.button("reset");
			$.globalMessenger().post({message: msg.message,hideAfter: 3,hideOnNavigate: true});
		},function(msg){
			$.globalMessenger().post({message: "error:程序错误！！",hideAfter: 3,hideOnNavigate: true});
		});
	});
}

//得到任务讨论列表以及讨论框
function showTaskDiscus(task_id){
	is_show_assignment[task_id]=false;
	$("#discus_wrap"+task_id).show();
	beginRefresh($("#discus_wrap"+task_id));
	var html=[
		'<textarea placeholder="填写讨论内容..." class="form-control" rows="5"></textarea>',
		'<a class="btn btn-link task_discus_cancle_btn" onclick="$(this).parent().hide();"><i class="icon-ban-circle"></i> 取消</a>',
		'<a task_id="'+task_id+'" data-loading-text="wait..." class="btn btn-link task_discus_save_btn"><i class="icon-ok"></i> 提交</a>'
	];
	$("#discus_wrap"+task_id).html(html.join(""));
	$("#discus_content"+task_id).focus();
	showTaskDiscusList(task_id);
}

//得到任务讨论列表以及讨论框——教师
function showTaskDiscusInstructor(task_id){
	is_show_assignment[task_id]=false;
	$("#discus_wrap"+task_id).show();
	beginRefresh($("#discus_wrap"+task_id));
	var html=[];
	$("#discus_wrap"+task_id).html(html.join(""));
	$("#discus_content"+task_id).focus();
	showTaskDiscusList(task_id);
}

//关闭讨论
function closeDiscus(task_id){
	$("#discus_content_wrap"+task_id).hide();
	$("#discus_wrap"+task_id).hide();
}

//绑定删除用户事件
function bindDeleteUser(role){
	$(".delete_user_btn").unbind('click');
	$(".delete_user_btn").click(function(){
		if(confirm("确认删除该学生!")){
			var user_id=$(this).attr("user_id");
			beginRefresh($(".fresh_list"));
			$.getJSON(contextPath+"/users/delete/"+user_id,{},function(msg){
				if(msg.ret==1){
					$.globalMessenger().post({message:msg.message,hideAfter: 3,hideOnNavigate: true});
					showUserListAdmin(role);
				}else{
					$.globalMessenger().post({message:msg.message,hideAfter: 3,hideOnNavigate: true});
				}
			});
		}
	});
}

//绑定编辑任务事件
function bindEditTask(course_id){
	$(".units_edit_btn").unbind('click');
	$(".units_edit_btn").click(function(){
		showEditTask(course_id,$(this).attr("units_id"));
	});
}

//绑定创建任务内容事件
function bindCreateTaskContent(){
	$(".add_task_content_btn").click(function(){
		var task_id=$(this).attr("task_id");
		$(".add_task_content_warp").html("");
		var html='<textarea id="editor"></textarea>'+
			'<br>'+
			'<a href="javascript:;" class="btn btn-default btn-sm " id="cancle_task_content_btn" >'+
				'<i class="icon-ban-circle icon-large"></i> 取消'+
			'</a>'+
			'<a href="javascript:;" data-loading-text="wait..." class="btn btn-default btn-sm " id="create_task_content_btn" >'+
				'<i class="icon-save icon-large"></i> 保存'+
			'</a>&nbsp;&nbsp;';
		$(this).parent().siblings(".add_task_content_warp").append(html);
		var editor=getEditorHtml();
		//取消事件绑定
		$("#cancle_task_content_btn").click(function(){
			$(this).parent().html("");
		});
		//保存事件绑定
		$("#create_task_content_btn").click(function(){
			var $this_btn=$(this);
			$this_btn.button('loading');
			if($.trim(editor.html())!=""){
				postJSON(contextPath+"/units/saveunittasklist/"+task_id,{desc:editor.html()},function (msg) {
			    	if(msg.ret==1){
			    		$this_btn.button('reset');
			    		$.globalMessenger().post({message: "创建成功！",hideAfter: 3,hideOnNavigate: true});
						editor.html("");
						$this_btn.parent().siblings(".task_content_list_admin").remove();
						$this_btn.parent().parent().append(getTaskContentListHtml(msg.unitTaskListList,"admin"));
			    	}else{}
			    },function (msg) {
			    	$.globalMessenger().post({message: "error:程序错误！！",hideAfter: 3,hideOnNavigate: true});
			    	$this.button('reset');
			    	$(".center_loading").hide();
			    });
			}else{}
		});
	});
}

//创建课程显示
function showCreateCourse(){
	beginRefresh($(".fresh_body"));
	$(".fresh_body").html(getCreateCourseHtml());
	//加载
	var editor = getEditorHtml();
	//保存按钮
	$("#create_btn").click(function(){
		saveEdit(editor,$(this));
	});
}

//编辑课程显示
function showEditCourse(id,c_name,s_name,summary,desc,deadline,question){
	beginRefresh($(".fresh_body"));
	$(".fresh_body").html(getCreateCourseHtml(id,c_name,s_name,summary,desc,deadline,question));
	//加载
	var editor = getEditorHtml();
	//保存按钮
	$("#create_btn").click(function(){
		saveEdit(editor,$(this));
	});
}

//课程保存
function saveEdit(editor,$this){
	var url=$this.attr("url");
	$this.button('loading');
	var id=$("#c_course_id").val()||"";
	var name=$("#c_name").val();
	var shortname=$("#s_name").val();
	var desc=editor.html();
	var summary=$("#summary").val();
	var deadline=$("#deadline").val();
	var question=$("#question").val();

	postJSON(url,
		{id:id,name:name,desc:desc,shortname:shortname,summary:summary,deadline:deadline,question:question},
		function (msg) {
    	if(msg.ret==0){
    		$.globalMessenger().post({message:msg.message,hideAfter: 3,hideOnNavigate: true});
    	}else{
    		$.globalMessenger().post({message:msg.message,hideAfter: 3,hideOnNavigate: true});
    		if(id!=""){
    			beginRefresh($(".fresh_body"));
    			showCourseContent(id);
    		}else{
    			showCreateCourse();
				showCourseListAdmin();
    		}
    	}
    },function (msg) {
    	$.globalMessenger().post({message: "error:程序错误！！",hideAfter: 3,hideOnNavigate: true});
    	$this.button('reset');
    });
}

//单元保存
function saveUnitsEdit(editor,$this){
	var url=$this.attr("url");
	var return_url=$this.attr("return_url");
	$this.button('loading');
	$(".center_loading").show();
	var id=$("#units_id").val()||"";
	var name=$("#c_name").val();
	var order=$("#c_order").val();
	var desc=editor.html();

	postJSON(url,{id:id,name:name,desc:desc,order:order},function (msg) {
    	if(msg.ret==0){
    		$.globalMessenger().post({message:msg.message,hideAfter: 3,hideOnNavigate: true});
    	}else{
    		if(id!=""){

    		}else{
    			
    		}
    		$.globalMessenger().post({message: msg.message,hideAfter: 3,hideOnNavigate: true});
    	}
    },function (msg) {
    	alert(msg);
    });
}

//创建学生显示
function showCreateStudent(){
	beginRefresh($(".fresh_body"));
	$(".fresh_body").html(getCreateUserHtml("学生"));
	$('input').iCheck({
		checkboxClass: 'icheckbox_minimal',
		radioClass: 'iradio_minimal',
		increaseArea: '20%' // optional
	});

	//保存按钮
	$("#create_user_btn").click(function(){
		registerUser($(this),2);
	});
}

//创建老师显示
function showCreateTeacher(){
	beginRefresh($(".fresh_body"));
	$(".fresh_body").html(getCreateUserHtml("老师"));
	$('input').iCheck({
		checkboxClass: 'icheckbox_minimal',
		radioClass: 'iradio_minimal',
		increaseArea: '20%' // optional
	});

	//保存按钮
	$("#create_user_btn").click(function(){
		registerUser($(this),3);
	});
}

//注册一个用户
function registerUser(btn,role){
	var form=getKeyValueForm(),sub_form={};
	btn.button('loading');
	if(validateForm(form)){
		for(var obj in form){
			sub_form[obj]=form[obj].value||form[obj];
		}
		sub_form["role"]=role;
		var url=btn.attr("url");
		postJSON(url,sub_form,function (msg) {
        	if(msg.ret=="0"){
        		$.globalMessenger().post({message: msg.message,hideAfter: 3,hideOnNavigate: true});
        		btn.button('reset');
        	}else{
        		$.globalMessenger().post({message: "创建成功！",hideAfter: 3,hideOnNavigate: true});
				showCreateStudent();
				showUserListAdmin(role);
        	}
        },function (msg) {
        	alert(msg);
        });
	}else{
		btn.button('reset');
	}
}

//得到编辑器 
function getEditorHtml(){
	return KindEditor.create('#editor',{
		shadowMode:true,
		width:603,
		themeType : 'simple',
		height:230,
		resizeType : 1,
		allowPreviewEmoticons : false,
		allowImageUpload : true,
		uploadJson : '${base}/kindeidter/e_upload_image.jhtml',
		resize:false,
		items : [
			'fontname','fontsize','textcolor','|','bold','italic', 'underline','|', 
			'justifyleft', 'justifycenter', 'justifyright', 'justifyfull',
			'link','|','image','code','source']
	});
}

//得到编辑器 
function getEditorHtmlFront(id){
	return KindEditor.create(id,{
		shadowMode:true,
		width:603,
		themeType : 'simple',
		height:230,
		resizeType : 1,
		allowPreviewEmoticons : false,
		allowImageUpload : true,
		uploadJson : '${base}/kindeidter/e_upload_image.jhtml',
		resize:false,
		items : [
			'fontname','fontsize','textcolor','|','bold','italic', 'underline','|', 
			'justifyleft', 'justifycenter', 'justifyright', 'justifyfull',
			'link','|','image','code','source']
	});
}

//ajax提交方法
function postJSON(url,data,success,error){
	$.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: data, 
        success: success,
        error: error
    });
}
//表单验证方法
function validateForm(form){
	var password=null;
	var sub_flag=true;
	//表单项验证
	for(var obj in form){
		var tmp=form[obj];
		if(typeof tmp.validateEmpty!="undefined"&&tmp.validateEmpty!=""){
			if(tmp.value==""){
				new Toast({left:"40%",top:"40%",message:tmp.validateEmpty+"不能为空！",type:"alert_warning"}).show();
				sub_flag=false;
				break;
			}
		}
		//重复密码验证
		if(typeof tmp.validatePassword!="undefined"&&tmp.validatePassword!=""){
			if(tmp.validatePassword=="first"){
				password=tmp.value;
			}else{
				if(password!=tmp.value){
					new Toast({left:"40%",top:"40%",message:"两次输入的密码不一样",type:"alert_warning"}).show();
					sub_flag=false;
					break;
				}
			}
		}
	}
	return sub_flag;
}

//获得表单的key-value
function getKeyValueForm(){
	var result={};
	var key,value;
	$("input").each(function(){
		var $this=$(this);
		key=$(this).attr("key");
		if(typeof key!="undefined"){
			//new Toast({left:"40%",top:"40%",message:"test"}).show();
			if($this.attr("type")=="text"){
				result[key]={
					value:$this.val(),
					validateEmpty:$this.attr("empty")
				}
			}
			if($this.attr("type")=="password"){
				result[key]={
					value:$this.val(),
					validatePassword:$this.attr("password"),
					validateEmpty:$this.attr("empty")
				}
			}
			if($this.attr("type")=="radio"){
				if($this.attr("checked")=="checked"){
					result[key]=$this.val();
				}
			}
		}
	});
	return result;
}

//获得表单的key-value
function getKeyValueForm(){
	var result={};
	var key,value;
	$("input").each(function(){
		var $this=$(this);
		key=$(this).attr("key");
		if(typeof key!="undefined"){
			//new Toast({left:"40%",top:"40%",message:"test"}).show();
			if($this.attr("type")=="text"){
				result[key]={
					value:$this.val(),
					validateEmpty:$this.attr("empty")
				}
			}
			if($this.attr("type")=="password"){
				result[key]={
					value:$this.val(),
					validatePassword:$this.attr("password"),
					validateEmpty:$this.attr("empty")
				}
			}
			if($this.attr("type")=="radio"){
				if($this.attr("checked")=="checked"){
					result[key]=$this.val();
				}
			}
		}
	});
	return result;
}

/**
*	cookie操作函数
*
*/
//获得coolie 的值
function cookie(name){    
	var cookieArray=document.cookie.split("; "); //得到分割的cookie名值对    
	var cookie=new Object();    
	for (var i=0;i<cookieArray.length;i++){    
	  var arr=cookieArray[i].split("=");       //将名和值分开    
	  if(arr[0]==name)return unescape(arr[1]); //如果是指定的cookie，则返回它的值    
	} 
	return ""; 
} 

function delCookie(name)//删除cookie
{
	document.cookie = name+"=;expires="+(new Date(0)).toGMTString();
}

function getCookie(objName){//获取指定名称的cookie的值
	var arrStr = document.cookie.split("; ");
	for(var i = 0;i < arrStr.length;i ++){
	    var temp = arrStr[i].split("=");
	    if(temp[0] == objName) return unescape(temp[1]);
	}
}

function addCookie(objName,objValue,objHours){      //添加cookie
	var str = objName + "=" + escape(objValue);
	if(objHours > 0){                               //为时不设定过期时间，浏览器关闭时cookie自动消失
	    var date = new Date();
	    var ms = objHours*3600*1000;
	    date.setTime(date.getTime() + ms);
	    str += "; expires=" + date.toGMTString()+"; pate=/";
	}
	document.cookie = str;
}

function setCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
	var Days = 30; //此 cookie 将被保存 30 天
	var exp = new Date();    //new Date("December 31, 9998");
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+"; pate=/";
}

function getCookie(name)//取cookies函数        
{
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null) return unescape(arr[2]); return null;
}

function delCookie(name)//删除cookie
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

/**
 * 模仿android里面的Toast效果，主要是用于在不打断程序正常执行的情况下显示提示数据
 * @param config
 * @return
 */
var Toast = function(config){
	this.context = config.context==null?$('body'):config.context;//上下文
	this.message = config.message;//显示内容
	this.time = config.time==null?3000:config.time;//持续时间
	this.left = config.left;//距容器左边的距离
	this.top = config.top;//距容器上方的距离
	this.type=config.type||"alert_normal";//toast所属类型 1 普通 2 错误 3 正确 4 警告
	this.init();
}
var msgEntity;
Toast.prototype = {
	//初始化显示的位置内容等
	init : function(){
		$("#toastMessage").remove();
		//设置消息体
		var msgDIV = new Array();
		msgDIV.push('<div id="toastMessage">');
		msgDIV.push('<span class="toast_img '+this.type+'" /></span><span>'+this.message+'</span>');
		msgDIV.push('</div>');
		msgEntity = $(msgDIV.join('')).appendTo(this.context);
		//设置消息样式
		var left = this.left == null ? "42%": this.left;
		var top = this.top == null ? "45%": this.top;
		msgEntity.css({position:'fixed',top:top,'z-index':'99999999',left:left,'background-color':'#333',color:'white','font-size':'16px',padding:'10px',margin:'10px'});
		msgEntity.hide();
	},
	//显示动画
	show :function(handle){
		msgEntity.fadeIn(this.time/2);
		msgEntity.fadeOut(this.time/2,handle);
	}
}