<?php


class CourseUnitTask extends Eloquent{
	public $table = 'course_unit_task';

	public function registerDataInit($id,$name,$create_user,$unit_id,$type,$desc){
		$this->id=$id;
		$this->name=$name;
		$this->unit_id=$unit_id;
		$this->create_user=$create_user;
		$this->status=1;
		$this->type_id=$type;
		$this->desc=$desc;
	}

	public function taskListList(){
		return $this->hasMany("CourseUnitTaskList","unit_task_id")->orderBy('created_at');
	}

	public function complete(){
		return $this->hasMany("UnitsTaskComplete","task_id")->orderBy('created_at');
	}

	public function unit(){
		return $this->belongsTo("CourseUnits","unit_id");
	}

	public function type(){
		return $this->belongsTo("TaskType","type_id");
	}
}