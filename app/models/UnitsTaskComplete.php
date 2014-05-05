<?php


class UnitsTaskComplete extends Eloquent{
	public $table = 'units_task_complete';

	public function registerDataInit($id,$task_id,$pub_user,$status){
		$this->id=$id;
		$this->task_id=$task_id;
		$this->pub_user=$pub_user;
		$this->status=$status;
	}

	public function task(){
		return $this->belongsTo("CourseUnitTask","task_id");
	}

	public function user(){
		return $this->belongsTo("User","pub_user");
	}
}