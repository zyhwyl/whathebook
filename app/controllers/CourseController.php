<?php

class CourseController extends BaseController {

	/**
	*	显示课程列表
	*/
	public function showList($type)
	{
		$user=FjjUtils::getUser();

		if($user){
			if($user->user_role_id==1){
				$courseList = Course::all();
				foreach ($courseList as $course) {
					$course->is_allow=true;
				}
				return $courseList;
			}elseif($user->user_role_id==2){
				//查找出该学生的课程列表
				$userCourse = CourseStudent::where("student_id","=",$user->id)->get();
				$courseList = Course::all();
				foreach ($courseList as $course) {
					foreach ($userCourse as $course_allow) {
						if($course_allow->course_id==$course->id&&$course_allow->status==1)
							$course->is_allow=true;
						if($course_allow->course_id==$course->id&&$course_allow->status==0)
							$course->is_apply=true;
						if($course_allow->course_id==$course->id&&$course_allow->status==2){
							$course->is_reject=true;
							$course->reject_message=$course_allow->message;
						}
					}
					//课程所有的单元数
					$course->units_count=CourseUnits::where("course_id","=",$course->id)->count();
					$course->courseExt;
				}
				return $courseList;
			}elseif($user->user_role_id==3){
				//查找出该教师的课程列表
				$instructorCourse = CourseInstructor::where("instructor_id","=",$user->id)->where("status","=",1)->get();
				return sizeof($instructorCourse);
				if(sizeof($instructorCourse)>0){
					$courseList = Course::all();
					foreach ($courseList as $course) {
						foreach ($instructorCourse as $course_allow) {
							if($course_allow->course_id==$course->id)
								$course->is_allow=true;
						}
					}
					return $courseList;
				}else{
					//没有权限访问
					return array("error" => 1);
				}
			}
		}
	}

	/**
	*	显示申请课程列表
	*/
	public function courseApplyList()
	{
		$user=FjjUtils::getUser();

		if($user&&$user->user_role_id==1){
			$applyList = CourseStudent::where("status","=",0)->get();
			foreach ($applyList as $apply) {
				$apply->course;
				$apply->student;
			}
			return $applyList;
		}
	}


	/**
	*	显示用户加入课程列表
	*/
	public function showCourseUserList($role)
	{
		$user=FjjUtils::getUser();
		$courseList = Course::all();
		$data = Input::all();
		if($role==2){
			//查找出该学生加入的课程
			$courseStuList=CourseStudent::whereRaw('student_id = ?', array(
				$data["student_id"]))->get();
			//比较该用户是否加入课程
			foreach ($courseList as $course) {
				foreach ($courseStuList as $courseStu) {
					if($courseStu->course_id==$course->id){
						$course->is_selected=1;
						$course->instructor_id=$courseStu->instructor_id;
						break;
					}else{
						$course->is_selected=0;
					}
				}
				foreach ($course->instructorList as $instructor) {
					$instructor->instructor;
				}
			}
		}elseif ($role==3) {
			//查找出该教师加入的课程
			$courseInsList=CourseInstructor::whereRaw('instructor_id = ?', array(
				$data["instructor_id"]))->get();
			//比较该用户是否加入课程
			foreach ($courseList as $course) {
				foreach ($courseInsList as $courseIns) {
					if($courseIns->course_id==$course->id){
						$course->is_selected=1;
						break;
					}else{
						$course->is_selected=0;
					}
				}
			}
		}
		return $courseList;
	}

	/**
	*	显示课程内容
	*/
	public function showCourse($id)
	{
		$user=FjjUtils::getUser();
		if($user){
			$course = Course::find($id);
			$course->unitsList;
			$course->courseExt;

			//登录用户为学生时
			if($user->user_role_id==2){
				//查找出该学生的课程学习权限
				$userCourseAuth=UserCourseAuth::whereRaw("course_id = ? and user_id = ?",
					array($id,$user->id))->first()->toArray();
				//查找出该学生申请课程记录
				$courseStudent=CourseStudent::whereRaw("course_id = ? and student_id = ? and status = ?",
					array($id,$user->id,1))->first();
				if($userCourseAuth&&$courseStudent){
					$course->userCourseAuth=$userCourseAuth;

					//学生申请后于下周一开始学习
					$passTime=$courseStudent->updated_at;
					$nextMonday=FjjUtils::next_monday(strtotime($passTime),false);
					$diffDays=FjjUtils::diff_day(date("Y-m-d"),$nextMonday);
					if($diffDays<0||$diffDays==0)
						$course->start_course=true;
					else
						$course->start_course=false;
					$course->diffDays=$diffDays;
					return $course;
				}
			}
			//管理员
			if($user->user_role_id==1){
				//查找出该课程的学生列表
				$studentList=$course->studentList;
				$tmpStudentList=array();
				foreach ($studentList as $student) {
					if($student->instructor_id==$user->id)
						array_push($tmpStudentList,$student->student->toArray());
				}
				$course->studentList=$tmpStudentList;
				return $course;
			}
		}
	}

	/**
	*	显示指导老师课程列表
	*/
	public function courseIntstructorList()
	{
		$user=FjjUtils::getUser();
		$instructor_id = Input::get("user_id");
		if(!$instructor_id){
			$instructor_id=$user->id;
			if($instructor_id){
				$courseInstructorList = CourseInstructor::where("instructor_id","=",$instructor_id)->get();
				$courseList=array();
				foreach ($courseInstructorList as $courseInstructor) {
					array_push($courseList,$courseInstructor->course->toArray());
				}
				return $courseList;
			}
		}
	}

