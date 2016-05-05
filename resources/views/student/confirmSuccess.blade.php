@extends('frontend.layouts.master')

@section('after-styles-end')
<link rel="stylesheet" href="/css/top/responsive.css">
<link rel="stylesheet" href="/css/top/line-icon.css">
<link rel="stylesheet" href="/css/top/main.css">
@endsection

@section('content')
<!-- header section -->
<header id="header" class="fixed">
  <div class="header-content clearfix">
    <a class="logo" href="/"><img height="60" src="/images/logo.png" alt=""></a> 
    <!-- navigation section  -->
    <nav class="navigation" role="navigation">
      <ul class="primary-nav">
        <li><a href="/">Top</a></li>
      </ul>
    </nav>
    <a href="#" class="nav-toggle">Menu<span></span></a>
  </div>
  <!-- navigation section  --> 
</header>

<section class="slice">
<div class="w-section inverse">
<div class="container">
  <div class="row" style="margin: 100px 0 50px;">
    <div class="col-md-12">
      <div class="text-center">
        <h2>メールアドレス確認</h2>
        <br/>
        <p>{{$message}}</p>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-9 col-md-offset-2">
      
    </div>
  </div>
</div>
</div>
</section>

@include('frontend.includes.footer')

@endsection

@section('after-scripts-end')
    <script src="/js/top/jquery.subscribe.js"></script> 
    <script src="/js/top/jquery.contact.js"></script> 
@stop