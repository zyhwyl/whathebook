<header class="navbar navbar-inverse navbar-fixed-top bs-docs-nav" role="banner">
  <div class="container">
    <div class="navbar-header">
      <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a href="{{URL::to('/')}}" class="navbar-brand">复唧唧--学习编程之道</a>
    </div>
    <nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">
      <ul class="nav navbar-nav">
        <li class="active">
          <a href="{{URL::to('/')}}">首页</a>
        </li>
        <li>
          <a href="{{URL::to('/course/list')}}">课程目录</a>
        </li>      
        <li>
	      @if($user!=null)
		  		<a href="#">欢迎登录：{{$user->name}}</a>
		  	@else
  		  {{link_to_action('UserController@getRegister', $title="注册", 
  				$parameters = array(), $attributes = array("class"=>"btn btn-default head_btn"))}}
  			{{link_to_action('UserController@getLogin', $title="登录", 
  				$parameters = array(), $attributes = array("class"=>"btn btn-default head_btn"))}}
  			@endif
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li>
          <a href="{{URL::to('/	')}}">关于</a>
        </li>
      </ul>
    </nav>
  </div>
</header>