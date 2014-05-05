var app = angular.module("fjj",['fjj.services','fjj.directives','ngRoute','ngSanitize']);
//全局锁 可用于一些重复提交的操作
var twice_lock=false;

/*route*/
app.config(['$routeProvider','$sceProvider','$locationProvider',function($routeProvider,$sceProvider,$locationProvider){
	$routeProvider
		.when('/',{
			controller:'indexCtrl',
			template:"<div ng-controller='indexCtrl'></div>"
		})
		.when('/login',{
			controller:'LoginCtrl',
			templateUrl:contextPath+'/template/login.html'
		})
		.when('/register',{
			controller:'RegisterCtrl',
			templateUrl:contextPath+'/template/register.html'
		})
		.when('/personinfo',{
			controller:'PersonInfoCtrl',
			templateUrl:contextPath+'/template/personinfo.html'
		})
		.when('/index',{
			controller:'CourseCtrl',
			templateUrl:contextPath+'/template/index.html'
		})
		.when('/coursecontent/:id',{
			controller:'CourseContentCtrl',
			templateUrl:contextPath+'/template/coursecontent.html'
		})
		.when('/unitscontent/:id/:course_id',{
			controller:'UnitsContentCtrl',
			templateUrl:contextPath+'/template/unitscontent.html'
		})
		.when('/taskcontent/:id/:course_id',{
			controller:'TaskContentCtrl',
			templateUrl:contextPath+'/template/taskcontent.html'
		})
		.when('/taskdiscuslist/:id/:course_id/:task_id',{
			controller:'TaskDiscusListCtrl',
			templateUrl:contextPath+'/template/taskdiscuslist.html'
		})
		.when('/taskdiscusdetail/:id/:course_id/:task_id',{
			controller:'TaskDiscusDetailCtrl',
			templateUrl:contextPath+'/template/taskdiscusdetail.html'
		})
		.when('/assignmentdetail/:id/:task_id/:course_id',{
			controller:'AssignmentDetailCtrl',
			templateUrl:contextPath+'/template/assignmentdetail.html'
		})
		.when('/notifyhistory',{
			controller:'NotifyHistoryCtrl',
			templateUrl:contextPath+'/template/notify_history.html'
		})
		.when('/t/index',{
			controller:'tCourseCtrl',
			templateUrl:contextPath+'/template/t_index.html'
		})
		.when('/t/coursecontent/:id/discus',{
			controller:'tCourseContentCtrlDiscus',
			templateUrl:contextPath+'/template/t_coursecontent_discus.html'
		})
		.when('/t/coursecontent/:id/assignment',{
			controller:'tCourseContentCtrlAssignment',
			templateUrl:contextPath+'/template/t_coursecontent_assignment.html'
		})
		.when('/t/coursecontent/:id/complete',{
			controller:'tCourseContentCtrlComplete',
			templateUrl:contextPath+'/template/t_coursecontent_complete.html'
		})
		.when('/t/coursecontent/:id/student',{
			controller:'tCourseContentCtrlStudent',
			templateUrl:contextPath+'/template/t_coursecontent_student.html'
		})
		.when('/t/discusdetail/:id/:course_id',{
			controller:'tDiscusDetailCtrl',
			templateUrl:contextPath+'/template/t_discusdetail.html'
		})
		.when('/t/assignment/detail/:id/:course_id',{
			controller:'tAssignmentDetailCtrl',
			templateUrl:contextPath+'/template/t_assignmentdetail.html'
		})
		//.otherwise({redirectTo:'/'});
	//$sceProvider.enabled(false);
	//$locationProvider.html5Mode(true);
	//$locationProvider.hashPrefix('!');
}]);

