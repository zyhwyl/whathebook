<?php


class UnitsTaskListComplete extends Eloquent{
	public $table = 'units_task_list_complete';

	public function registerDataInit($id,$task_list_id,$pub_user,$status,$task_id,$course_id){
		$this->id=$id;
		$this->task_list_id=$task_list_id;
		$this->pub_user=$pub_user;
		$this->status=$status;
		$this->task_id=$task_id;
		$this->course_id=$course_id;
	}

	public function taskContent(){
		return $this->belongsTo("CourseUnitTaskList","task_list_id");
	}

	public function user(){
		return $this->belongsTo("User","pub_user");
	}
}