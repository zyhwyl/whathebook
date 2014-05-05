var app = angular.module("whathebook",['whathebook.services','whathebook.directives','ngRoute','ngSanitize']);
//全局锁 可用于一些重复提交的操作
var twice_lock=false;

/*route*/
app.config(['$routeProvider','$sceProvider','$locationProvider',function($routeProvider,$sceProvider,$locationProvider){
	$routeProvider
		.when('/',{
			controller:'indexCtrl',
			template:"<div ng-controller='indexCtrl'></div>"
		})
	$locationProvider.html5Mode(true);
}]);

/*controller*/
app.controller('indexCtrl',function($location){
	
})

/*filter*/
app.filter('checkgender', function() {
	return function(user) {
		user = user || "";
		if(user.gender=="1"){
			return '男';
		}else{
			return '女';
		}
	};
});

app.filter('trustAsHtml',['$sce',function($sce) {
	return function(input) {
		return $sce.trustAsHtml(input);
	};
}]);

app.filter('numFilter',function() {
	return function(input) {
		return parseInt(input);
	};
});

function postError(){
	$.globalMessenger().post({message:"error:提交异常!!",hideAfter: 3,hideOnNavigate: true});
}
