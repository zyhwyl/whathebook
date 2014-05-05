<?php


class CourseStudent extends Eloquent{
	public $table = 'course_student';

	public function registerDataInit($id,$instructor_id,$student_id,$course_id,$status){
		$this->id=$id;
		$this->instructor_id=$instructor_id;
		$this->student_id=$student_id;
		$this->join_time=date("Y-m-d h:m:s");
		$this->course_id=$course_id;
		$this->last_study_time=date("Y-m-d h:m:s");
		$this->study_time=0;
		$this->status=$status;
		$this->message="";
		$this->apply_message="";
	}

	public function student(){
		return $this->belongsTo("User","student_id")->orderBy('created_at');
	}

	public function instructor(){
		return $this->belongsTo("User","instructor_id")->orderBy('created_at');
	}

	public function course(){
		return $this->belongsTo("Course","course_id")->orderBy('created_at');
	}
}