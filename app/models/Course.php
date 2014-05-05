<?php


class Course extends Eloquent{
	public $table = 'course';

	public function registerDataInit($id,$name,$desc,$create_user,$shortname,$summary,$type){
		$this->id=$id;
		$this->name=$name;
		$this->shortname=$shortname;
		$this->summary=$summary;
		$this->type=$type;
		$this->visible=1;
		$this->desc=$desc;
		$this->view_count=0;
		$this->create_user=$create_user;
		$this->status=1;
	}

	public function courseExt(){
		return $this->hasOne("CourseExt","id");
	}

	public function unitsList(){
		return $this->hasMany("CourseUnits","course_id")->orderBy('created_at');
	}

	public function instructorList(){
		return $this->hasMany("CourseInstructor","course_id")->orderBy('created_at');
	}

	public function studentList(){
		return $this->hasMany("CourseStudent","course_id")->orderBy('created_at');
	}
}