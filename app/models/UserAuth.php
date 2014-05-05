<?php


class UserAuth extends Eloquent{
	public $table = 'user_auth';

	public function registerDataInit($id,$user_id,$name,$email,$ip){
		$this->id=$id;
		$this->user_id=$user_id;
		$this->name=$name;
		$this->email=$email;
		$this->login_ip=$ip;
		$this->login_time=date("Y-m-d h:m:s");
	}
}