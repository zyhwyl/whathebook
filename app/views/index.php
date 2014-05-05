<!doctype html>
<html lang="en" ng-app="whathebook">
<head>
  <meta charset="UTF-8">
  <title>什么书-－人人都是作者 WhaTheBook</title>
	<?php include 'include/layout.php'; ?>
</head>
<body>
	<div butter-bar ng-class="hide" class="butter_bar"><i class="icon-refresh icon-spin icon-2x"></i></div>
	<!--top-->
	<div class="main_top shadow_all">
	
	</div>
	<!--top end-->
	<!--main content-->
	<div class="front_main_content">
		<div class="front_body">
			<div ng-view></div>
		</div>
	</div>
	<div class="clear"></div>
	<!--main content end-->
	<div class="front_main_foot">
	</div>

</body>
</html>
