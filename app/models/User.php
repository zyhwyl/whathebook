<?php


class User extends Eloquent{
	public $table = 'users';

	public function registerDataInit($email,$name,$group_id,$ip,$role,$gender){
		$this->email=$email;
		$this->name=$name;
		$this->gender=$gender;
		$this->group_id=$group_id;
		$this->login_count=0;
		$this->score=0;
		$this->user_role_id=$role;
	}

	public function userExt(){
		return $this->hasOne('UserExt','id');
	}
}