/*controller*/
app.controller('indexCtrl',function($location){
	if(user_role){
		if(user_role=="2"){
			$location.path("/index");
		}else if(user_role=="3"){
			$location.path("/t/index");
		}else{
		}
	}else{
		$location.path("/login");
	}
}).controller('LoginCtrl',function($scope,Users){
	$scope.loginSubmit=function(user,e){
		if(typeof(e)=="undefined"||e.keyCode==13){
			$scope.setDisabled(true,".btn-block");
			$scope.contextPath=contextPath;
			Users.loginSave(user,function(data){
				$scope.setDisabled(false,".btn-block");
				if(data.ret=="0")
					$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
				else
					postError();
			});
		}
	};
}).controller('RegisterCtrl',function($scope,Users,$location){
	$scope.registerInfo=function(){
		var user=$scope.user;
		if(user.name&&user.password&&user.email){
			$scope.setDisabled(true,"#register_btn");
			Users.registerStudent(user).success(function(data){
				if(data.ret==1){
					$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
					$location.path("/login");
				}
				$scope.setDisabled(false,"#register_btn");
			});
		}
	};
}).controller('PersonInfoCtrl',function($scope,Users,$location){
	$scope.contextPath=contextPath;
	$this_scope=angular.element('#avatar_preview').scope();

	//取得当前登录用户
	Users.getLoginUser().success(function(data){
		$scope.user=data;
		$scope.user.user_ext.photo=user_photo;
	});
	$scope.imgUpload=function(url){
		$scope.avatar_preview=contextPath+"/upload/avatar/"+url;
		$scope.user.user_ext.photo=contextPath+"/upload/avatar/"+url;
		$scope.user.upload_photo=true;
	};
	$scope.saveEdit=function(){
		if($scope.user.upload_photo){
			$scope.user.x=angular.element('#x').val();
			$scope.user.y=angular.element('#y').val();
			$scope.user.w=angular.element('#w').val();
			$scope.user.h=angular.element('#h').val();
		}else{
			$scope.user.upload_photo="";
		}
		if(!$scope.user.photo_name)
			$scope.user.photo_name="";
		Users.personInfoEdit($scope.user).success(function(data){
			if(data.ret==1){
				$.globalMessenger().post({message:"修改成功！",hideAfter: 3,hideOnNavigate: true});
				$location.path("/");
				if($scope.user.photo_name)
					angular.element("#head_photo").attr("src",contextPath+'/upload/avatar/'+$scope.user.photo_name+'_thumb.jpg');
			};
		});
	};
}).controller('NotifyHistoryCtrl',function($scope,Users,$location){
	Users.getUserAllNotify().success(function(data){
		if($scope.setFresh)$scope.setFresh(false,"#global_loading");
		$scope.notifyList=data;
		console.log(data);
	});
});

