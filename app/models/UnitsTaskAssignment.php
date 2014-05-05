<?php


class UnitsTaskAssignment extends Eloquent{
	public $table = 'units_task_assignment';

	public function registerDataInit($id,$task_id,$content,$pub_user,$course_id,$unit_id){
		$this->id=$id;
		$this->task_id=$task_id;
		$this->content=$content;
		$this->pub_user=$pub_user;
		$this->course_id=$course_id;
		$this->unit_id=$unit_id;
	}

	public function discusList(){
		return $this->hasMany("UnitsTaskAssignmentDiscus","assignment_id")->orderBy('created_at');
	}

	public function user(){
		return $this->belongsTo("User","pub_user");
	}

	public function task(){
		return $this->belongsTo("CourseUnitTask","task_id");
	}
}