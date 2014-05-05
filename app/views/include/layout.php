<script type="text/javascript">
var contextPath="<?php echo URL::to('/'); ?>";
var contextDeployPath="<?php echo URL::to('/'); ?>";
</script>

<?php
echo HTML::style('assets/css/bootstrap.min.css');
echo HTML::style('assets/css/bootstrap-combined.no-icons.min.css');
echo HTML::style('assets/css/font-awesome.css');
echo HTML::style('assets/css/icheck/skins/minimal/minimal.css');
echo HTML::style('thirdparty/message/css/messenger.css');
echo HTML::style('thirdparty/message/css/messenger-theme-future.css');
echo HTML::style('assets/js/themes/default/default.css');
echo HTML::style('thirdparty/Jcrop/css/jquery.Jcrop.css');
echo HTML::style('assets/Buttons-master/css/buttons.css');
echo HTML::style('thirdparty/artDialog/skins/default.css');
echo HTML::style('assets/css/base.css');
echo HTML::style('assets/css/application.css');
echo HTML::style('thirdparty/ckeditor/plugins/syntaxhighlight/styles/shCoreDefault.css');

echo HTML::script('assets/js/jquery.min.js');
echo HTML::script('assets/js/bootstrap.min.js');
echo HTML::script('thirdparty/message/js/messenger.min.js');
echo HTML::script('assets/js/angular.min.js');
echo HTML::script('thirdparty/Jcrop/jquery.Jcrop.js');
echo HTML::script('assets/Buttons-master/js/buttons.js');
echo HTML::script('thirdparty/artDialog/artDialog.js');
echo HTML::script('thirdparty/ckeditor/ckeditor.js');
echo HTML::script('thirdparty/ckeditor/plugins/syntaxhighlight/scripts/shCore.min.js');
echo HTML::script('thirdparty/ckeditor/plugins/syntaxhighlight/scripts/shAutoloader.js');
echo HTML::script('assets/app_main/directives.js');
echo HTML::script('assets/app_main/services.js');
echo HTML::script('assets/app_main/controller.js');
?>
