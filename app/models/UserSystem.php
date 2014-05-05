<?php


class UserSystem extends Eloquent{
	public $table = 'user_system';

	public function registerDataInit($id,$email,$name,$password,$ip){
		$this->id=$id;
		$this->email=$email;
		$this->name=$name;
		$this->password=$password;
		$this->register_time=date("Y-m-d h:m:s");
		$this->register_ip=$ip;
		$this->login_count=0;
		$this->reset_key="";
		$this->activation=1;
	}
}