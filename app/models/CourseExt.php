<?php


class CourseExt extends Eloquent{
	public $table = 'course_ext';

	public function registerDataInit(){
		$this->level=0;
		$this->score=0;
	}
}