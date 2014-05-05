<?php


class MessageToInstructor extends Eloquent{
	public $table = 'message_to_instructor';

	public function registerDataInit($id,$pub_user,$noti_user,$course_id,
			$unit_id,$task_id,$task_content_id,$discus_id,$content,$status,$is_assignment,$is_response){
		$this->id=$id;
		$this->pub_user=$pub_user;
		$this->noti_user=$noti_user;
		$this->course_id=$course_id;
		$this->unit_id=$unit_id;
		$this->task_id=$task_id;
		$this->task_content_id=$task_content_id;
		$this->discus_id=$discus_id;
		$this->content=$content;
		$this->status=$status;
		$this->is_assignment=$is_assignment;
		$this->is_response=$is_response;
	}

	public function user(){
		return $this->belongsTo("User","pub_user");
	}

	public function task(){
		return $this->belongsTo("CourseUnitTask","task_id");
	}

	public function course(){
		return $this->belongsTo("Course","course_id");
	}

	public function unit(){
		return $this->belongsTo("CourseUnits","unit_id");
	}

	public function task_content(){
		return $this->belongsTo("CourseUnitTaskList","task_content_id");
	}
}