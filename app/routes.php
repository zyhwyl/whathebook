<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	$user=FjjUtils::getUser();
	if($user){
		if($user->user_role_id==1){
			return View::make("course/m_course")->with("user",$user);
		}else{
			return View::make("index")->with("user",$user);
		}
	}
    
	return View::make("index");
});

Route::get('/landingpage', function()
{
	$user=FjjUtils::getUser();
	if($user){
		if($user->user_role_id==1){
			return View::make("course/m_course")->with("user",$user);
		}
	}
	return View::make("landingpage")->with("user",$user);
});

Route::get('/login', function()
{
	$user=FjjUtils::getUser();
	if(!$user){
		return View::make("login")->with("user",$user);
	}
	return View::make("index")->with("user",$user);
});

Route::get('/register', function()
{
	$user=FjjUtils::getUser();
	if(!$user){
		return View::make("register")->with("user",$user);
	}
	return View::make("index")->with("user",$user);
});

Route::get('/logout', function()
{
	$token=Session::get("userAuth")["id"];
	if($token){
		$userAuth = UserAuth::where('id','=',$token)->delete();
		Session::forget('user');
		Session::forget("userAuth");
		return Redirect::to('/');
	}
});

Route::get('/prepubpage', function()
{
	return View::make("prepubpage");
});

Route::get('/m', function()
{
	$user=FjjUtils::getUser();
	return View::make("course/m_course")->with("user",$user);
});

Route::get('/s', function()
{
	$user=FjjUtils::getUser();
	return View::make("users/m_user")->with("user",$user);
});

Route::get('/t', function()
{
	$user=FjjUtils::getUser();
	return View::make("users/t_user")->with("user",$user);
});

/**
*	用户路由
*/
Route::get('/users/register','UserController@getRegister');
Route::post('/users/register','UserController@saveRegister');
Route::post('/users/login','UserController@saveLogin');
Route::get('/users/isloginassert','UserController@isLoginAssert');
Route::get('/users/list/{role}','UserController@showUserList');
Route::get('/users/delete/{id}','UserController@deleteUser');
Route::get('/users_i/list','CourseController@courseIntstructorList');
Route::post('/users/photoupload','UploadController@userPhotoUpload');
Route::get('/users/index',function(){
	$user=FjjUtils::getUser();
	return View::make("templete/index")->with("user",$user);
});
Route::get('/users/getLoginUser',function(){
	$user=FjjUtils::getUser();
	return $user;
});
Route::post('/users/infoeidt','UserController@userInfoEdit');
Route::get('/users_i/getNotify','UserController@userNotify');
Route::post('/users/notifystatus/{id}','UserController@userNotifyStatus');
Route::get('/users/getuserallnotify','UserController@userAllNotify');

/**
*	课程路由
*/
Route::get('/course/list/{type}','CourseController@showList');
Route::get('/course/content/{id}','CourseController@showCourse');
Route::get('/course/delete/{id}','CourseController@deleteCourse');
Route::get('/units/delete/{id}','CourseController@deleteUnits');
Route::get('/task/delete/{id}','CourseController@deleteTask');
Route::get('/course/createcourse','CourseController@createCourse');
Route::post('/course/savecourse','CourseController@saveCourse');
Route::get('/course/createunits','CourseController@createUnits');
Route::post('/course/saveunits/{id}','CourseController@saveUnits');
Route::get('/units/content/{id}/{course_id}','CourseController@showUnits');
Route::get('/task/content/{id}','CourseController@showTask');
Route::get('/task/discus/detail/{id}','CourseController@showTaskDiscusDetail');
Route::get('/units/content/instructor/{id}','CourseController@showUnitsInstructor');
Route::get('/units/content/admin/{id}','CourseController@showUnitsAdmin');
Route::post('/units/saveunittask/{id}','CourseController@saveUnitTask');
Route::get('/units/editunittask/{id}','CourseController@editUnitTask');
Route::post('/units/saveunittasklist/{id}','CourseController@saveUnitTaskContent');
Route::post('/units/saveunittaskdiscus/{id}','CourseController@saveUnitTaskDiscus');
Route::get('/units/taskdiscuslist/{id}','CourseController@showTaskDiscusList');
Route::post('/units/taskdiscusedit/{id}','CourseController@taskDiscusEdit');
Route::post('/units/taskdiscusdelete/{id}','CourseController@taskDiscusDelete');
Route::get('/units/taskdiscuslistresponse/{id}','CourseController@showTaskDiscusListResponse');
Route::post('/units/taskassignmentsave/{id}','CourseController@taskAssignmentSave');
Route::post('/units/taskassignmentedit/{id}','CourseController@taskAssignmentEdit');
Route::post('/units/taskassignmentdiscusedit/{id}','CourseController@taskAssignmentDiscusEdit');
Route::get('/units/taskassignment/{id}','CourseController@taskAssignmentShow');
Route::get('/units/taskassignment_i/{id}','CourseController@taskAssignmentInstructorShow');
Route::get('/units/taskassignment_i/detail/{id}','CourseController@taskAssignmentInstructorDetailShow');
Route::get('/units/taskassignmentdiscus/{id}','CourseController@taskAssignmentDiscusShow');
Route::post('/units/taskassignmentdiscussave/{id}','CourseController@taskAssignmentDiscusSave');
Route::post('/units/taskassignmentdiscusdelete/{id}','CourseController@taskAssignmentDiscusDelete');
Route::post('/units/task/complete/{task_id}/{id}/{status}','CourseController@taskComplete');
Route::get('/course/users_i/discuslist/{id}','CourseController@courseDiscusList');
Route::get('/course/users_i/discus/{id}','CourseController@courseDiscusDetail');
Route::get('/task/users_i/process/{id}','CourseController@taskProcessStudent');
Route::post('/units/task/discus/solve/{id}','CourseController@discusSolve');
Route::post('/assignment/complete/{id}','CourseController@assignmentSolve');
Route::post('/course/apply/{id}','CourseController@courseApply');
Route::get('/course/apply/{id}','CourseController@courseApplyList');
Route::post('/course/apply/status/{id}','CourseController@courseApplyStatus');
Route::post('/course/apply/reject/{id}','CourseController@courseApplyReject');
Route::post('/task/typechange/{id}','CourseController@taskTypeChange');

/**
*	课程用户路由
*/
Route::get('/course/{role}/list','CourseController@showCourseUserList');
Route::get('/course/{role}/select','CourseController@selectCourseUserList');
Route::get('/course/{role}/cancle','CourseController@cancleCourseUserList');
Route::get('/course/student/select_ins','CourseController@selectCourseInstructorList');
Route::get('/course/instructor/studentlist/{course_id}','CourseController@courseIntstructorStudent');

/**
*	public route
*/
Route::post('ckeditor/ckeditorUpload','UploadController@ckImageUpload');