	/**
	*	显示单元内容
	*/
	public function showUnits($id,$course_id)
	{
		$user=FjjUtils::getUser();
		if($user){
			$units = CourseUnits::find($id);
			$taskList=$units->taskList;

			//学生
			if($user->user_role_id==2){
				//查找到前学生正式上课期限
				$courseStudent=CourseStudent::whereRaw("course_id = ? and student_id = ? and status = ?",
					array($course_id,$user->id,1))->first();
				if($courseStudent){
					$passTime=$courseStudent->updated_at;
					$nextMonday=FjjUtils::next_monday(strtotime($passTime),false);
					$diffDays=FjjUtils::diff_day(date("Y-m-d"),$nextMonday);
					if($diffDays<0||$diffDays==0)
						$units->start_course=true;
					else
						$units->start_course=false;
					$units->diffDays=$diffDays;
				}else{
					return array("error" => 1);			//防止恶意路径请求，若没有权限则返回空
				}
				if($units->start_course){
					//查找出当前学生的任务权限
					$userCourseAuth=UserCourseAuth::whereRaw("course_id = ? and user_id = ?",
							array($course_id,$user->id))->first();
					//如果当前学生的单元等级小于当前单元等级 则返回空
					if($userCourseAuth){
						if($userCourseAuth->units_level<$units->order)
							return array("error" => 1);		//防止恶意路径请求，若没有权限则返回空
						else
							$units->userCourseAuth=$userCourseAuth->toArray();
					}else{
						return array("error" => 1);			//防止恶意路径请求，若没有权限则返回空
					}
				}
				foreach ($taskList as $task) {
					$taskListList=$task->taskListList;
					$task->type;
					$complete_count=0;
					foreach ($taskListList as $taskList) {
						$taskList->discus_count=UnitsTaskListDiscus::where("task_id","=",$taskList->id)->count();
						$tmp_complete=UnitsTaskListComplete::whereRaw("task_list_id = ? and pub_user = ?",
							array($taskList->id,$user->id))->first();
						if($tmp_complete&&$tmp_complete->status==1){
							$complete_count++;
							$taskList->is_complete=1;
						}else{
							$taskList->is_complete=0;
						}
					}
					//任务完成进度
					$task->complete_progress=($complete_count/count($taskListList))*100;
					//任务下的作业
					$task->is_assignment=UnitsTaskAssignment::whereRaw("task_id = ? and pub_user = ?",array(
						$task->id,$user->id))->count();
				}
				return $units;
			}
			//管理员
			if($user->user_role_id==1){
				$units = CourseUnits::find($id);
				$taskList=$units->taskList;
				$typeList=TaskType::all();
			
				foreach ($taskList as $task) {
					$task->taskListList;
					$task->type;
					$task->typeList=$typeList->toArray();
				}
				
				return $units;
			}
		}
	}

	/**
	*	显示任务内容
	*/
	public function showTask($id)
	{
		$user=FjjUtils::getUser();
		if($user){
			$task = CourseUnitTask::find($id);
			$task->type;
	
			$taskListList=$task->taskListList;
			$complete_count=0;
			foreach ($taskListList as $taskList) {
				//具体任务的讨论数
				$taskList->discus_count=UnitsTaskListDiscus::whereRaw("task_id = ? and pub_user = ? and parent_id = ?",
					array($taskList->id,$user->id,""))->count();

				$tmp_complete=UnitsTaskListComplete::whereRaw("task_list_id = ? and pub_user = ?",
					array($taskList->id,$user->id))->first();
				if($tmp_complete&&$tmp_complete->status==1){
					$complete_count++;
					$taskList->is_complete=1;
				}else{
					$taskList->is_complete=0;
				}
			}
			//任务完成进度
			$task->complete_progress=($complete_count/count($taskListList))*100;
			//任务下的作业
			$assignment=UnitsTaskAssignment::whereRaw("task_id = ? and pub_user = ?",array(
				$task->id,$user->id))->first();
			if($assignment){
				$task->is_assignment=1;
				if($assignment->is_complete==1)
					$task->is_assignment_complete=1;
			}else{
				$task->is_assignment=0;
			}
			return $task;
		}
	}

	/**
	*	显示任务讨论详细
	*/
	public function showTaskDiscusDetail($id)
	{
		$user=FjjUtils::getUser();
		if($user){
			$discus = UnitsTaskListDiscus::find($id);
			$childList=$discus->childList;
			$discus->taskContent;
			foreach ($childList as $child) {
				$child->user->user_ext;
			}
			$discus->user->user_ext;
			return $discus;
		}
	}

	/**
	*	显示单元内容——教师
	*/
	public function showUnitsInstructor($id)
	{
		$user=FjjUtils::getUser();
		$student_list_id=Input::get("student_list_id");
		if($user){
			$units = CourseUnits::find($id);
			$taskList=$units->taskList;
		
			foreach ($taskList as $task) {
				$task->taskListList;
				$completeList=$task->complete;
				//任务下的评论数
				$task->discus_count=UnitsTaskDiscus::where("task_id","=",$task->id)->count();
				$task->assignment_count=UnitsTaskAssignment::where("task_id","=",$task->id)
					->whereIn("pub_user",explode(",",$student_list_id))
					->count();
			}
			return $units;
		}
	}

	/**
	*	显示单元内容——管理员
	*/
	public function showUnitsAdmin($id)
	{
		$user=FjjUtils::getUser();
		if($user){
			
		}
	}

