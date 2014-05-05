var directives = angular.module("fjj.directives",["fjj.services"]);

directives.directive('clickDisable',function(){
	return {
		restrict: 'A',
		link:function(scope,element,attrs){
			scope.setDisabled=function(status,btn){
				if(status){
					$(btn).button("loading");
				}else{
					$(btn).button("reset");
				}
			}
		}
	}
});

directives.directive('clearTextarea',function(){
	return {
		restrict: 'A',
		link:function(scope,element,attrs){
			scope.clearTextarea=function(textarea){
				$(textarea).val("");
				$(textarea).html("");
			}
		}
	}
});

directives.directive('contentFresh',function(){
	return {
		restrict: 'A',
		link:function(scope,element,attrs){
			scope.setFresh=function(status,btn){
				if(status){
					$(btn).removeClass("hide");
				}else{
					$(btn).addClass("hide");
					$(btn).siblings().removeClass("hide");
				}
			}
		}
	}
});

directives.directive('progressBar',function(){
	return {
		restrict: 'A',
		link:function(scope,element,attrs){
			//初始化当前状态
			$(element).css("width",attrs.progressBar+"%");
			$(element).attr("title","已完成"+attrs.progressBar+"%");

			scope.setProgress=function(nubmer){
				$(element).css("width",nubmer+"%");
				$(element).attr("title","已完成"+nubmer+"%");
			}
		}
	}
});

directives.directive('iCheckCom',function(){
	return {
		restrict: 'A',
		link:function(scope,element,attrs){
			$(element).iCheck({
				checkboxClass: 'icheckbox_minimal',
				radioClass: 'iradio_minimal',
				increaseArea: '20%' // optional
			});
		}
	}
});

directives.directive('notificatDir',function($http,Course){
	return {
		restrict: 'A',
		link:function(scope,element,attrs){
			scope.show_message_load=true;
			$element=$(element);
			setTimeout(function(){
				$http.get(contextDeployPath+"/users_i/getNotify").success(function(data){
					if(data.length>0){
						$element.children(".notify_count").text(data.length);
						$element.children(".notify_count").addClass("notification");
						scope.messageList=data;
					}else{
						$element.children(".notify_count").text(data.length);
						scope.messageList=data;
					}
					scope.show_message_load=false;
				});
			},100);
			scope.setNotifyStatus=function($index,status){
				var id=scope.messageList[$index].id;
				$http.post(contextDeployPath+"/users/notifystatus/"+id,{status:status}).success(function(data){
					if(data.ret==1){
						scope.messageList.splice($index,1);
						console.log($element);
						$element.children(".notify_count").text(scope.messageList.length);
						if(scope.messageList.length==0)
							$element.children(".notify_count").removeClass("notification");
					}
				});
			};
		}
	};
});

directives.directive('taskCompleteChecked',function(){
	return {
		restrict: 'A',
		link:function(scope,element,attrs){
			var task_id=attrs.taskCompleteChecked.split(",")[0];
			var task_content_id=attrs.taskCompleteChecked.split(",")[1];
			var task_content_complete=attrs.taskCompleteChecked.split(",")[2];
			//初始化当前checkbox
			if(task_content_complete==1)
				$(element).iCheck('check');
			$(element).on('ifChecked', function(event){
				scope.task_content.is_complete=true;
				scope.taskComplete(task_id,task_content_id,1,$("[name='task_complete']"));
				$("[name='task_complete']").iCheck('disable');
			});
			$(element).on('ifUnchecked', function(event){
				scope.task_content.is_complete=false;
				scope.taskComplete(task_id,task_content_id,0,$("[name='task_complete']"));
				$("[name='task_complete']").iCheck('disable');
			});
		}
	};
});

directives.directive('toolTip',function(){
	return {
		restrict: 'A',
		link:function(scope,element,attrs){
			$(element).attr("title",attrs.toolTip);
			$(element).tooltip();
		}
	};
});

