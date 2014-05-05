<?php


class CourseUnitTaskList extends Eloquent{
	public $table = 'course_unit_task_list';

	public function registerDataInit($id,$desc,$create_user,$unit_task_id){
		$this->id=$id;
		$this->desc=$desc;
		$this->unit_task_id=$unit_task_id;
		$this->create_user=$create_user;
		$this->status=1;
	}

	public function unitTask(){
		return $this->belongsTo("CourseUnitTask","unit_task_id");
	}
}