	/**
	*	显示作业内容
	*/
	public function taskAssignmentShow($id)
	{
		$user=FjjUtils::getUser();
		if($user){
			$assignment = UnitsTaskAssignment::whereRaw("task_id = ? and pub_user = ?",array($id,$user->id))
				->first();
			if($assignment){
				$assignment->discus_count=UnitsTaskAssignmentDiscus::whereRaw("assignment_id = ?",
					array($assignment->id))->count();
				return $assignment;
			}
		}
	}

	/**
	*	显示作业内容——教师
	*/
	public function taskAssignmentInstructorShow($id)
	{
		$user=FjjUtils::getUser();
		if($user){
			//查找出该老师在此课程所拥有的学生
			$t_users=CourseStudent::whereRaw("course_id = ? and instructor_id = ?",
				array($id,$user->id))->get();
			$userIds=array();
			foreach ($t_users as $student) {
				array_push($userIds,$student->student_id);
			}

			$assignmentList = UnitsTaskAssignment::whereRaw("course_id = ?",array($id))
				->whereIn("pub_user",$userIds)
				->get();

			if($assignmentList){
				foreach ($assignmentList as $assignment) {
					$discusList=$assignment->discusList;
					foreach ($discusList as $discus) {
						$discus->user;
						if($discus->pub_user==$user->id)
							$assignment->is_response=true;
					}
					$assignment->user;
					$assignment->task->unit;
					$assignment->task->taskListList;
				}
				return $assignmentList;
			}
		}
	}

	/**
	*	显示作业内容详细——教师
	*/
	public function taskAssignmentInstructorDetailShow($id)
	{
		$user=FjjUtils::getUser();
		if($user){
			$assignment=UnitsTaskAssignment::find($id);
			$discusList=$assignment->discusList;
			foreach ($discusList as $discus) {
				$discus->user->userExt;
			}

			$assignment->user->userExt;
			$assignment->task->unit;
			$assignment->task->taskListList;

			return $assignment;
		}
	}
	
	/**
	*	显示作业评论
	*/
	public function taskAssignmentDiscusShow($id)
	{
		$user=FjjUtils::getUser();
		if($user){
			$assignmentList = UnitsTaskAssignmentDiscus::whereRaw("assignment_id = ?",array($id))->orderBy("created_at","desc")->get();
			foreach ($assignmentList as $assignment) {
				$childList=$assignment->childList;
				foreach ($childList as $child) {
					$child->user->userExt;
				}
				$assignment->user->userExt;
				if($assignment->user->id==$user->id)
					$assignment->is_edit_auth=true;
			}
			return $assignmentList;
		}
	}


	/**
	*	显示任务讨论列表
	*/
	public function showTaskDiscusList($id)
	{
		$user=FjjUtils::getUser();

		if($user){
			$discusList=UnitsTaskListDiscus::whereRaw("task_id = ? and parent_id = ? and pub_user = ?",
				array($id,"",$user->id))
				->orderBy("created_at","desc")
				->get();
			$discus_count=UnitsTaskListDiscus::whereRaw("task_id = ?",array($id))->count();

			foreach ($discusList as $discus) {
				$childList=$discus->childList;
				foreach ($childList as $response) {
					$response->user->user_ext;
					/*if($response->user->user_ext->photo!="")
						$response->user->user_ext->photo=URL::to("../upload/avatar").'/'.$response->user->user_ext->photo."_thumb.jpg";
					else
						$response->user->user_ext->photo=URL::to("../").'/assets/img/user_photo.jpg';*/
					if($response->user->id==$user->id){
						$response->is_edit_auth=true;
					}
				}
				$discus->discus_count=$discus_count;
				$discus->user->user_ext;
				if($discus->user->id==$user->id){
					$discus->is_edit_auth=true;
				}
				$discus->taskContent;
				/*if($discus->user->user_ext->photo!="")
					$discus->user->user_ext->photo=URL::to("/upload/avatar").'/'.$discus->user->user_ext->photo."_thumb.jpg";
				else
					$discus->user->user_ext->photo=URL::to("/").'/assets/img/user_photo.jpg';*/
			}
			return $discusList;
		}
	}

	/**
	*	显示任务讨论回复列表
	*/
	public function showTaskDiscusListResponse($id)
	{
		$user=FjjUtils::getUser();
		$discus=UnitsTaskDiscus::find($id);
		$childList=$discus->childList;
		foreach ($childList as $response) {
			$response->user;
		}
		$discus->user;
		$discus->discus_count=UnitsTaskDiscus::whereRaw("task_id = ?",array($discus->task_id))->count();

		return $discus;
	}

	/**
	*	显示课程讨论列表
	*/
	public function courseDiscusList($id)
	{
		$user=FjjUtils::getUser();
		if($user&&$user->user_role_id==3){
			//如果该用户不是老师且没有该课程权限 则不返回
			$discusList=UnitsTaskListDiscus::whereRaw("course_id = ? and parent_id = ?",
				array($id,""))->orderBy("created_at","desc")->get();
			foreach ($discusList as $discus) {
				$childList=$discus->childList;
				foreach ($childList as $response) {
					$res_user=$response->user->user_ext;
				}
				$discus->user->user_ext;
			}
			return $discusList;
		}
	}

	/**
	*	显示课程任务讨论详细
	*/
	public function courseDiscusDetail($id)
	{
		$user=FjjUtils::getUser();
		if($user){
			//如果该用户不是老师且没有该课程权限 则不返回
			$discus=UnitsTaskListDiscus::find($id);
			$childList=$discus->childList;
			foreach ($childList as $response) {
				$res_user=$response->user->userExt;
				if($res_user->id==$user->id)
					$discus->is_response=true;
			}
			$discus->user->userExt;
			$discus->taskContent->unitTask->unit;
			return $discus;
		}
	}