// 图片上传部分
directives.directive('uploadPhotoBtn',function() {
	var jcrop_api, boundx, boundy;
	function updatePreview(c){
	  if (parseInt(c.w) > 0){
	    var rx = 60 / c.w;
	    var ry = 60 / c.h;

	    $('#preview').css({
	      width: Math.round(rx * boundx) + 'px',
	      height: Math.round(ry * boundy) + 'px',
	      marginLeft: '-' + Math.round(rx * c.x) + 'px',
	      marginTop: '-' + Math.round(ry * c.y) + 'px'
	    });  
	  }
	  $('#x').val(c.x);
	  $('#y').val(c.y);
	  $('#w').val(c.w);
	  $('#h').val(c.h); 
	};
    return function(scope, element, attr) { 
    	var K=KindEditor;
    	var editor = K.editor({
			allowFileManager : true,
			uploadJson : contextDeployPath+'/users/photoupload'
		});
		K('#upload_btn').click(function() {
			editor.loadPlugin('image', function() {
				editor.plugin.imageDialog({
					showRemote : false,
					imageUrl : "",
					clickFn : function(url, title, width, height, border, align) {
						editor.hideDialog();
						scope.imgUpload(title);
						scope.user.photo_name=width;
						$("#avatar_preview").attr("src",contextPath+"/upload/avatar/"+title);
						$(".preview").show();
						$("#preview").attr("src",contextPath+"/upload/avatar/"+title);
						$('#avatar_preview').Jcrop({
							onChange: updatePreview,
							onSelect: updatePreview,
							aspectRatio: 1,
							bgFade:true,
							bgOpacity: .5,
							setSelect: [0,0,60,60] 
					    },function(){
							// Use the API to get the real image size
							var bounds = this.getBounds(); 
							boundx = bounds[0];
							boundy = bounds[1];
							// Store the API in the jcrop_api variable
							jcrop_api = this;
							jcrop_api.ui.holder.addClass('jcrop-light');
					    });
					}
				});
			});
		});
    };
});

directives.directive('hoverBtn',function(){
	return {
		restrict: 'A',
		link:function(scope,element,attrs){
			$(element).mouseover(function(){
				$(this).children(".task_content_list_li_content")
					.children("."+attrs.hoverBtn)
					.removeClass("hide");
			}).mouseout(function(){
				$(this).children(".task_content_list_li_content")
					.children("."+attrs.hoverBtn).addClass("hide");
			});
		}
	}
});

directives.directive('fjjBindHtmlUnsafe',function() {
    return function(scope, element, attr) {
       	element.html(attr.fjjBindHtmlUnsafe || '');
       	if(attr.watch){
       		scope.$watch(attr.watch,function(newValue,oldValue){
       			element.html(newValue);
       		});
       	}
       	if(attr.syntaxlight){
       		SyntaxHighlighter.loadScript("/thirdparty/ckeditor/plugins/syntaxhighlight/load_syntaxhighlighter.js");
       	}
    }
});

directives.directive('fjjBindHtmlPreview',function() {
    return function(scope, element, attr) {
    	var str=attr.fjjBindHtmlPreview;
    	if($.trim(str.replace(/<[^>]*>/g,""))!=""){
    		var preview_content=$.trim(str.replace(/<[^>]*>/g,""));
    		var count=attr.count;
    		if(preview_content.length>count){
    			preview_content=preview_content.substring(0,count)+"...";
    		}
    		element.html(preview_content);
    	}else{
    		str.replace("onclick","");
    		element.html(str || '');
    	}
       	if(attr.watch){
       		scope.$watch(attr.watch,function(newValue,oldValue){
       			if($.trim(newValue.replace(/<[^>]*>/g,""))!=""){
		    		var preview_content=$.trim(newValue.replace(/<[^>]*>/g,""));
		    		var count=attr.count;
		    		if(preview_content.length>count){
		    			preview_content=preview_content.substring(0,count)+"...";
		    		}
		    		element.html(preview_content);
		    	}else{
		    		newValue.replace("onclick","");
		    		element.html(newValue || '');
		    	}
       		});
       	}
       	if(attr.syntaxlight){
       		SyntaxHighlighter.loadScript("/thirdparty/ckeditor/plugins/syntaxhighlight/load_syntaxhighlighter.js");
       	}
    }
});

directives.directive('fjjBindHtmlActive',function() {
    return function(scope, element, attr) {
    	scope.injectHtml=function(html){
    		element.html(html || '');
    		if(attr.syntaxlight){
	       		SyntaxHighlighter.loadScript("/thirdparty/ckeditor/plugins/syntaxhighlight/load_syntaxhighlighter.js");
	       	}
    	}
    }
});

