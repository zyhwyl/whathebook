<?php


class CourseUnits extends Eloquent{
	public $table = 'course_units';

	public function registerDataInit($id,$name,$desc,$create_user,$course_id){
		$this->id=$id;
		$this->name=$name;
		$this->desc=$desc;
		$this->course_id=$course_id;
		$this->view_count=0;
		$this->study_count=0;
		$this->create_user=$create_user;
		$this->status=1;
	}

	public function taskList(){
		return $this->hasMany("CourseUnitTask","unit_id")->orderBy('created_at');
	}

	public function course(){
		return $this->belongsTo("Course","course_id");
	}
}