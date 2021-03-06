@extends('frontend.layouts.master')

@section('after-styles-end')
<link rel="stylesheet" href="/css/schools/form.css">
<link rel="stylesheet" href="/css/schools/main.css">
<link rel="stylesheet" href="/css/schools/nagoya-u.css">
@endsection

@section('content')
<!-- header section -->
<header id="header" class="fixed">
  <div class="header-content clearfix">
    <a class="logo" href="/"><img height="60" src="/images/logo.png" alt=""></a> 
    <!-- navigation section  -->
    <nav class="navigation" role="navigation">
      <ul class="primary-nav">
        <li><a href="#">{{$name}}</a></li>
      </ul>
    </nav>
    <a href="#" class="nav-toggle">Menu<span></span></a>
  </div>
  <!-- navigation section  --> 
</header>

<!-- header section --> 
<div class="school-bg" style="background-image: url({{$image_path}});">
    <div class="container">
        <div class="card card-container">
            @include('includes.partials.messages')
            <img id="profile-img" class="profile-img-card" src="{{$logo_path}}" />
            <p id="profile-name" class="profile-name-card"></p>
            <form class="form-signin" method="POST" action="/{{$connection}}/signin">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="email" name="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required>
                <div id="remember" class="checkbox">
                    <label>
                        <input type="checkbox" name="remember" value="remember-me"> Remember me
                    </label>
                </div>
                <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">Sign in</button>
            </form><!-- /form -->
            <a href="/{{$connection}}/password/reset" class="forgot-password">パスワードを忘れた</a>
            <div class="center-block">
                <a href="/{{$connection}}/signup" class="toSignup">新規登録</a>            
            </div>  
        </div><!-- /card-container -->
    </div><!-- /container -->
</div>
@endsection

@section('after-scripts-end')

@stop