/**
*  the page change animate 
*
*/
directives.directive('butterBar',function($rootScope,$location){
	return {
		restrict: 'A',
		link:function(scope,element,attrs){
			$rootScope.$on('$routeChangeStart',function(){
				element.removeClass("hide");
			});

			$rootScope.$on('$routeChangeSuccess',function(){
				element.addClass("hide");
			});
		}
	}
});

/**
*  the main page top navigation
*
*/
directives.directive('mainTopNav',function($rootScope,$location){
	/**
	* get the navigation param
	* 
	* @return navi strategy   
	*/
	var storage = window.localStorage;
	var rootNaviContext = function($location,$this){
		var path=$location.$$path;
		var param = path.split("/");
		switch(param[1]){
			case "index":
				naviStrategy.hideAll($this);
				break;
			case "coursecontent":
				naviStrategy.showCourseList($this);
				storage["course_id"]=param[2];
				break;
			case "unitscontent":
				naviStrategy.showUnitList($this,param[3]);
				storage["unit_id"]=param[2];
				break;
			case "taskcontent":
				naviStrategy.showTaskList($this,param[3]);
				storage["task_id"]=param[2];
				break;
			case "taskdiscuslist":
				naviStrategy.showTaskContent($this,param[3]);
				break;
		}
	}

	var naviStrategy = {
		hideAll:function($this){
			$this.children().addClass("hide");
		},
		showCourseList:function($this){
			this.hideAll($this);
			naviStrategyCourseList.show($this);
		},
		showUnitList:function($this,course_id){
			this.hideAll($this);
			naviStrategyCourseList.show($this);
			naviStrategyUnitList.show($this,course_id);
		},
		showTaskList:function($this,course_id,unit_id){
			unit_id=unit_id || storage["unit_id"];
			this.hideAll($this);
			naviStrategyCourseList.show($this);
			naviStrategyUnitList.show($this,course_id);
			naviStrategyTaskList.show($this,course_id,unit_id);
		},
		showTaskContent:function($this,course_id,task_id){
			task_id=task_id || storage["task_id"];
			naviStrategyCourseList.show($this);
			naviStrategyUnitList.show($this,course_id);
			naviStrategyTaskList.show($this,course_id,storage["unit_id"]);
			naviStrategyTaskContent.show($this,course_id,task_id);
		}
	}

	var naviStrategyCourseList = {
		show:function($this){
			$this.children("#course_list").removeClass("hide");
		},
		hide:function($this){
			$this.children("#course_list").addClass("hide");
		}
	}

	var naviStrategyUnitList = {
		show:function($this,course_id){
			$this.children("#unit_list").removeClass("hide").attr("href","#/coursecontent/"+course_id);
		},
		hide:function($this){
			$this.children("#unit_list").addClass("hide");
		}
	}

	var naviStrategyTaskList = {
		show:function($this,course_id,unit_id){
			$this.children("#task_list").removeClass("hide").attr("href","#/unitscontent/"+unit_id+"/"+course_id);
		},
		hide:function($this){
			$this.children("#task_list").addClass("hide");
		}
	}

	var naviStrategyTaskContent = {
		show:function($this,course_id,task_id){
			$this.children("#task_content").removeClass("hide").attr("href","#/taskcontent/"+task_id+"/"+course_id);
		},
		hide:function($this){
			$this.children("#task_content").addClass("hide");
		}
	}

	return {
		restrict: 'A',
		link:function(scope,element,attrs){
			$rootScope.$on('$routeChangeSuccess',function(){
				rootNaviContext($location,$(element));
			});
		}
	}
});

directives.directive('shadowAnimatePanel',function($rootScope){
	return {
		restrict: 'A',
		link:function(scope,element,attrs){
			$(element).mouseover(function(){
				$(this).stop().animate({boxShadow: '0 0 15px #999'});
			}).mouseout(function(){
				$(this).stop().animate({boxShadow: '0 0 0 #999'});
			});
		}
	}
});

