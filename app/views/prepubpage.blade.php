<!doctype html>
<html lang="en" ng-app>
<head>
    <meta charset="UTF-8">
    <title>复唧唧 | 学习编程便捷之道</title>
    <link rel="icon" type="image/png" href="{{URL::to('/')}}/assets/img/logo/favicon-big-x2.ico">
    <meta name="KEYWORDS" content="复唧唧,编程,学习,计算机">
	<meta name="DESCRIPTION" content="复唧唧 - 一个在线学习编程的更好的工具" >

    {{ HTML::style('assets/css/bootstrap.min.css') }}
    {{ HTML::style('assets/Buttons-master/css/buttons.css') }}
    {{ HTML::script('assets/Buttons-master/js/buttons.js') }}
    {{ HTML::script('assets/js/jquery.min.js') }}
    {{ HTML::style('thirdparty/artDialog/skins/idialog.css') }}
    {{ HTML::script('thirdparty/artDialog/artDialog.js') }}
    {{ HTML::script('thirdparty/artDialog/artDialog.source.js') }}
    {{ HTML::script('assets/js/bootstrap.min.js') }}

    <style type="text/css">
		body{background:green no-repeat;background-size: 100%;background-attachment:fixed;
			background-image:url(<?php echo URL::to('/');?>/assets/img/back/1.jpg);
			font-family:微软雅黑,宋体，arial，tahoma，helvetica;}
    	em{font-size:14px;}
    	.center_font{width:700px;padding:2.8% 0 35px 0;text-align:center;margin:0 auto;}
    	.logo-img{float: left;margin:10px 0 0 20px;width:38px;}
    	.clear{clear:both;}
    	.bottom{text-align:center;width:100%;padding:20px 0 0 0;color:#fff;}
    	.line{width:700px;border-top:solid 1px rgba(0,0,0,0.13);border-bottom:solid 1px rgba(255,255,255,0.7);margin:0 auto;}
    	.button-flat-primary:hover{text-decoration:none;color:#fff;}
    	a:hover{text-decoration:none;}
    	.email_input{padding:0 10px;font-size:20px;float:left;width:425px;
    			border-radius:0px;height:52px;_height:50px;}
    	#backgroungimg{position:absolute;left:0;top:0;z-index:-1;width:100%;height:100%;overflow:hidden;}
    	.loading_img{position:absolute;bottom:10px;right:20px;}
    	.progress{position:fixed;bottom:0px;height:5px;background:#eee;left:0;width:100%;z-index:5;margin:0;}
    	.progress span{height:100%;width:0%;background:green;display:block;}
    	.fjj_blog:hover{text-decoration:underline;}
    	.message{margin:0 auto;width:30%;position:absolute;top:10px;left:35%;text-align:center;}
    	.hide{display:none;}
    </style>
    <script type="text/javascript">
    	$(function(){
    		$("#submit").click(function(){
    			var email=$("#email").val();
    			var $this=$(this);
    			$this.button("loading");
    		});
    		loadImage("http://farm8.staticflickr.com/7450/8731118369_297aa1fb93_h.jpg",function(){
    			var src="url("+$(this).attr("src")+")";
    			$("#backgroungimg").css("background-image",src).hide().fadeIn();
    			$(".loading_img").hide();
    		});

    	});
    	function loadImage(url, callback) {
		    var img = new Image(); //创建一个Image对象，实现图片的预下载
		    img.src = url;
		    var progress=15;
		   
		    if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
		        callback.call(img);
		        $(".progress").children("span").css("width","100%");
		        $(".progress").fadeOut();
		        return; // 直接返回，不用再处理onload事件
		    }
		    var load=setInterval(function(){
		    	progress++;
		    	if(progress>80){
		    		clearInterval(load);
		    	}
		    	$(".progress").children("span").css("width",progress+"%");
		    },300);
		    img.onload = function () { //图片下载完毕时异步调用callback函数。
		    	console.log(img.complete);
		        callback.call(img);//将回调函数的this替换为Image对象
		        clearInterval(load);
		        $(".progress").children("span").css("width","100%");
		        $(".progress").fadeOut();
		    };
		};
	</script>
</head>
<body>
	<div id="backgroungimg"></div>
	<div class="progress">
		<span></span>
	</div>
	<a href="" title="复唧唧 | 学习编程便捷之道">
		<img src="<?php echo URL::to('/');?>/assets/img/logo/logo.png" class="logo-img">
	</a>
	<div class="clear"></div>
	<div class="center_font" style="padding-top:6.8%;">
		<a href="" style="position:relative;top:-19px;" title="复唧唧 | 学习编程便捷之道">
			<img src="<?php echo URL::to('/');?>/assets/img/logo/logo-font.png">
		</a>
		<br><br>
		<span style="line-height:1.5em;font-size:16px;color:#fff;">
			计算机编程是一种人类的智力活动。正确地学习计算机编程意味着既要学习技术<br>
			（编程语言和工具），也要学习科学（基本理论和概念）。<br>
			没有了技术，编程就是纯粹的数学活动；没有了科学，缺失必要的理解，<br>
			编程就变成了一门手艺。
		</span>
	</div>
	<div class="line"></div>
	<div class="center_font" style="padding-left:69px;padding-bottom:40px;">
		<form id="mc-form" >
			<input id="email" type="email" class="form-control email_input" placeholder="输入你的邮箱" 
					style="" />
			<button type="button" class="button button-flat-primary" data-loading-text="正在处理" id="submit"
					style="height:52px;float:left;font-size:20px;padding-top:3px;font-weight:bold;">现在订阅</button>
			<div class="clear"></div>
		</form>
	</div>
	<div class="message">
		<div class="alert alert-success hide" id="success">
			<img src="{{URL::to('/')}}/thirdparty/artDialog/skins/icons/face-smile.png">
			恭喜你，订阅成功，请到你的邮箱确认订阅！</div>
		<div class="alert alert-danger hide" id="wrong1">
			<img src="{{URL::to('/')}}/thirdparty/artDialog/skins/icons/face-sad.png">
			订阅失败！你的邮箱已经订阅过了...</div>
		<div class="alert alert-danger hidden" id="wrong2">
			<img src="{{URL::to('/')}}/thirdparty/artDialog/skins/icons/face-sad.png">
			订阅失败！请填写正确的邮箱地址...</div>
	</div>
	<div class="line"></div>
	<div class="bottom">CopyRight @复唧唧 2013  All rights reserved.<br>
		Updated on 2013-12-30. <a href="http://blog.lwall.net" style="color:#fff;" class="fjj_blog">复唧唧blog</a>
	</div>
</body>
</html>