	/**
	*	老师查看学生完成进度
	*/
	public function taskProcessStudent($id)
	{
		$user=FjjUtils::getUser();
		if($user){
			//如果该用户不是老师且没有该课程权限 则不返回
			$task_list_ids_tmp=UnitsTaskListComplete::select(DB::raw('task_id as id'))
						->where("status","=","1")->where("course_id","=",$id)->groupBy('task_id')->get();
			$task_list_ids=array();
			foreach ($task_list_ids_tmp->toArray() as $id) {
				array_push($task_list_ids, $id["id"]);
			}
			if(count($task_list_ids)>0){
				$task_list=CourseUnitTask::whereIn("id",$task_list_ids)->get();
				//查找每个任务完成的学生
				foreach ($task_list as $task) {
					$task->unit;
					$task_complete_user=UnitsTaskListComplete::select(DB::raw('pub_user as user_id,count(*) as count'))
												->where("task_id","=",$task->id)->where("status","=",1)->groupBy("pub_user")->get();
					foreach ($task_complete_user as $user) {
						$user['user']=User::find($user["user_id"])->toArray();
						$user['user_ext']=UserExt::find($user["user_id"])->toArray();
					}
					$task->completeUser=$task_complete_user->toArray();
					$task->taskListList;
				}
				return $task_list;
			}
		}
	}
	
	/**
	*	选择课程保存
	*/
	public function selectCourseUserList($role)
	{
		$data = Input::all();
		$user=FjjUtils::getUser();

		if($role==2){
			//学生选择保存
			$courseStudent = new CourseStudent;
			$chars = md5(uniqid(mt_rand(), true));
			$instructor_id=0;
			$courseStudent->registerDataInit($chars,$instructor_id,$data["user_id"],$data["course_id"]);
			$courseStudent->save();
			return $arrayName = array('ret' => 1, "message" => "操作成功！");
		}elseif ($role==3) {
			//教师选择保存
			$courseInstructor = new CourseInstructor;
			$chars = md5(uniqid(mt_rand(), true));
			$courseInstructor->registerDataInit($chars,$data["user_id"],$data["course_id"],1);
			$courseInstructor->save();
			return $arrayName = array('ret' => 1, "message" => "操作成功！");
		}

		return array('ret' => 0, "message" => "操作失败！");
	}

	/**
	*	学生课程申请
	*/
	public function courseApply($id)
	{
		$user=FjjUtils::getUser();
		$data=Input::all();

		if($user){
			//学生选择保存
			$courseStudent = new CourseStudent;
			$chars = md5(uniqid(mt_rand(), true));
			$instructor_id=0;
			$courseStudent->registerDataInit($chars,$instructor_id,$user->id,$id,0);
			$courseStudent->apply_message=$data["apply_message"];
			$courseStudent->save();
			return $arrayName = array('ret' => 1, "message" => "申请成功！请等待审核通过");
		}

		return array('ret' => 0, "message" => "操作失败！");
	}

	/**
	*	学生课程申请状态设置
	*/
	public function courseApplyStatus($id)
	{
		$user = FjjUtils::getUser();
		$data = Input::all();
		if($user){
			//学生选择保存
			$courseStudent = CourseStudent::find($id);
			$courseStudent->status=$data["status"];

			//为学生加入课程学习权限
			$chars = md5(uniqid(mt_rand(), true));
			$userCourseAuth = new UserCourseAuth;
			$userCourseAuth->registerDataInit($chars,$courseStudent->student_id,$courseStudent->course_id,0,0);

			//加入学生通知
			$chars2 = md5(uniqid(mt_rand(), true));
			$messageToStudent = new MessageToStudent;
			$messageToStudent->registerDataInit_append($chars2,$user->id,$courseStudent->student_id,
					$courseStudent->course_id,"","",
					"","",'通过了你的课程申请！',0,0,0,1);

			$userCourseAuth->save();
			$courseStudent->save();
			$messageToStudent->save();
			return $arrayName = array('ret' => 1, "message" => "已将状态设置成功！");
		}
		return array('ret' => 0, "message" => "操作失败！");
	}

	/**
	*	学生课程申请拒绝
	*/
	public function courseApplyReject($id)
	{
		$user = FjjUtils::getUser();
		$data = Input::all();
		if($user){
			//学生选择保存
			$courseStudent = CourseStudent::find($id);
			$courseStudent->status=2;
			$courseStudent->message=$data["message"];
			
			$chars = md5(uniqid(mt_rand(), true));
			//加入学生通知
			$messageToStudent = new MessageToStudent;
			$messageToStudent->registerDataInit_append($chars,$user->id,$courseStudent->student_id,
					$courseStudent->course_id,"","",
					"","",'拒绝了你的课程申请！',0,0,0,2);
			$messageToStudent->save();
			$courseStudent->save();
			return $arrayName = array('ret' => 1, "message" => "已将状态设置成功！");
		}
		return array('ret' => 0, "message" => "操作失败！");
	}

