<?php

class UploadController extends Controller {

	/**
	 * Setup the layout used by the controller.
	 *
	 * @return void
	 */
	public function ckImageUpload()
	{
		$uptypes=array('jpg','jpeg','png','gif','bmp');  
		$max_file_size=1000000;
		$max_file_width=240;
		$destinationPath = public_path().'/upload/ckupload'; //upload path

		$funcNum = Input::get('CKEditorFuncNum');
	    $CKEditor = Input::get('CKEditor');
	    $langCode = Input::get('langCode');
	    $file = Input::file('upload');
	    $file_ext = FjjUtils::get_extension($file->getClientOriginalName());
	    $url = '';
	    
	    if($max_file_size < filesize($file)){
	    	$message = "上传失败!图片大小必须小于1M";
	    	echo "<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction($funcNum, '$url', '$message');</script>";
	    }else{
	    	if(!in_array($file_ext, $uptypes)){
				$message = "上传格式错误！必须是png,jpg,bmp,gif格式的文件";
	    		echo "<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction($funcNum, '$url', '$message');</script>";
	    	}else{
	    		if(FjjUtils::mkdirs($destinationPath)){
			    	$chars = md5(uniqid(mt_rand(), true));
			    	$filename=time().$chars.".".$file_ext;
			    	$url="/upload/ckupload/thumb/".$filename;
			    	if(move_uploaded_file($file,$destinationPath."/".$filename)){
			    		//create thumb img
			    		$image = new Imagick($destinationPath."/".$filename);
			    		$imageWidth=$image->getImageWidth();
			    		if($imageWidth>$max_file_width){
			    			$image->thumbnailImage($max_file_width, 0);
			    		}
			    		$image->writeImage("./upload/ckupload/thumb/".$filename);
			    		echo "<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction($funcNum, '$url', '');</script>";
			    	}
			    }
	    	}
		}
	}
	public function userPhotoUpload()
	{
		$uptypes=array('jpg','jpeg','png','gif','bmp');  
		$max_file_size=1000000;
		$max_file_width=240;
		$destinationPath = public_path().'/upload/avatar'; //upload path

		$funcNum = Input::get('CKEditorFuncNum');
	    $CKEditor = Input::get('CKEditor');
	    $langCode = Input::get('langCode');
	    $file = Input::file('imgFile');
	    $file_ext = FjjUtils::get_extension($file->getClientOriginalName());
	    $url = '';
	    
	    if($max_file_size < filesize($file)){
	    	$message = "上传失败!图片大小必须小于1M";
			return array('error' => 1, "message" => $message);
	    }else{
	    	if(!in_array($file_ext, $uptypes)){
				$message = "上传格式错误！必须是png,jpg,bmp,gif格式的文件";
	    		return array('error' => 1, "message" => $message);
	    	}else{
	    		if(FjjUtils::mkdirs($destinationPath)){
			    	$chars = md5(uniqid(mt_rand(), true));
			    	$time=time();
			    	$filename=$time.$chars."_origin.".$file_ext;
			    	if(move_uploaded_file($file,$destinationPath."/".$filename)){
			    		//create thumb img
			    		$image = new Imagick($destinationPath."/".$filename);
			    		$imageWidth=$image->getImageWidth();
			    		if($imageWidth>$max_file_width){
			    			$image->thumbnailImage($max_file_width, 0);
			    		}
			    		$image->writeImage("./upload/avatar/".$filename);
			    		return array('error' => 0, "url" => $time.$chars,"title" => $filename,"width" => $time.$chars);
			    	}
			    }
	    	}
		}
	}

}