/*学生controller开始*/
app.controller('CourseCtrl',function($scope,Course,Users,$location){
	$scope.loading_img=contextPath+"/assets/img/loading2.gif";
	Course.query("student").success(function(data){
		if($scope.setFresh)$scope.setFresh(false,"#global_loading");
		$scope.courseList=data;
	});
	$scope.enterCrouse=function($index){
		$location.path("/coursecontent/"+$scope.courseList[$index].id);
	};
	$scope.showApply=function($index){
		if($scope.courseList[$index].show_apply)
			$scope.courseList[$index].show_apply=false;
		else
			$scope.courseList[$index].show_apply=true;
	};
	//课程申请
	$scope.courseApply=function($index){
		var course_id=$scope.courseList[$index].id;
		var apply_message=$scope.courseList[$index].answer;
		if($.trim(apply_message)!=""){
			$scope.setDisabled(true,"#applyCourse"+course_id);
			Course.applyCourse(course_id,apply_message).success(function(data){
				if(data.ret==1){
					$scope.courseList[$index].is_apply=true;
					$scope.courseList[$index].show_apply=false;
				}
				$scope.setDisabled(false,"#applyCourse"+course_id);
				$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
			});
		}else{
			$.globalMessenger().post({message:"申请课程答案不能为空！",hideAfter: 3,hideOnNavigate: true});
		}
	};
})
.controller('CourseContentCtrl',function($scope,Course,Users,$routeParams){
	Course.queryById($routeParams.id).success(function(data){
		if($scope.setFresh)$scope.setFresh(false,"#global_loading");
		if(data){
			for (var i = 0; i < data.units_list.length; i++) {
				var unit=data.units_list[i]
				if(data.userCourseAuth.units_level>unit.order||data.userCourseAuth.units_level==unit.order){
					unit.show_enter=true;
				}
			}
			data.abs_diff_days=Math.abs(data.diffDays);
			$scope.course=data;
			$scope.contentToHtml=data.desc;
		}else{
			$scope.course={error:"你还没有该课程的权限，或者申请未通过，请重新申请！"};
			$scope.course.errorshow=true;
		}
	});
})
.controller('UnitsContentCtrl',function($scope,Course,Users,$routeParams,$location){
	$scope.courseId=$routeParams.course_id;
	
	Course.queryUnitsById($routeParams.id,$scope.courseId).success(function(data){
		if($scope.setFresh)$scope.setFresh(false,"#global_loading");
		if(data.task_list&&data.start_course){
			for (var i = 0; i < data.task_list.length; i++) {
				var task=data.task_list[i];
				if(data.userCourseAuth.task_level>task.order||data.userCourseAuth.task_level==task.order)
					task.show_enter=true;
			}
		}
		$scope.units=data;
	});
	//进入任务详细
	$scope.enterTaskContent=function($index){
		var this_task=$scope.units.task_list[$index];
		$location.path("/taskcontent/"+this_task.id+"/"+$scope.courseId);
	};
})
.controller('TaskContentCtrl',function($scope,Course,Users,$routeParams){
	$scope.courseId=$routeParams.course_id;
	$scope.loading_img=contextPath+"/assets/img/loading2.gif";
	
	Course.queryTaskById($routeParams.id).success(function(data){
		if($scope.setFresh)$scope.setFresh(false,"#global_loading");
		$scope.task=data;
		if($scope.setProgress)$scope.setProgress($scope.task.complete_progress);
		$scope.show_content=true;
		if($scope.task.is_assignment==0&&$scope.task.type.id!=4){
			//显示提交作业
			$scope.showSaveAssignment($routeParams.id,true);
		}
		setTimeout(function(){
			$scope.showAssignment("undefined",$routeParams.id);
		},100);
	});
	//学生任务方法
	taskEditFunc($scope,$scope.courseId,Course);

	//显示回复讨论
	$scope.showTaskResponse=function(task_discus_id){
		var this_scope=angular.element('#saveDiscus'+task_discus_id).scope();
		if(this_scope.task_discus.response_show)
			this_scope.task_discus.response_show=false;
		else
			this_scope.task_discus.response_show=true;
	};
	
	//完成任务进度
	$scope.taskComplete=function(id,task_content_id,status,btn){
		var $task_scope=angular.element('#progress'+id).scope();
		var $task_content=$task_scope.task.task_list_list;
		var complete_count=0;
		for (var i = 0; i < $task_content.length; i++) {
			if($task_content[i].is_complete)
				complete_count++;
		}
		$task_scope.setProgress((complete_count/$task_content.length)*100);
		Course.setTaskListComplete(id,task_content_id,status,$scope.courseId)
		.success(function(data){
			$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
			btn.iCheck('enable');
		});
	};
	//设置讨论为已解决
	$scope.setDiscusSolve=function(discus_id,status){
		var $this_scope=angular.element('#saveDiscus'+discus_id).scope();
		$this_scope.task_discus.show_loading=true;
		Course.setTaskDiscusSolve(discus_id,status).success(function(data){
			if(data.ret==1){
				$this_scope.task_discus.is_ok=1;
				$this_scope.task_discus.show_loading=false;
			}
			$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
		});
	};
})
.controller('TaskDiscusListCtrl',function($scope,Course,Users,$routeParams){
	$scope.courseId=$routeParams.course_id;
	$scope.taskId=$routeParams.task_id;
	$scope.loading_img=contextPath+"/assets/img/loading2.gif";
	$scope.showDiscusList=function(){
		if($scope.setFresh)$scope.setFresh(true,'#discus_list_loading');
		Course.queryTaskListDiscus($routeParams.id).success(function(data){
			$scope.task_discus_list=data;
			if($scope.setFresh)$scope.setFresh(false,'#discus_list_loading');
			$scope.discus_count=data.length;
			if(data.length==0)
				$scope.show_error=true;
		});
	}
	$scope.showDiscusList();
	//保存讨论按钮
	$scope.saveDiscus=function(id,discus,parentId,$index){
		discus=$("#editor"+id).val();
		if($.trim(discus)!=""){
			if(parentId!="")
				$scope.setDisabled(true,"#saveDiscus"+parentId);
			$scope.setDisabled(true,"#saveDiscus"+id);
			Course.saveTaskListDiscus(id,discus,parentId,$scope.courseId).success(function(data){
				if(data.ret==1){
					$("#editor"+id).val("");
					$scope.showDiscusList[$index]=false;
					$scope.showDiscusList($index,id);
					$scope.showDiscusEdit($index);
				}
				$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
				$scope.setDisabled(false,"#saveDiscus"+id);
			});
		}else{
			$.globalMessenger().post({message:"内容不能为空！",hideAfter:3,hideOnNavigate:true});
		}
	};
	//保存讨论回复按钮
	$scope.saveDiscusChild=function(id,parentId,$index){
		var discus=$("#childeditor"+parentId).val();
		this_scope=angular.element("#childeditor"+parentId).scope();
		if($.trim(discus)!=""){
			$scope.setDisabled(true,"#saveDiscus"+id);
			Course.saveTaskListDiscus(id,discus,parentId,$scope.courseId).success(function(data){
				if(data.ret==1){
					$("#childeditor"+parentId).val("");
					$scope.showDiscusList();
				}
				$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
				$scope.setDisabled(false,"#saveDiscus"+id);
			});
		}else{
			$.globalMessenger().post({message:"内容不能为空！",hideAfter:3,hideOnNavigate:true});
		}
	};
	//修改讨论按钮
	$scope.editDiscus=function(id){
		var discus=$("#editor"+id).val();
		var this_scope=angular.element("#editor"+id).scope();
		if($.trim(discus)!=""){
			$scope.setDisabled(true,"#editDiscus"+id);
			Course.editTaskListDiscus(id,discus).success(function(data){
				if(data.ret==1){
					if(this_scope.task_discus)
						this_scope.task_discus.show_edit_content=false;
					if(this_scope.child)
						this_scope.child.show_edit_content=false;
					$("#discus_content"+id).html(discus);
				}
				$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
				$scope.setDisabled(false,"#editDiscus"+id);
			});
		}else{
			$.globalMessenger().post({message:"内容不能为空！",hideAfter:3,hideOnNavigate:true});
		}
	};
	//删除讨论按钮
	$scope.deleteDiscus=function(id,is_child){
		var this_scope;
		if(is_child){
			this_scope=angular.element("#task_discus_delete"+id).scope().$parent.$parent;
		}else{
			this_scope=angular.element("#task_discus_delete"+id).scope().$parent;
		}
		if(confirm("确定删除该评论?")){
			Course.deleteTaskListDiscus(id).success(function(data){
				if(data.ret==1){
					$scope.showDiscusList();
				}
				$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
			});
		}
	};
	//显示回复讨论
	$scope.showTaskResponse=function(task_discus_id){
		var this_scope=angular.element('#saveDiscus'+task_discus_id).scope();
		if(this_scope.task_discus.response_show)
			this_scope.task_discus.response_show=false;
		else
			this_scope.task_discus.response_show=true;
	};
	//设置讨论为已解决
	$scope.setDiscusSolve=function(discus_id,status){
		var $this_scope=angular.element('#saveDiscus'+discus_id).scope();
		$this_scope.task_discus.show_loading=true;
		Course.setTaskDiscusSolve(discus_id,status).success(function(data){
			if(data.ret==1){
				$this_scope.task_discus.is_ok=1;
				$this_scope.task_discus.show_loading=false;
			}
			$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
		});
	};
})
.controller('TaskDiscusDetailCtrl',function($scope,Course,Users,$routeParams){
	$scope.courseId=$routeParams.course_id;
	$scope.taskId=$routeParams.task_id;

	Course.queryTaskDiscusById($routeParams.id).success(function(data){
		if($scope.setFresh)$scope.setFresh(false,"#global_loading");
		$scope.discus=data;
	});
	//设置讨论为已解决
	$scope.setDiscusSolve=function(discus_id,status){
		$scope.setDisabled(true,"#setDiscusSolve"+discus_id);
		Course.setTaskDiscusSolve(discus_id,status).success(function(data){
			if(data.ret==1){
				$scope.discus.is_ok=1;
			}
			$scope.setDisabled(false,"#setDiscusSolve"+discus_id);
			$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
		});
	};
	//保存讨论按钮
	$scope.saveDiscus=function(id,discus,parentId){
		discus=$("#editor"+parentId).val();
		if($.trim(discus)!=""){
			$scope.setDisabled(true,"#saveDiscus"+parentId);
			Course.saveTaskListDiscus(id,discus,parentId,$scope.courseId)
			.success(function(data){
				if(data.ret==1){
					$("#editor"+parentId).val("");
					$scope.setFresh(true,"#global_loading");
					Course.queryTaskDiscusById($routeParams.id).success(function(data){
						$scope.setFresh(false,"#global_loading");
						$scope.discus=data;
					});
				}
				$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
				$scope.setDisabled(false,"#saveDiscus"+parentId);
			});
		}else{
			$.globalMessenger().post({message:"内容不能为空！",hideAfter:3,hideOnNavigate:true});
		}
	};
}).controller('AssignmentDetailCtrl',function($scope,Course,Users,$routeParams){
	$scope.courseId=$routeParams.course_id;
	$scope.taskId=$routeParams.task_id;

	Course.queryTaskAssignmentDetail($routeParams.id).success(function(data){
		$scope.contentshow=true;
		if($scope.setFresh)$scope.setFresh(false,"#global_loading");
		$scope.assignment=data;
	});
	
	//作业评论保存
	$scope.saveAssignDiscus=function(){
		var id=$scope.assignment.id;
		var content=$("#editor"+id).val();
		if($.trim(content)!=""){
			$scope.setDisabled(true,"#saveAssignDiscus"+id);
			Course.saveTaskAssignmentResponse(id,content,"",$scope.courseId)
			.success(function(data){
				if(data.ret==1){
					$scope.setFresh(true,"#global_loading");
					Course.queryTaskAssignmentDetail($routeParams.id).success(function(data){
						$scope.setFresh(false,"#global_loading");
						$scope.assignment=data;
					});
					$("#editor"+id).val("");
				}
				$scope.setDisabled(false,"#saveAssignDiscus"+id);
				$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate:true});
			});
		}else{
			$.globalMessenger().post({message:"内容不能为空！",hideAfter: 3,hideOnNavigate:true});
		}
	};
});