directives.directive('artDialogCourseApply',function(Course){
	return {
		restrict: 'A',
		link:function(scope,element,attrs){
			var course_id=scope.course.id;

			var html=[
				'<div class="apply_course_wrap">',
			    	'<span>'+scope.course.course_ext.question+'</span>',
			    	'<textarea placeholder="填写申请说明..." id="applyContent'+course_id+'" class="form-control" 	ng-model="course.answer" rows="3"></textarea>',
			    	'<b data-loading-text="wait..." class="btn btn-default btn-block" id="applyCourse'+course_id+'">提交</b>',
					'<div class="clear"></div>',
			    '</div>'
			];

			element.click(function(){
				var dialog=art.dialog({
					title:"请回答下面的问题	",
					lock: true,
				    background: '#000', // 背景色
				    opacity: 0.5,	// 透明度
				    drag: false,
    				resize: false,
				    content: html.join("")
				});
				//提交事件绑定
				$("#applyCourse"+course_id).unbind("click");
				$("#applyCourse"+course_id).click(function(){
					var content=$("#applyContent"+course_id).val();
					if($.trim(content)!=""){
						$(this).button("loading");
						Course.applyCourse(course_id,content).success(function(data){
							if(data.ret==1){
								scope.course.is_apply=true;
								scope.course.show_apply=false;
								dialog.close();
							}
							$.globalMessenger().post({message:data.message,hideAfter: 3,hideOnNavigate: true});
							$(this).button("reset");
						});
					}
				});
			});
		}
	}
});

directives.directive('artDialog',function(){
	return {
		restrict: 'A',
		link:function(scope,element,attrs){
			element.click(function(){
				var html=[
							'<h4>'+scope.course.name+'</h4>',
							scope.course.desc];
				art.dialog({
					title:"课程预览",
					lock: true,
				    background: '#000', // 背景色
				    opacity: 0.5,	// 透明度
				    zIndex:99999999,
				    content: html.join(""),
				    width:attrs.artWidth || ''
				});
			});
		}
	}
});

directives.directive('userPhoto',function(){
	return {
		restrict: 'E',
		template: "<img />",
		replace:true,
		link: function(scope,element,attrs) {
			var path="";
			if($.trim(attrs.path)!="")
				path=contextPath+"/upload/avatar/"+attrs.path+"_thumb.jpg";
			else
				path=contextPath+"/assets/img/user_photo.jpg";
			$(element).attr("src",path)
			$(element).css("width",attrs.size+"px");
			if(attrs.pathWatch){
				scope.$watch(attrs.pathWatch,function(newValue,oldValue) {
					var new_path="";
					if($.trim(newValue)!=="")
						new_path=contextPath+"/upload/avatar/"+newValue+"_thumb.jpg";
					else
						new_path=contextPath+"/assets/img/user_photo.jpg";
					$(element).attr("src",new_path)
	            });
			}
		}
	};
});

directives.directive('loadingImg',function(){
	return {
		restrict: 'E',
		template: "<img src='"+contextPath+"/assets/img/loading2.gif"+"' />",
		replace:true,
		compile: function compile(tElement, tAttrs, transclude) {
			return {
				pre: function(scope, iElement, iAttrs) {
				},
				post: function(scope, iElement, iAttrs) {
					$(iElement).addClass("hide");
					scope.setLoadingImgHide=function(status){
						if(status){
							$("#"+iAttrs.id).addClass("hide");
						}else{
							$("#"+iAttrs.id).removeClass("hide");
						}
					}
				}
			}
		}
	}
});

directives.directive('modalPart',function(){
	return {
		restrict: 'EA',
		templateUrl: contextPath+'/template/static/modal.html',
		replace:true,
		link:function(scope,element,attrs){
			var _modal_content=$(element).children(".modal-dialog").children(".modal-content");
			_modal_content.children(".modal-header").children(".modal-title").html(attrs.mTitle);
			_modal_content.children(".modal-body").html(attrs.mContent);
		}
	};
});