	/**
	*	取消选择课程保存
	*/
	public function cancleCourseUserList($role)
	{
		$user=FjjUtils::getUser();
		$data = Input::all();
		if($role==2){
			//教师选择保存
			$courseStudent =CourseStudent::whereRaw('course_id = ? and student_id = ?', array(
				$data["course_id"],$data["user_id"]))->delete();
			return $arrayName = array('ret' => 1, "message" => "操作成功！");
		}elseif ($role==3) {
			//教师选择保存
			$courseInstructor =CourseInstructor::whereRaw('course_id = ? and instructor_id = ?', array(
				$data["course_id"],$data["user_id"]))->delete();
			return $arrayName = array('ret' => 1, "message" => "操作成功！");
		}
		return array('ret' => 0, "message" => "操作失败！");
	}

	/**
	*	学生课程教师选择保存
	*/
	public function selectCourseInstructorList()
	{
		$user=FjjUtils::getUser();
		$data = Input::all();

		$courseStudent =CourseStudent::whereRaw('course_id = ? and student_id = ?', array(
				$data["course_id"],$data["student_id"]))->first();
		if($courseStudent!=null){
			$courseStudent->instructor_id=$data["instructor_id"];
			$courseStudent->save();
			return array('ret' => 0, "message" => "操作成功！");
		}
		
		return array('ret' => 0, "message" => "操作失败！");
	}

	/**
	*	教师的学生列表
	*/
	public function courseIntstructorStudent($course_id)
	{
		$user=FjjUtils::getUser();

		if($user&&$user->user_role_id==3){
			$courseStudentList =CourseStudent::whereRaw('course_id = ? and instructor_id = ?', array(
					$course_id,$user->id))->get();
			if($courseStudentList!=null){
				foreach ($courseStudentList as $courseStudent) {
					$courseStudent->student->userExt;
				}
				return $courseStudentList;
			}
		}
		return array('ret' => 0, "message" => "操作失败！");
	}

	/**
	*	设置任务状态为选中
	*/
	public function taskComplete($task_id,$id,$status)
	{
		$user=FjjUtils::getUser();
		$data = Input::all();
		if($user){
			$complete = UnitsTaskListComplete::whereRaw("task_list_id = ? and pub_user = ?",
				array($id,$user->id))->first();
			if($complete){
				$complete->status=$status;
				$complete->save();
			}else{
				$complete = new UnitsTaskListComplete;
				$chars = md5(uniqid(mt_rand(), true));
				$complete->registerDataInit($chars,$id,$user->id,$status,$task_id,$data["courseId"]);
				$complete->save();
			}
			return array("ret"=>1,"message"=>"任务状态设置成功！");
		}
		return array('ret' => 0, "message" => "操作失败！未登录");
	}

	/**
	*	创建课程进入页
	*/
	public function createCourse()
	{
		$user=FjjUtils::getUser();
		return View::make('course/c_course')->with("user",$user);
	}

	/**
	*	创建课程保存页
	*/
	public function saveCourse()
	{
		$data = Input::all();
		$user=FjjUtils::getUser();
		if($user){
			if($data["id"]!=""){
				$course = Course::find($data["id"]);
				$courseExt=CourseExt::find($data["id"]);
				$course->name=$data["name"];
				$course->shortname=$data["shortname"];
				$course->summary=$data["summary"];
				$course->desc=$data["desc"];
				if($data["deadline"]){
					$courseExt->deadline=$data["deadline"];
				}
				if($data["question"]){
					$courseExt->question=$data["question"];
				}
				$courseExt->save();
				$course->save();
				return array("ret"=>1,"message"=>"修改成功！");
			}else{
				$course = new Course;
				$chars = md5(uniqid(mt_rand(), true));
				$course->registerDataInit($chars,$data["name"],$data["desc"],$user["id"],$data["shortname"],$data["summary"],1);
				$course->save();
				$course->id=$chars;
				$courseExt=new CourseExt;
				$courseExt->registerDataInit();
				$courseExt->id=$chars;
				if($data["deadline"]){
					$courseExt->deadline=$data["deadline"];
				}
				if($data["question"]){
					$courseExt->question=$data["question"];
				}
				$courseExt->save();
				return array("ret"=>1,"message"=>"创建成功！");
			}
		}
		return array("ret"=>0,"message"=>"用户未登录，或登录过期");
	}

	/**
	*	创建单元进入页
	*/
	public function createUnits()
	{
		$user=FjjUtils::getUser();
		$courseId=Input::get('id');

		return View::make('course/c_units')->with(array("courseId"=>$courseId,"user"=>$user));
	}

	/**
	*	创建单元保存页
	*/
	public function saveUnits($id)
	{
		$data = Input::all();
		$user=FjjUtils::getUser();

		if($user){
			if($data["id"]!=""){
				$courseUnits = CourseUnits::find($data["id"]);
				$courseUnits->name=$data["name"];
				$courseUnits->desc=$data["desc"];
				$courseUnits->order=$data["order"];
				$courseUnits->save();

				return array("ret"=>1,"message"=>"修改成功！","courseUnits"=>$courseUnits->toArray());
			}else{
				$courseUnits = new CourseUnits;
				$chars = md5(uniqid(mt_rand(), true));
				$courseUnits->registerDataInit($chars,$data["name"],$data["desc"],$user["id"],$id);
				$courseUnits->order=$data["order"];
				$courseUnits->save();
				$courseUnits->id=$chars;

				return array("ret"=>1,"message"=>"创建成功！","courseUnits"=>$courseUnits->toArray());
			}
		}
		return array("ret"=>0,"message"=>"用户未登录，或登录过期");
	}

