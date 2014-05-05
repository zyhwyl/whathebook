<?php

class UserController extends BaseController {
	/*
	|--------------------------------------------------------------------------
	| Default User Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'UserController@showWelcome');
	|
	*/
	
	/**
 	*   进入注册页面
	*/
	public function getRegister()
	{
		$user=FjjUtils::getUser();
		return View::make('users/register')->with("user",$user);
	}

	/**
	*   进入注册页面
	*/
	public function saveRegister()
	{
		$data = Input::all();
		$ip   = Request::getClientIp();
		$password=md5($data["password"]);

		//判断用户邮箱是否存在
		$user = User::where('email', "=", $data["email"])->first();
		if($user!=null&&empty($user->email)!=true){
			return $arrayName = array('ret' => 0,"message"=>"邮箱已存在");
		}

		//保存用户
		$user = new User;
		$user->registerDataInit($data["email"],$data["name"],1,$ip,2,$data["gender"]);
		$user->save();

		//保存用户扩展表
		$userExt = new UserExt;
		$userExt->registerDataInit($user->id,$data["gender"]);
		
		//保存用户系统表
		$userSystem = new UserSystem;
		$userSystem->registerDataInit($user->id,$data["email"],$data["name"],$password,$ip);
		
		$userExt->save();
		$userSystem->save();

		$user->userExt = $userExt->toArray();
		return $arrayName = array('ret' => 1,'message' => '注册成功!', $user->toArray());
	}

	/**
	*   进入注册页面
	*/
	public function getLogin()
	{
		$user=FjjUtils::getUser();
		return View::make('users/login')->with("user",$user);
	}

	/**
	*   进入登录保存页面
	*/
	public function saveLogin()
	{
		$data = Input::all();
		$ip   = Request::getClientIp();
		$user = UserSystem::whereRaw('email = ? and password = ?', array(
			$data["email"],md5($data["password"])))->first();
		//如果用户为空 登录失败
		if($user!=null&&empty($user->email)!=true){
			//删除多余的用户登录数据
			UserAuth::where("user_id","=",$user->id)->delete();
			//生成一个token存入登录用户中
			$userAuth = new UserAuth;
			$chars = md5(uniqid(mt_rand(), true));
			$userAuth->registerDataInit($chars,$user->id,$user->name,$user->email,$ip);
			$userAuth->save();
			$userAuth->id=$chars;

			//存入session
			Session::put('userAuth',$userAuth->toArray());

			return array('ret' => 1,"message"=>"登录成功","user"=>$user->toArray());
		}
		return array('ret' => 0,"message"=>"用户名或者密码错误，请重新输入");
	}

	/**
	*   登录信息验证
	*/
	public function isLoginAssert()
	{
		$token = Input::get("token");
		if(empty($token)){
			$token=Session::get("userAuth")["id"];
		}
		$userAuth = UserAuth::where('id','=',$token)->first();
		if($userAuth!=null&&empty($userAuth->email)!=true){
			$user=User::find($userAuth->user_id);
			if($user!=null&&empty($user->email)!=true){
				$userExt=UserExt::find($userAuth->user_id);
				$user->userExt=$userExt->toArray();
				return array('ret' => 1,"user"=>$user->toArray());
			}else{
				return array('ret' => 0,"message"=>"未查找到用户");
			}
		}else{
			return array('ret' => 0,"message"=>"用户未登录，或者登录信息已过期");
		}
	}

	/**
	*   用户头像上传
	*/
	public function userPhotoUpload(){
		$file = Input::file('imgFile');
		$destinationPath = public_path().'/upload/avatar';
		if(FjjUtils::mkdirs($destinationPath)){
			$chars = md5(uniqid(mt_rand(), true));
			$file_ext = FjjUtils::get_extension($file->getClientOriginalName());
			$newfile=$destinationPath.'/'.$chars.'_origin.';
			$im=new imagick_readimge($file);
			FjjUtils::resizeImage($im,240,240,$newfile,$file_ext);
			return array('error' => 0, "url" => $chars,"title" => $chars.'_origin.'.$file_ext,"width" => $chars);
		}
	}

	/**
	*   用户信息修改
	*/
	public function userInfoEdit(){
		$user = Input::all();
		$new_user=User::find($user["id"]);
		$new_user_ext=UserExt::find($user["id"]);
		$new_user->name=$user["name"];
		$new_user_ext->age=$user["user_ext"]["age"];
		$new_user_ext->intro=$user["user_ext"]["intro"];
		if($user["photo_name"]!="")
			$new_user_ext->photo=$user["photo_name"];
		if($user["upload_photo"]!=""){
			$chars = md5(uniqid(mt_rand(), true));
			//裁剪图片
			$src=$user["user_ext"]["photo"];
			$filename=substr($src,strrpos($src,"/")+1,strrpos($src,"_origin")-strrpos($src,"/")-1);
			$filetype=substr($src,strrpos($src,".")+1);
			$targ_w = $targ_h = 100;
			$image = new Imagick($src);
			if($filetype=="gif"){
				$res = $image->coalesceImages();
				do {
                    $res->cropImage($user['w'], $user['h'] , $user["x"], $user["y"]);
                    // 去掉画布空白
                    $res->setImagePage(0, 0, 0, 0);
                } while ($res->nextImage());
			}else{
				$image->cropImage($user['w'], $user['h'] , $user["x"], $user["y"]);
			}
			$image->writeImage("./upload/avatar/".$filename."_thumb.".$filetype);
		}
		
		$new_user->save();
		$new_user_ext->save();
		Session::forget('user');
		Session::forget('user_ext');
		return array("ret"=>"1","user"=>$user);
	}

