<?php


class CourseInstructor extends Eloquent{
	public $table = 'course_instructor';

	public function registerDataInit($id,$instructor_id,$course_id){
		$this->id=$id;
		$this->instructor_id=$instructor_id;
		$this->join_time=date("Y-m-d h:m:s");
		$this->course_id=$course_id;
		$this->last_study_time=date("Y-m-d h:m:s");
		$this->status=1;
	}

	public function instructor(){
		return $this->belongsTo("User","instructor_id");
	}

	public function course(){
		return $this->belongsTo("Course","course_id");
	}
}