	/**
	*	创建单元任务保存页
	*/
	public function saveUnitTask($id)
	{
		$data = Input::all();
		$user=FjjUtils::getUser();

		if($user){
			$courseUnitTask = new CourseUnitTask;
			$chars = md5(uniqid(mt_rand(), true));
			$type=1;
			if($data["type"]){
				$type=$data["type"];
			}
			$courseUnitTask->registerDataInit($chars,$data["name"],$user["id"],$id,$type,$data["desc"]);
			$courseUnitTask->order=$data["order"];
			$courseUnitTask->save();
			$courseUnitTask->id=$chars;

			//取得UnitTaskList
			$unitTaskList = CourseUnitTask::where('unit_id','=',$id)->orderBy('created_at')->get();

			foreach ($unitTaskList as $taskList) {
				$taskList->taskListList;
			}

			return array("ret"=>1,"message"=>"创建成功！","unitTaskList"=>$unitTaskList->toArray());
		}
		return array("ret"=>0,"message"=>"用户未登录，或登录过期");
	}

	/**
	*	修改单元任务名
	*/
	public function editUnitTask($id)
	{
		$data = Input::all();
		$user=FjjUtils::getUser();

		if($user){
			$courseUnitTask =CourseUnitTask::find($id);
			$courseUnitTask->name=$data["name"];
			$courseUnitTask->desc=$data["desc"];
			$courseUnitTask->order=$data["order"];
			$courseUnitTask->save();

			return array("ret"=>1,"message"=>"修改成功！");
		}
		return array("ret"=>0,"message"=>"用户未登录，或登录过期");
	}

	/**
	*	修改任务类型
	*/
	public function taskTypeChange($id)
	{
		$data = Input::all();
		$user=FjjUtils::getUser();

		if($user){
			$courseUnitTask =CourseUnitTask::find($id);
			$courseUnitTask->type_id=$data["type"];
			$courseUnitTask->save();

			return array("ret"=>1,"message"=>"修改成功！");
		}
		return array("ret"=>0,"message"=>"用户未登录，或登录过期");
	}

	/**
	*	创建单元任务内容保存页
	*/
	public function saveUnitTaskContent($id)
	{
		$data = Input::all();
		$user=FjjUtils::getUser();

		if($user){
			$CourseUnitTaskList = new CourseUnitTaskList;
			$chars = md5(uniqid(mt_rand(), true));
			$CourseUnitTaskList->registerDataInit($chars,$data["desc"],$user["id"],$id);
			$CourseUnitTaskList->save();
			$CourseUnitTaskList->id=$chars;

			//取得UnitTaskList
			$unitTaskListList = CourseUnitTaskList::where('unit_task_id','=',$id)->orderBy('created_at')->get();

			return array("ret"=>1,"message"=>"创建成功！","unitTaskListList"=>$unitTaskListList->toArray());
		}
		return array("ret"=>0,"message"=>"用户未登录，或登录过期");
	}

	/**
	*	创建单元任务讨论保存
	*/
	public function saveUnitTaskDiscus($id)
	{
		$data = Input::all();
		$user=FjjUtils::getUser();

		if($user){
			$unitsTaskListDiscus = new UnitsTaskListDiscus;
			//查找出单元ID 以及任务ID
			$courseUnitTaskList = CourseUnitTaskList::find($id);
			

			$chars = md5(uniqid(mt_rand(), true));
			$is_role = ($user->user_role_id==3)?1:0;

			$unitsTaskListDiscus->registerDataInit($chars,$id,$data["content"],$is_role,$user["id"],
				$data["parent_id"],$data["courseId"],
				$courseUnitTaskList->unitTask->unit->id,$courseUnitTaskList->unitTask->id);
			$unitsTaskListDiscus->save();
			$unitsTaskListDiscus->user=$user->toArray();

			//加入通知
			$chars_2 = md5(uniqid(mt_rand(), true));
			//老师通知
			if($user->user_role_id==2||$user->user_role_id==1){
				//查找出当前学生该课程的指导老师
				$couseStudent = CourseStudent::whereRaw("course_id = ? and student_id = ?",
				array($data["courseId"],$user->id))->first();
				$messageToInstructor = new MessageToInstructor;
				if($data["parent_id"]!=""){
					$messageToInstructor->registerDataInit($chars_2,$user->id,$couseStudent->instructor_id,
						$data["courseId"],$courseUnitTaskList->unitTask->unit->id,$courseUnitTaskList->unitTask->id,
						$id,$data["parent_id"],'回复了一个讨论',0,0,1);
				}else{
					$messageToInstructor->registerDataInit($chars_2,$user->id,$couseStudent->instructor_id,
						$data["courseId"],$courseUnitTaskList->unitTask->unit->id,$courseUnitTaskList->unitTask->id,
						$id,$chars,'发起了一个讨论',0,0,0);
				}
				$messageToInstructor->save();
			//学生通知
			}elseif($user->user_role_id==3){
				//查找出当条消息的发布人
				$nowDiscus=UnitsTaskListDiscus::find($data["parent_id"]);
				$messageToStudent = new MessageToStudent;
				$messageToStudent->registerDataInit($chars_2,$user->id,$nowDiscus->pub_user,
						$data["courseId"],$courseUnitTaskList->unitTask->unit->id,$courseUnitTaskList->unitTask->id,
						$id,$data["parent_id"],'回复了一个讨论',0,0,0);
				$messageToStudent->save();
			}
			
			return array("ret"=>1,"message"=>"评论成功！","unitsTaskListDiscus"=>$unitsTaskListDiscus->toArray());
		}
		return array("ret"=>0,"message"=>"用户未登录，或登录过期");
	}