	/**
	*   显示用户列表
	*/
	public function showUserList($role){
		$userList=User::where("user_role_id","=",$role)->get();
		return $userList;
	}

	/**
	*   得到用户所有的通知
	*/
	public function userAllNotify()
	{
		$user=FjjUtils::getUser();
		if($user){
			$messageList = array();
			if($user->user_role_id == 2){
				$messageList = MessageToStudent::where("noti_user","=",$user->id)->orderBy("created_at","DESC")->get();
			}
			if($user->user_role_id == 3){
				$messageList = MessageToInstructor::where("noti_user","=",$user->id)->orderBy("created_at","DESC")->get();
			}
			foreach ($messageList as $message) {
				$message->user_pub=User::where("id","=",$message->pub_user)->first()->toArray();
				$message->user_noti=User::where("id","=",$user->id)->first()->toArray();
				$message->user_pub_ext=UserExt::where("id","=",$message->pub_user)->first()->toArray();
				$message->user_noti_ext=UserExt::where("id","=",$user->id)->first()->toArray();
				//get the message type
				$this->getUserNotifyType($message,$user->user_role_id);
			}
			return $messageList;
		}
	}

	/**
	*   获取用户通知
	*/
	public function userNotify(){
		$user=FjjUtils::getUser();
		if($user){
			//获得教师消息
			if($user->user_role_id==3){
				$messageList=MessageToInstructor::where("noti_user","=",$user->id)->where("status","=",0)
					->orderBy("created_at")->get();
				foreach ($messageList as $message) {
					$message->user;
					$this->getUserNotifyType($message,$user->user_role_id);
				}
				return $messageList;
			//获得学生消息
			}elseif($user->user_role_id==2||$user->user_role_id==1){
				$messageList=MessageToStudent::where("noti_user","=",$user->id)->where("status","=",0)
					->orderBy("created_at")->get();
				foreach ($messageList as $message) {
					$message->user;
					$this->getUserNotifyType($message,$user->user_role_id);
				}
				return $messageList;
			}
		}
	}
	
	//get the user notify type
	private function getUserNotifyType($message,$role){
		if($role==3){
			//消息为学生发起的讨论的通知
			if($message->is_assignment==0&&$message->is_response==0)
				$message->type=0;
			//消息为学生发起的讨论回复的通知
			elseif($message->is_assignment==0&&$message->is_response==1)
				$message->type=1;
			//消息为学生提交的作业的通知
			elseif($message->is_assignment==1&&$message->is_response==0)
				$message->type=2;
			//消息为学生提交的作业评论的通知
			elseif($message->is_assignment==1&&$message->is_response==1)
				$message->type=3;
		}elseif($role==2||$role==1){
			//消息为老师回复学生讨论的通知
			if($message->is_assignment==0&&$message->is_checked==0){
				$message->type=4;
				$message->all_content=UnitsTaskListDiscus::where("id","=",$message->discus_id)->first()->content;
			}//消息为老师回复学生作业的通知
			elseif($message->is_assignment==1&&$message->is_checked==0){
				$message->type=5;
				$message->all_content=UnitsTaskAssignmentDiscus::where("id","=",$message->discus_id)->first()->content;
			}//消息为老师设置学生作业通过的通知
			elseif($message->is_assignment==1&&$message->is_checked==1){
				$message->type=6;
				$message->all_content=UnitsTaskAssignment::where("id","=",$message->discus_id)->first()->content;
			}//消息为学生申请课程的通知
			elseif($message->is_assignment==0&&$message->is_checked==0&&$message->is_course_apply==1){
				$message->type=7;
			}
		}
	}

	/**
	*	用户消息状态设置
	*/
	public function userNotifyStatus($id)
	{
		$user = FjjUtils::getUser();
		$data = Input::all();
		if($user){
			if($user->user_role_id==2){
				$messageToStudent = MessageToStudent::find($id);
				$messageToStudent->status=$data["status"];
				$messageToStudent->save();
			}elseif($user->user_role_id==3){
				$messageToInstructor = MessageToInstructor::find($id);
				$messageToInstructor->status=$data["status"];
				$messageToInstructor->save();
			}
			return $arrayName = array('ret' => 1, "message" => "已将状态设置成功！");
		}
		return array('ret' => 0, "message" => "操作失败！");
	}

	/**
	*   删除一个用户
	*/
	public function deleteUser($id){
		$user=User::find($id);
		//删除用户扩展
		UserExt::where("id","=",$id)->delete();
		//删除用户登录信息
		UserAuth::where("user_id","=",$id)->delete();
		//删除用户讨论信息
		UnitsTaskAnswer::where("pub_user","=",$id)->delete();
		UnitsTaskDiscus::where("pub_user","=",$id)->delete();
		UnitsTaskQuestion::where("pub_user","=",$id)->delete();
		//删除用户选择课程信息
		CourseStudent::whereRaw("student_id = ? or instructor_id = ?",array($id,$id))->delete();
		CourseInstructor::whereRaw("instructor_id = ?",array($id))->delete();

		$user->delete();

		return array('ret' => 1,"message" => "删除成功!");
	}
}