function taskEditFunc($scope,courseId,Course){
	//显示讨论
	$scope.showDiscusEdit=function($index){
		if($scope.showDiscusEdit[$index])
			$scope.showDiscusEdit[$index]=false;
		else
			$scope.showDiscusEdit[$index]=true;
	};
	//显示讨论列表
	$scope.showDiscusList=function($index,id){
		if($scope.showDiscusList[$index]){
			$scope.showDiscusList[$index]=false;
		}else{
			var $this_scope=angular.element('#discus_list_loading'+id).scope();
			if($scope.setFresh)$scope.setFresh(true,'#discus_list_loading'+id);
			Course.queryTaskListDiscus(id)
			.success(function(data){
				$this_scope.task_discus_list=data;
				if($scope.setFresh)$scope.setFresh(false,'#discus_list_loading'+id);
				$this_scope.task_content.discus_count=data.length;

			});
			$scope.showDiscusList[$index]=true;
		}
	};
	//显示提交作业
	$scope.showSaveAssignment=function(id,show_in_open){
		if(show_in_open){
			$scope.task.showSaveAssignment=true;
		}else{
			if($scope.task.showSaveAssignment){
				$scope.task.showSaveAssignment=false;
			}else{
				$scope.task.showSaveAssignment=true;
			}
		}
	};
	//显示编辑作业
	$scope.showEditAssignment=function($index,id,content){
		if($scope.showEditAssignment[$index]){
			$scope.showEditAssignment[$index]=false;
		}else{
			$scope.showEditAssignment[$index]=true;
			$scope.showAssignment[$index]=false;
		}
	};
	//显示已提交作业
	$scope.showAssignment=function($index,id){
		if($scope.showAssignment[$index]){
			$scope.showAssignment[$index]=false;
		}else{
			var $this_scope=angular.element('#assignment_loading'+id).scope();
			if($scope.setFresh)$scope.setFresh(true,'#assignment_loading'+id);
			Course.queryTaskAssignment(id)
			.success(function(data){
				$this_scope.task.assignment=data;
				$this_scope.injectHtml(data.content);
				if($scope.setFresh)$scope.setFresh(false,'#assignment_loading'+id);
				//load assignment discus
				Course.queryTaskAssignmentDiscus(data.id)
				.success(function(data2){
					$this_scope.task.assignment.discus_list=data2;
					$this_scope.task.assignment.discus_count=data2.length;
				});
			});
			$scope.showAssignment[$index]=true;
		}
	};
	//显示作业评论
	$scope.showAssignmentResponse=function($index){
		if($scope.showAssignmentResponse[$index]){
			$scope.showAssignmentResponse[$index]=false;
		}else{
			$scope.showAssignmentResponse[$index]=true;
		}
	};
	//保存讨论按钮
	$scope.saveDiscus=function(id,discus,parentId,$index){
		discus=$("#editor"+id).val();
		if($.trim(discus)!=""){
			if(parentId!="")
				$scope.setDisabled(true,"#saveDiscus"+parentId);
			$scope.setDisabled(true,"#saveDiscus"+id);
			Course.saveTaskListDiscus(id,discus,parentId,courseId)
			.success(function(data){
				if(data.ret==1){
					$("#editor"+id).val("");
					$scope.showDiscusList[$index]=false;
					$scope.showDiscusList($index,id);
					$scope.showDiscusEdit($index);
				}
				$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
				$scope.setDisabled(false,"#saveDiscus"+id);
			});
		}else{
			$.globalMessenger().post({message:"内容不能为空！",hideAfter:3,hideOnNavigate:true});
		}
	};
	//保存讨论回复按钮
	$scope.saveDiscusChild=function(id,parentId,$index){
		var discus=$("#childeditor"+parentId).val();
		this_scope=angular.element("#childeditor"+parentId).scope();
		if($.trim(discus)!=""){
			$scope.setDisabled(true,"#saveDiscus"+id);
			Course.saveTaskListDiscus(id,discus,parentId,courseId)
			.success(function(data){
				if(data.ret==1){
					$("#childeditor"+parentId).val("");
					$scope.showDiscusList[this_scope.$parent.$index]=false;
					$scope.showDiscusList(this_scope.$parent.$index,id);
				}
				$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
				$scope.setDisabled(false,"#saveDiscus"+id);
			});
		}else{
			$.globalMessenger().post({message:"内容不能为空！",hideAfter:3,hideOnNavigate:true});
		}
	};
	//修改讨论按钮
	$scope.editDiscus=function(id){
		var discus=$("#editor"+id).val();
		var this_scope=angular.element("#editor"+id).scope();
		if($.trim(discus)!=""){
			$scope.setDisabled(true,"#editDiscus"+id);
			Course.editTaskListDiscus(id,discus)
			.success(function(data){
				if(data.ret==1){
					if(this_scope.task_discus)
						this_scope.task_discus.show_edit_content=false;
					if(this_scope.child)
						this_scope.child.show_edit_content=false;
					$("#discus_content"+id).html(discus);
				}
				$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
				$scope.setDisabled(false,"#editDiscus"+id);
			});
		}else{
			$.globalMessenger().post({message:"内容不能为空！",hideAfter:3,hideOnNavigate:true});
		}
	};
	//删除讨论按钮
	$scope.deleteDiscus=function(id,is_child){
		var this_scope;
		if(is_child){
			this_scope=angular.element("#task_discus_delete"+id).scope().$parent.$parent;
		}else{
			this_scope=angular.element("#task_discus_delete"+id).scope().$parent;
		}
		console.log(this_scope)
		if(confirm("确定删除该评论?")){
			Course.deleteTaskListDiscus(id).success(function(data){
				if(data.ret==1){
					$scope.showDiscusList[this_scope.$index]=false;
					$scope.showDiscusList(this_scope.$index,this_scope.task_content.id);
				}
				$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
			});
		}
	};
	//保存作业按钮提交
	$scope.saveAssigment=function($index,id){
		var content=$("#assignment"+id).val();
		if($.trim(content)!=""){
			$scope.setDisabled(true,"#saveAssigment"+id);
			var $this_scope=angular.element('#saveAssigment'+id).scope();
			Course.saveTaskAssignment(id,content,courseId)
			.success(function(data){
				if(data.ret==1){
					$("#assignment"+id).remove();
					$scope.showSaveAssignment=false;
					$this_scope.task.is_assignment=1;
				}
				$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
			});
		}else{
			$.globalMessenger().post({message:"内容不能为空！",hideAfter:3,hideOnNavigate:true});
		}
	};
	//编辑作业按钮提交
	$scope.editAssigment=function($index,id,content,task_id){
		var content=$("#assignment"+id).val();
		if($.trim(content)!=""){
			$scope.setDisabled(true,"#editAssigment"+id);
			Course.editTaskAssignment(id,content)
			.success(function(data){
				if(data.ret==1){
					$scope.showAssignment($index,task_id);
					$scope.showEditAssignment[$index]=false;
				}
				$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
				$scope.setDisabled(false,"#editAssigment"+id);
			});
		}else{
			$.globalMessenger().post({message:"内容不能为空！",hideAfter:3,hideOnNavigate:true});
		}
	};
	
	//保存作业回复
	$scope.saveAssignmentDiscus=function($index){
		var task_assignment=$scope.task.assignment;
		var discus=$("#assignmentDiscus"+task_assignment.id).val();
		if($.trim(discus)!=""){
			$scope.setDisabled(true,"#saveAssignmentDiscus"+task_assignment.id);
			Course.saveTaskAssignmentResponse(task_assignment.id,discus,"",courseId)
			.success(function(data){
				task_assignment.discus="";
				$scope.showAssignmentResponse[$index]=false;
				$scope.showAssignmentResponse($index);
				$("#assignmentDiscus"+task_assignment.id).val("");
				$scope.setDisabled(false,"#saveAssignmentDiscus"+task_assignment.id);
				$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
				Course.queryTaskAssignmentDiscus(task_assignment.id).success(function(data){
					task_assignment.discus_list=data;
				});
			});
		}else{
			$.globalMessenger().post({message:"内容不能为空！",hideAfter:3,hideOnNavigate:true});
		}
	};

	//修改作业回复
	$scope.editAssignmentDiscus=function(id){
		var discus=$("#assignment"+id).val();
		var this_scope=angular.element("#assignment"+id).scope();
		if($.trim(discus)!=""){
			$scope.setDisabled(true,"#editAssignmentDiscus"+id);
			Course.editTaskAssignmentDiscus(id,discus)
			.success(function(data){
				if(data.ret==1){
					$("#assignment_discus"+id).html(discus);
					this_scope.discus.show_edit_content=false;
				}
				$scope.setDisabled(false,"#editAssignmentDiscus"+id);
				$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
			});
		}else{
			$.globalMessenger().post({message:"内容不能为空！",hideAfter:3,hideOnNavigate:true});
		}
	};

	//删除作业回复按钮
	$scope.assignmentDiscusDelete=function(id,$index){
		var this_scope=angular.element("#deleteAssignment"+id).scope().$parent;
		if(confirm("确定删除该评论?")){
			Course.deleteTaskAssignmentDiscus(id).success(function(data){
				if(data.ret==1){
					$scope.task.assignment.discus_list.splice($index,1);
				}
				$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
			});
		}
	};
}

