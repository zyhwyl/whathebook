<?php


class UnitsTaskAssignmentDiscus extends Eloquent{
	public $table = 'units_task_assignment_discus';

	public function registerDataInit($id,$assignment_id,$content,$is_instructor,$pub_user,$parent_id,
				$course_id,$unit_id,$task_id){
		$this->id=$id;
		$this->assignment_id=$assignment_id;
		$this->content=$content;
		$this->is_instructor=$is_instructor;
		$this->pub_user=$pub_user;
		$this->parent_id=$parent_id;
		$this->course_id=$course_id;
		$this->unit_id=$unit_id;
		$this->task_id=$task_id;
	}

	public function childList(){
		return $this->hasMany("UnitsTaskAssignmentDiscus","parent_id")->orderBy('created_at');
	}

	public function user(){
		return $this->belongsTo("User","pub_user");
	}
}