//教师顶部导航
directives.directive('tTopNav',function(){
	var template_html=[
		'<ul class="nav nav-tabs">',
			'<li>&nbsp;</li>',
			'<li id="discus_item"><a href="#/t/coursecontent/{{courseId}}/discus">最新讨论</a></li>',
			'<li id="assignment_item"><a href="#/t/coursecontent/{{courseId}}/assignment">最新作业</a></li>',
			'<li id="complete_item"><a href="#/t/coursecontent/{{courseId}}/complete">完成进度</a></li>',
			'<li id="student_item"><a href="#/t/coursecontent/{{courseId}}/student">我的学生</a></li>',
		'</ul>'
	];
	return {
		restrict: 'E',
		template: template_html.join(""),
		replace:true,
		link:function(scope,element,attrs){
			$("#"+attrs.selected+"_item").addClass("active");
		}
	};
});

directives.directive('ckEditor',function($rootScope){
	return {
		restrict: 'E',
		template: "<textarea></textarea>",
		replace:true,
		link:function(scope,element,attrs){
			if(attrs.noDelay){
				$(element).val(attrs.content);
				$(element).ckeditor({
					toolbar:[
					    { name: 'basicstyles', items: ['Format','Bold'] },
					    { name: 'colstyles', items: ['NumberedList','BulletedList','Blockquote'] },
					    { name: 'mediastyles', items: ['Image','HorizontalRule','Link','Syntaxhighlight'] }
					]
				});
			}else{
				setTimeout(function(){
					$(element).val(attrs.content);
					$(element).ckeditor({
						toolbar:[
						    { name: 'basicstyles', items: ['Format','Bold'] },
						    { name: 'colstyles', items: ['NumberedList','BulletedList','Blockquote'] },
						    { name: 'mediastyles', items: ['Image','HorizontalRule','Link','Syntaxhighlight'] }
						]
					});
				},1500);
			}
		}
	};
});

//kindeditor缓存
// var editor={};
// directives.directive('kindEditor',function(){
// 	return {
// 		restrict: 'E',
// 		template: '<textarea></textarea>',
// 		replace:true,
// 		link:function(scope,element,attrs){
// 			scope.$watch(attrs.watch,function(newValue,oldValue) {
// 				if(newValue){
// 					editor[newValue]= KindEditor.create(element,{
// 						shadowMode:true,
// 						width:660,
// 						themeType : 'simple',
// 						height:230,
// 						resizeType : 1,
// 						allowPreviewEmoticons : false,
// 						allowImageUpload : true,
// 						uploadJson : '',
// 						resize:false,
// 						items : [
// 							'formatblock','|','bold','italic', 'underline','|', 
// 							'insertorderedlist','insertunorderedlist','|','image','code','|','hr','link']
// 					});
// 					if(attrs.content){
// 						editor[newValue].html(attrs.content);
// 					}
// 				}
// 			});
// 			scope.getEditor=function(id){
// 				return editor[id];
// 			}
// 		}
// 	}
// });

// directives.directive('bootstrapEditor',function(){
// 	return {
// 		restrict: 'EA',
// 		templateUrl: contextPath+'/template/static/editor.html',
// 		replace:true,
// 		link:function(scope,element,attrs){
// 			var _id=attrs.id;
// 			var alerts=$(element).children('.alerts');
// 			$(element).children(".btn-toolbar").children(".btn-group").each(function(){
// 				if($(this).children(".picture-btn")){
// 					$(this).children(".picture-btn").siblings().attr("data-target","#"+_id);
// 				}
// 			});
// 			function initToolbarBootstrapBindings(){
// 				$('a[title]').tooltip({container:'body'});
// 				$('.dropdown-menu input').click(function() {return false;})
// 				    .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
// 					.keydown('esc', function () {this.value='';$(this).change();});
// 				$(".picture-btn").unbind("click")
// 				$(".picture-btn").click(function(){
// 					$(this).siblings().click();
// 				});
// 			};
// 			function showErrorAlert(reason, detail){
// 				var msg='';
// 				if (reason==='unsupported-file-type') { msg = "Unsupported format " +detail; }
// 				else {
// 					console.log("error uploading file", reason, detail);
// 				}
// 				$('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+ 
// 				  '<strong>File upload error</strong>'+msg+'</div>').prependTo(alerts);
// 			};
// 			initToolbarBootstrapBindings();
// 			$(element).children('.bootstrap-editor').wysiwyg({fileUploadError:showErrorAlert});
// 			$(element).children('.bootstrap-editor').attr("id",_id);
// 		}
// 	};
// });
