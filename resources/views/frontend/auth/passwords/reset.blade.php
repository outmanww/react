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
    <a class="logo" href="/"><img src="/images/logo.png" alt=""></a> 
    <!-- navigation section  -->
    <nav class="navigation" role="navigation">
      <ul class="primary-nav">
        <li><a href="#">名古屋大学</a></li>
      </ul>
    </nav>
    <a href="#" class="nav-toggle">Menu<span></span></a>
  </div>
  <!-- navigation section  --> 
</header>
<!-- header section --> 

<div class="container">
    <div class="card card-container">
        <img id="profile-img" class="profile-img-card" src="/images/schools/nagoya-u-logo.png" />
        <p id="profile-name" class="profile-name-card"></p>
        <form class="form-signin" method="POST" action="/nagoya-u/password/reset">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="email" name="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
            <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required>
            <input type="password" name="password_confirmation" id="inputPassword" class="form-control" placeholder="Password Confirmation" required>
            <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">
                {{trans('labels.frontend.passwords.reset_password_button')}}
            </button>
        </form><!-- /form -->
    </div><!-- /card-container -->
</div><!-- /container -->
@endsection

@section('after-scripts-end')

@stop

