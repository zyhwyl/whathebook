<?php


class UserCourseAuth extends Eloquent{
	public $table = 'user_course_auth';

	public function registerDataInit($id,$user_id,$course_id,$units_level,$task_level){
		$this->id=$id;
		$this->user_id=$user_id;
		$this->course_id=$course_id;
		$this->units_level=$units_level;
		$this->task_level=$task_level;
	}
}