	/**
	*	设置单元任务讨论的状态
	*/
	public function discusSolve($id)
	{
		$data = Input::all();
		$user=FjjUtils::getUser();

		if($user){
			$unitsTaskListDiscus = UnitsTaskListDiscus::find($id);
			$unitsTaskListDiscus->is_ok=$data["status"];
			$unitsTaskListDiscus->save();
			return array("ret"=>1,"message"=>"设置成功！");
		}
		return array("ret"=>0,"message"=>"用户未登录，或登录过期");
	}

	/**
	*	设置单元任务作业的状态
	*/
	public function assignmentSolve($id)
	{
		$data = Input::all();
		$user=FjjUtils::getUser();

		if($user){
			$assignment = UnitsTaskAssignment::find($id);
			$assignment->is_complete=$data["status"];
			$course_id=$assignment->task->unit->course->id;

			//设置当前学生的任务等级为当前任务的下一级
			$userCourseAuth=UserCourseAuth::whereRaw("course_id = ? and user_id = ?",
					array($course_id,$assignment->pub_user))->first();
			//当前任务的等级
			$order=$assignment->task->order;
			$userCourseAuth->task_level=$order+1;

			//加入通知
			$chars = md5(uniqid(mt_rand(), true));
			$messageToStudent = new MessageToStudent;
			$messageToStudent->registerDataInit($chars,$user->id,$assignment->pub_user,
					$course_id,$assignment->task->unit->id,$assignment->task->id,
					"",$assignment->id,'已通过了你的作业',0,1,1);

			$userCourseAuth->save();
			$messageToStudent->save();
			$assignment->save();
			return array("ret"=>1,"message"=>"设置成功！");
		}
		return array("ret"=>0,"message"=>"用户未登录，或登录过期");
	}

	/**
	*	创建单元任务作业保存
	*/
	public function taskAssignmentSave($id)
	{
		$data = Input::all();
		$user=FjjUtils::getUser();

		if($user){
			//查找出当前单元ID
			$task=CourseUnitTask::find($id);
			//查找出当前学生的指导老师
			$couseStudent = CourseStudent::whereRaw("course_id = ? and student_id = ?",
				array($data["courseId"],$user->id))->first();

			$unitsTaskAssignment = new UnitsTaskAssignment;
			$chars = md5(uniqid(mt_rand(), true));
			$unitsTaskAssignment->registerDataInit($chars,$id,$data["content"],$user["id"],$data["courseId"],$task->unit->id);
			$unitsTaskAssignment->save();

			//加入通知
			$chars_2 = md5(uniqid(mt_rand(), true));
			$messageToInstructor = new MessageToInstructor;
			$messageToInstructor->registerDataInit($chars_2,$user->id,$couseStudent->instructor_id,
				$data["courseId"],$task->unit->id,$id,
				"",$chars,'提交了作业',0,1,0);
			$messageToInstructor->save();
			return array("ret"=>1,"message"=>"保存成功！");
		}
		return array("ret"=>0,"message"=>"用户未登录，或登录过期");
	}

	/**
	*	修改单元任务作业保存
	*/
	public function taskAssignmentEdit($id)
	{
		$data = Input::all();
		$user=FjjUtils::getUser();

		if($user){
			$unitsTaskAssignment =UnitsTaskAssignment::find($id);
			if($user->id==$unitsTaskAssignment->pub_user){
				$unitsTaskAssignment->content=$data["content"];
				$unitsTaskAssignment->save();
			}
			return array("ret"=>1,"message"=>"修改成功！");
		}
		return array("ret"=>0,"message"=>"用户未登录，或登录过期");
	}

	/**
	*	修改单元任务作业讨论保存
	*/
	public function taskAssignmentDiscusEdit($id)
	{
		$data = Input::all();
		$user=FjjUtils::getUser();

		if($user){
			$unitsTaskAssignmentDiscus =UnitsTaskAssignmentDiscus::find($id);
			if($user->id==$unitsTaskAssignmentDiscus->pub_user){
				$unitsTaskAssignmentDiscus->content=$data["content"];
				$unitsTaskAssignmentDiscus->save();
			}
			return array("ret"=>1,"message"=>"修改成功！");
		}
		return array("ret"=>0,"message"=>"用户未登录，或登录过期");
	}

	/**
	*	删除单元任务作业讨论保存
	*/
	public function taskAssignmentDiscusDelete($id)
	{
		$data = Input::all();
		$user=FjjUtils::getUser();

		if($user){
			$unitsTaskAssignmentDiscus =UnitsTaskAssignmentDiscus::find($id);
			if($user->id==$unitsTaskAssignmentDiscus->pub_user){
				//delete taksdiscus child list
				$childList=$unitsTaskAssignmentDiscus->childList;
				if($childList){
					foreach ($childList as $child) {
						$child->delete();
						//delete task discus notify
						$messageToStudent=MessageToStudent::where("discus_id","=",$child->id)->delete();
						$messageToInstructor=MessageToInstructor::where("discus_id","=",$child->id)->delete();
					}
				}
				//delete task discus notify
				$messageToStudent=MessageToStudent::where("discus_id","=",$unitsTaskAssignmentDiscus->id)->delete();
				$messageToInstructor=MessageToInstructor::where("discus_id","=",$unitsTaskAssignmentDiscus->id)->delete();

				$unitsTaskAssignmentDiscus->delete();
				return array("ret"=>1,"message"=>"删除成功！");
			}
			return array("ret"=>1,"message"=>"修改成功！");
		}
		return array("ret"=>0,"message"=>"用户未登录，或登录过期");
	}

