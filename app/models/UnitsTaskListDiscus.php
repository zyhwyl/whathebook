<?php


class UnitsTaskListDiscus extends Eloquent{
	public $table = 'units_task_list_discus';

	public function registerDataInit($id,$task_id,$content,$is_instructor,$pub_user,
				$parent_id,$course_id,$unit_id,$task_parent_id){
		$this->id=$id;
		$this->task_id=$task_id;
		$this->content=$content;
		$this->is_instructor=$is_instructor;
		$this->pub_user=$pub_user;
		$this->parent_id=$parent_id;
		$this->course_id=$course_id;
		$this->unit_id=$unit_id;
		$this->task_parent_id=$task_parent_id;
		$this->is_ok=0;
	}

	public function childList(){
		return $this->hasMany("UnitsTaskListDiscus","parent_id")->orderBy('created_at');
	}

	public function user(){
		return $this->belongsTo("User","pub_user");
	}

	public function taskContent(){
		return $this->belongsTo("CourseUnitTaskList","task_id");
	}
}