/*学生controller结束*/

/*老师controller开始*/
app.controller('tCourseCtrl',function($scope,CourseTeacher,Users,$location){
	CourseTeacher.query().success(function(data){
		if($scope.setFresh)$scope.setFresh(false,"#global_loading");
		$scope.courseList=data;
	});
	$scope.enterCrouse=function($index){
		$location.path("/t/coursecontent/"+$scope.courseList[$index].id+"/discus");
	};
}).controller('tCourseContentCtrlDiscus',function($scope,CourseTeacher,Course,Users,$routeParams){
	$scope.courseId=$routeParams.id;
	CourseTeacher.queryDiscusByCourseId($scope.courseId)
	.success(function(data){
		$scope.discusList=data;
		if($scope.setFresh)$scope.setFresh(false,"#global_loading");
	});
}).controller('tCourseContentCtrlAssignment',function($scope,CourseTeacher,Course,Users,$routeParams,$location){
	$scope.courseId=$routeParams.id;
	$scope.loading_img=contextPath+"/assets/img/loading2.gif";
	CourseTeacher.queryAssignmentByCourseId($scope.courseId)
	.success(function(data){
		$scope.assignmentList=data;
		if($scope.setFresh)$scope.setFresh(false,"#global_loading");
	});
	$scope.enterAssignmentDetail=function(id){
		$location.path("/t/assignment/detail/"+id+"/"+$scope.courseId);
	};
	$scope.showAssignment=function($index){
		if($scope.assignmentList[$index].assignment_show){
			$scope.assignmentList[$index].assignment_show=false;
		}else{
			$scope.assignmentList[$index].assignment_show=true;
		}
	};
	$scope.showTaskContent=function($index){
		if($scope.assignmentList[$index].taskcontent_show){
			$scope.assignmentList[$index].taskcontent_show=false;
		}else{
			$scope.assignmentList[$index].taskcontent_show=true;
		}
	};
	$scope.saveAssignDiscus=function($index){
		var id=$scope.assignmentList[$index].id;
		var content=$scope.assignmentList[$index].discus_content;
		if($.trim(content)!=""){
			$scope.setDisabled(true,"#saveAssignDiscus"+id);
			Course.saveTaskAssignmentResponse(id,content,"",$scope.courseId)
			.success(function(data){
				if(data.ret==1){
					$scope.setFresh(true,"#global_loading");
					CourseTeacher.queryAssignmentByCourseId($scope.courseId)
					.success(function(data){
						$scope.assignmentList=data;
						$scope.setFresh(false,"#global_loading");
					});
				}
				$scope.setDisabled(false,"#saveAssignDiscus"+id);
				$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate:true});
			});
		}else{
			$.globalMessenger().post({message:"内容不能为空！",hideAfter: 3,hideOnNavigate:true});
		}
	};
	$scope.setAssignmentStatus=function($index,status){
		var assignment=$scope.assignmentList[$index];
		var id=assignment.id;
		assignment.show_loading=true;
		CourseTeacher.setAssignmentStatus(id,status).success(function(data){
			if(data.ret==1){
				assignment.is_complete=1;
				assignment.show_loading=false;
			}
			$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate:true});
		});
	};
}).controller('tDiscusDetailCtrl',function($scope,CourseTeacher,Course,Users,$routeParams){
	var id = $routeParams.id;
	var course_id = $routeParams.course_id;
	CourseTeacher.queryDiscusDetailById(id)
	.success(function(data){
		$scope.discus=data;
		$scope.contentToHtml=data.task_content.desc;
		if($scope.setFresh)$scope.setFresh(false,"#global_loading");
	});
	$scope.saveDiscusResponse=function(){
		var task_content_id=$scope.discus.task_content.id;
		var content=$("#editor"+$scope.discus.id).val();
		if($.trim(content)!=""){
			$scope.setDisabled(true,"#saveDiscusResponse"+id);
			Course.saveTaskListDiscus(task_content_id,content,id,course_id)
			.success(function(data){
				if(data.ret==1){
					$scope.setFresh(true,"#global_loading");
					CourseTeacher.queryDiscusDetailById(id).success(function(data){
						$scope.discus=data;
						$scope.contentToHtml="&nbsp;&nbsp;&nbsp;&nbsp;任务内容 ---- "+data.task_content.desc;
						$scope.setFresh(false,"#global_loading");
					});
					$("#editor"+$scope.discus.id).val("");
				}
				$scope.setDisabled(false,"#saveDiscusResponse"+id);
				$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate:true});
			});
		}else{
			$.globalMessenger().post({message:"内容不能为空！",hideAfter: 3,hideOnNavigate:true});
		}
	};
}).controller('tCourseContentCtrlComplete',function($scope,CourseTeacher,Course,Users,$routeParams){
	$scope.courseId=$routeParams.id;
	$scope.contextPath=contextPath;
	CourseTeacher.queryStudentProcess($scope.courseId).success(function(data){
		if($scope.setFresh)$scope.setFresh(false,"#global_loading");
		$scope.taskList=data;
	});
	$scope.showComplete=function($index){
		if($scope.taskList[$index].show_complete){
			$scope.taskList[$index].show_complete=false;
		}else{
			$scope.taskList[$index].show_complete=true;
		}
	};
}).controller('tCourseContentCtrlStudent',function($scope,CourseTeacher,Course,Users,$routeParams){
	$scope.courseId=$routeParams.id;
	$scope.contextPath=contextPath;
	CourseTeacher.queryStudentList($scope.courseId).success(function(data){
		if($scope.setFresh)$scope.setFresh(false,"#global_loading");
		console.log(data);
		$scope.studentList=data;
	});
}).controller('tAssignmentDetailCtrl',function($scope,CourseTeacher,Course,Users,$routeParams){
	$scope.courseId=$routeParams.course_id;
	$scope.contextPath=contextPath;
	CourseTeacher.queryTaskAssignmentDetail($routeParams.id).success(function(data){
		$scope.contentshow=true;
		if($scope.setFresh)$scope.setFresh(false,"#global_loading");
		$scope.assignment=data;
	});
	//作业评论保存
	$scope.saveAssignDiscus=function(){
		var id=$scope.assignment.id;
		var content=$("#editor"+id).val();
		if($.trim(content)!=""){
			$scope.setDisabled(true,"#saveAssignDiscus"+id);
			Course.saveTaskAssignmentResponse(id,content,"",$scope.courseId)
			.success(function(data){
				if(data.ret==1){
					$scope.setFresh(true,"#global_loading");
					CourseTeacher.queryTaskAssignmentDetail($routeParams.id).success(function(data){
						$scope.setFresh(false,"#global_loading");
						$scope.assignment=data;
					});
					$("#editor"+id).val("");
				}
				$scope.setDisabled(false,"#saveAssignDiscus"+id);
				$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate:true});
			});
		}else{
			$.globalMessenger().post({message:"内容不能为空！",hideAfter: 3,hideOnNavigate:true});
		}
	};
});

/*老师controller结束*/

/*filter*/
app.filter('checkgender', function() {
	return function(user) {
		user = user || "";
		if(user.gender=="1"){
			return '男';
		}else{
			return '女';
		}
	};
});

app.filter('trustAsHtml',['$sce',function($sce) {
	return function(input) {
		return $sce.trustAsHtml(input);
	};
}]);

app.filter('numFilter',function() {
	return function(input) {
		return parseInt(input);
	};
});

function postError(){
	$.globalMessenger().post({message:"error:提交异常!!",hideAfter: 3,hideOnNavigate: true});
}