	/**
	*	修改任务讨论保存
	*/
	public function taskDiscusEdit($id)
	{
		$data = Input::all();
		$user=FjjUtils::getUser();

		if($user){
			$unitsTaskDiscus=UnitsTaskListDiscus::find($id);
			if($user->id==$unitsTaskDiscus->pub_user){
				$unitsTaskDiscus->content=$data["content"];
				$unitsTaskDiscus->save();
				return array("ret"=>1,"message"=>"修改成功！");
			}
		}
		return array("ret"=>0,"message"=>"用户未登录，或登录过期");
	}

	/**
	*	删除任务讨论保存
	*/
	public function taskDiscusDelete($id)
	{
		$data = Input::all();
		$user=FjjUtils::getUser();

		if($user){
			$unitsTaskDiscus=UnitsTaskListDiscus::find($id);
			if($user->id==$unitsTaskDiscus->pub_user){
				//delete taksdiscus child list
				$childList=$unitsTaskDiscus->childList;
				if($childList){
					foreach ($childList as $child) {
						$child->delete();
						//delete task discus notify
						$messageToStudent=MessageToStudent::where("discus_id","=",$child->id)->delete();
						$messageToInstructor=MessageToInstructor::where("discus_id","=",$child->id)->delete();
					}
				}
				//delete task discus notify
				$messageToStudent=MessageToStudent::where("discus_id","=",$unitsTaskDiscus->id)->delete();
				$messageToInstructor=MessageToInstructor::where("discus_id","=",$unitsTaskDiscus->id)->delete();

				$unitsTaskDiscus->delete();
				return array("ret"=>1,"message"=>"删除成功！");
			}
		}
		return array("ret"=>0,"message"=>"用户未登录，或登录过期");
	}

	/**
	*	单元任务作业评论保存
	*/
	public function taskAssignmentDiscusSave($id)
	{
		$data = Input::all();
		$user=FjjUtils::getUser();

		if($user){
			$unitsTaskAssignmentDiscus =new UnitsTaskAssignmentDiscus;
			//查找当前作业ID 任务ID 单元ID
			$assignment=UnitsTaskAssignment::find($id);
			//查找出当前学生的指导老师
			$couseStudent = CourseStudent::whereRaw("course_id = ? and student_id = ?",
				array($data["courseId"],$user->id))->first();

			$is_role = ($user->user_role_id==3)?1:0;
			$chars = md5(uniqid(mt_rand(), true));
			$unitsTaskAssignmentDiscus->registerDataInit($chars,$id,$data["content"],$is_role,$user->id,$data["parent_id"],
				$data["courseId"],$assignment->task->id,$assignment->task->unit->id);
			$unitsTaskAssignmentDiscus->save();

			//加入通知
			$chars_2 = md5(uniqid(mt_rand(), true));
			//老师通知
			if($user->user_role_id==2||$user->user_role_id==1){
				$messageToInstructor = new MessageToInstructor;
				$messageToInstructor->registerDataInit($chars_2,$user->id,$couseStudent->instructor_id,
					$data["courseId"],$assignment->task->unit->id,$assignment->task->id,
					"",$id,'评论了一个作业',0,1,1);
				$messageToInstructor->save();
			//学生通知
			}elseif ($user->user_role_id==3) {
				$messageToStudent = new MessageToStudent;
				$messageToStudent->registerDataInit($chars_2,$user->id,$assignment->pub_user,
						$data["courseId"],$assignment->task->unit->id,$assignment->task->id,
						"",$id,'评论了一个作业',0,1,0);
				$messageToStudent->save();
			}
			
			return array("ret"=>1,"message"=>"评论成功！");
		}
		return array("ret"=>0,"message"=>"用户未登录，或登录过期");
	}

	/**
	*	课程删除
	*/
	public function deleteCourse($id)
	{
		$user=FjjUtils::getUser();

		if($user){
			$course=Course::find($id);

			//删除课程子类
			CourseExt::where("id","=",$id)->delete();
			CourseInstructor::where("course_id","=",$id)->delete();
			CourseStudent::where("course_id","=",$id)->delete();
			
			//删除课程单元
			$courseUnits=CourseUnits::where("course_id","=",$id)->get();
			foreach ($courseUnits as $units) {
				CourseController::deleteUnits($units->id);
			}

			//删除课程
			$course->delete();

			return array("ret"=>1,"message"=>"删除成功！");
		}
		return array("ret"=>0,"message"=>"用户未登录，或登录过期");
	}

	/**
	*	单元删除
	*/
	public function deleteUnits($id)
	{
		$user=FjjUtils::getUser();

		if($user){
			$units=CourseUnits::find($id);

			//删除单元任务
			$unitsTask=CourseUnitTask::where("unit_id","=",$id)->get();
			foreach ($unitsTask as $task) {
				CourseController::deleteTask($task->id);
			}
			//删除单元
			$units->delete();

			return array("ret"=>1,"message"=>"删除成功！");
		}
		return array("ret"=>0,"message"=>"用户未登录，或登录过期");
	}

	/**
	*	任务删除
	*/
	public function deleteTask($id)
	{
		$user=FjjUtils::getUser();

		if($user){
			$task=CourseUnitTask::find($id);

			//删除任务子类
			CourseUnitTaskList::where("unit_task_id","=",$id)->delete();
			UnitsTaskDiscus::where("task_id","=",$id)->delete();
			UnitsTaskQuestion::where("task_id","=",$id)->delete();

			//删除任务
			$task->delete();

			return array("ret"=>1,"message"=>"删除成功！");
		}
		return array("ret"=>0,"message"=>"用户未登录，或登录过期");
	}
}
