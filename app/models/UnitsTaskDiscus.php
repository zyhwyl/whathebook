<?php


class UnitsTaskDiscus extends Eloquent{
	public $table = 'units_task_discus';

	public function registerDataInit($id,$task_content_id,$content,$is_instructor,$pub_user,$parent_id){
		$this->id=$id;
		$this->task_content_id=$task_content_id;
		$this->content=$content;
		$this->is_instructor=$is_instructor;
		$this->pub_user=$pub_user;
		$this->parent_id=$parent_id;
		$this->pub_time=date("Y-m-d h:m:s");
	}

	public function childList(){
		return $this->hasMany("UnitsTaskDiscus","parent_id")->orderBy('created_at');
	}

	public function user(){
		return $this->belongsTo("User","pub_user");
	}
}