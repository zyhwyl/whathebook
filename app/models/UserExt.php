<?php


class UserExt extends Eloquent{
	public $table = 'user_ext';

	public function registerDataInit($id,$gender){
		$this->id=$id;
		$this->nickname="";
		$this->photo="";
		$this->age="";
		$this->follower=0;
		$this->followed=0;
		$this->gender=$gender;
		$this->intro="";
		$this->phone="";
	}
}