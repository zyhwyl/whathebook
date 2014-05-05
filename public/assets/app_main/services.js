var services = angular.module("fjj.services",[]);

services.factory('Users',['$http','$location',function($http,$location){
	return{
		getLoginUser:function(){
			return $http.get(contextDeployPath+"/users/getLoginUser");
		},
		loginSave:function(user,error){
			$http.post(contextDeployPath+"/users/login",user)
			.success(function(data){
				if(data.ret==1){
					$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
					$location.path("/");
					location=contextPath+"/";
				}else{
					error(data);
				}
			})
			.error(error);
		},
		personInfoEdit:function(user){
			return $http.post(contextDeployPath+"/users/infoeidt",user);
		},
		registerStudent:function(user){
			return $http.post(contextDeployPath+"/users/register",user);
		},
		getUserAllNotify:function(){
			return $http.get(contextDeployPath+"/users/getuserallnotify");
		}
	};
}]);

services.factory('Course',['$http','$location',function($http,$location){
	return{
		query:function($type){
			return $http.get(contextDeployPath+"/course/list/"+$type);
		},
		queryById:function(id){
			return $http.get(contextDeployPath+"/course/content/"+id);
		},
		queryUnitsById:function(id,course_id){
			return $http.get(contextDeployPath+"/units/content/"+id+"/"+course_id);
		},
		queryTaskById:function(id){
			return $http.get(contextDeployPath+"/task/content/"+id);
		},
		queryTaskDiscusById:function(id){
			return $http.get(contextDeployPath+"/task/discus/detail/"+id);
		},
		queryTaskListDiscus:function(id){
			return $http.get(contextDeployPath+"/units/taskdiscuslist/"+id);
		},
		queryTaskAssignment:function(id){
			return $http.get(contextDeployPath+"/units/taskassignment/"+id);
		},
		queryTaskAssignmentDiscus:function(id){
			return $http.get(contextDeployPath+"/units/taskassignmentdiscus/"+id);
		},
		saveTaskListDiscus:function(id,content,parentId,courseId){
			parentId = parentId || "";
			return $http.post(contextDeployPath+"/units/saveunittaskdiscus/"+id,{content:content,parent_id:parentId,courseId:courseId});
		},
		saveTaskAssignment:function(id,content,courseId){
			return $http.post(contextDeployPath+"/units/taskassignmentsave/"+id,{content:content,courseId:courseId});
		},
		saveTaskAssignmentResponse:function(id,content,parent_id,courseId){
			parent_id=parent_id||"";
			return $http.post(contextDeployPath+"/units/taskassignmentdiscussave/"+id,{content:content,parent_id:parent_id,courseId:courseId});
		},
		editTaskAssignment:function(id,content){
			return $http.post(contextDeployPath+"/units/taskassignmentedit/"+id,{content:content});
		},
		editTaskAssignmentDiscus:function(id,content){
			return $http.post(contextDeployPath+"/units/taskassignmentdiscusedit/"+id,{content:content});
		},
		editTaskListDiscus:function(id,content){
			return $http.post(contextDeployPath+"/units/taskdiscusedit/"+id,{content:content});
		},
		deleteTaskListDiscus:function(id){
			return $http.post(contextDeployPath+"/units/taskdiscusdelete/"+id);
		},
		deleteTaskAssignmentDiscus:function(id){
			return $http.post(contextDeployPath+"/units/taskassignmentdiscusdelete/"+id);
		},
		setTaskListComplete:function(task_id,id,status,courseId){
			return $http.post(contextDeployPath+"/units/task/complete/"+task_id+"/"+id+"/"+status,{courseId:courseId});
		},
		setTaskDiscusSolve:function(discus_id,status){
			return $http.post(contextDeployPath+"/units/task/discus/solve/"+discus_id,{status:status});
		},
		setNotifyStatus:function(id,status){
			return $http.post(contextDeployPath+"/users/notifystatus/"+id,{status:status});
		},
		applyCourse:function(course_id,apply_message){
			return $http.post(contextDeployPath+"/course/apply/"+course_id,{apply_message:apply_message});
		},
		queryTaskAssignmentDetail:function(assignment_id){
			return $http.get(contextDeployPath+"/units/taskassignment_i/detail/"+assignment_id);
		}
	};
}]);

services.factory('CourseTeacher',['$http','$location',function($http,$location){
	return{
		query:function(){
			return $http.get(contextDeployPath+"/users_i/list");
		},
		queryDiscusByCourseId:function(id){
			return $http.get(contextDeployPath+"/course/users_i/discuslist/"+id);
		},
		queryDiscusDetailById:function(id){
			return $http.get(contextDeployPath+"/course/users_i/discus/"+id);
		},
		queryAssignmentByCourseId:function(id){
			return $http.get(contextDeployPath+"/units/taskassignment_i/"+id);
		},
		queryStudentProcess:function(id){
			return $http.get(contextDeployPath+"/task/users_i/process/"+id);
		},
		setAssignmentStatus:function(assignment_id,status){
			return $http.post(contextDeployPath+"/assignment/complete/"+assignment_id,{status:status});
		},
		queryTaskAssignmentDetail:function(assignment_id){
			return $http.get(contextDeployPath+"/units/taskassignment_i/detail/"+assignment_id);
		},
		queryStudentList:function(course_id){
			return $http.get(contextDeployPath+"/course/instructor/studentlist/"+course_id);
		}
	};
}]);