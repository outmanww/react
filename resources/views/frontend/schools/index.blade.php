@extends('frontend.layouts.master')

@section('after-styles-end')
<link rel="stylesheet" href="/css/schools/main.css">
<link rel="stylesheet" href="/css/schools/responsive.css">
@endsection

@section('content')
<!-- header section -->
<header id="header" class="fixed">
  <div class="header-content clearfix">
    <a class="logo" href="#"><img src="images/logo.png" alt=""></a> 
    <!-- navigation section  -->
    <nav class="navigation" role="navigation">
      <ul class="primary-nav">
        <li><a href="#">名古屋大学にログイン中</a></li>
      </ul>
    </nav>
    <a href="#" class="nav-toggle">Menu<span></span></a>
  </div>
  <!-- navigation section  --> 
</header>
<!-- header section --> 

<!-- Intro Section -->
<section id="introduction" class="section introduction">
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-sm-6">
        <div class="intro-content">
          <h1>I do... What I love to do...</h1>
        </div>
      </div>
      <div class="col-md-5 col-sm-6">
        <div class="intro-content">
          <p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam quis risus eget urna mollis ornare vel eu leo.</p>
          <p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam quis risus eget urna mollis ornare vel eu leo. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. </p>
        </div>
      </div>
      <div class="col-md-3 col-sm-6">
        <div class="intro-content">
          <h4>my expertise</h4>
          <ul>
            <li> - web design and development</li>
            <li> - corporate identity</li>
            <li> - Digital marketing</li>
            <li> - Promotion material</li>
            <li> - Branding</li>
            <li> - UX Strategy</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- Intro Section --> 
<!-- work section -->
<section id="works" class="works section no-padding">
  <div class="container-fluid">
    <div class="row no-gutter">
      <div class="col-lg-2 col-md-4 col-sm-4 work">
        <a href="/nagoya-u/signin" class="work-box">
          <img src="/images/schools/nagoya-u-logo.png" alt="">
          <div class="overlay">
            <div class="overlay-caption">
              <p>名古屋大学</p>
            </div>
          </div>
        <!-- overlay --> 
        </a>
      </div>
      <div class="col-lg-2 col-md-4 col-sm-4 work"> <a href="/images/schools/work-2.jpg" class="work-box"> <img src="/images/schools/work-2.jpg" alt="">
        <div class="overlay">
          <div class="overlay-caption">
            <p><i class="fa fa-search-plus fa-2x"></i></p>
          </div>
        </div>
        <!-- overlay --> 
        </a> </div>
      <div class="col-lg-2 col-md-4 col-sm-4 work"> <a href="/images/schools/work-3.jpg" class="work-box"> <img src="/images/schools/work-3.jpg" alt="">
        <div class="overlay">
          <div class="overlay-caption">
            <p><i class="fa fa-search-plus fa-2x"></i></p>
          </div>
        </div>
        <!-- overlay --> 
        </a> </div>
      <div class="col-lg-2 col-md-4 col-sm-4 work"> <a href="/images/schools/work-4.jpg" class="work-box"> <img src="/images/schools/work-4.jpg" alt="">
        <div class="overlay">
          <div class="overlay-caption">
            <p><i class="fa fa-search-plus fa-2x"></i></p>
          </div>
        </div>
        <!-- overlay --> 
        </a> </div>
      <div class="col-lg-2 col-md-4 col-sm-4 work"> <a href="/images/schools/work-5.jpg" class="work-box"> <img src="/images/schools/work-5.jpg" alt="">
        <div class="overlay">
          <div class="overlay-caption">
            <p><i class="fa fa-search-plus fa-2x"></i></p>
          </div>
        </div>
        <!-- overlay --> 
        </a> </div>
      <div class="col-lg-2 col-md-4 col-sm-4 work"> <a href="/images/schools/work-6.jpg" class="work-box"> <img src="/images/schools/work-6.jpg" alt="">
        <div class="overlay">
          <div class="overlay-caption">
            <p><i class="fa fa-search-plus fa-2x"></i></p>
          </div>
        </div>
        <!-- overlay --> 
        </a> </div>
      <div class="col-lg-2 col-md-4 col-sm-4 work"> <a href="/images/schools/work-7.jpg" class="work-box"> <img src="/images/schools/work-7.jpg" alt="">
        <div class="overlay">
          <div class="overlay-caption">
            <p><i class="fa fa-search-plus fa-2x"></i></p>
          </div>
        </div>
        <!-- overlay --> 
        </a> </div>
      <div class="col-lg-2 col-md-4 col-sm-4 work"> <a href="/images/schools/work-8.jpg" class="work-box"> <img src="/images/schools/work-8.jpg" alt="">
        <div class="overlay">
          <div class="overlay-caption">
            <p><i class="fa fa-search-plus fa-2x"></i></p>
          </div>
        </div>
        <!-- overlay --> 
        </a> </div>
      <div class="col-lg-2 col-md-4 col-sm-4 work"> <a href="/images/schools/work-9.jpg" class="work-box"> <img src="/images/schools/work-9.jpg" alt="">
        <div class="overlay">
          <div class="overlay-caption">
            <p><i class="fa fa-search-plus fa-2x"></i></p>
          </div>
        </div>
        <!-- overlay --> 
        </a> </div>
      <div class="col-lg-2 col-md-4 col-sm-4 work"> <a href="/images/schools/work-10.jpg" class="work-box"> <img src="/images/schools/work-10.jpg" alt="">
        <div class="overlay">
          <div class="overlay-caption">
            <p><i class="fa fa-search-plus fa-2x"></i></p>
          </div>
        </div>
        <!-- overlay --> 
        </a> </div>
      <div class="col-lg-2 col-md-4 col-sm-4 work"> <a href="/images/schools/work-11.jpg" class="work-box"> <img src="/images/schools/work-11.jpg" alt="">
        <div class="overlay">
          <div class="overlay-caption">
            <p><i class="fa fa-search-plus fa-2x"></i></p>
          </div>
        </div>
        <!-- overlay --> 
        </a> </div>
      <div class="col-lg-2 col-md-4 col-sm-4 work"> <a href="/images/schools/work-12.jpg" class="work-box"> <img src="/images/schools/work-12.jpg" alt="">
        <div class="overlay">
          <div class="overlay-caption">
            <p><i class="fa fa-search-plus fa-2x"></i></p>
          </div>
        </div>
        <!-- overlay --> 
        </a> </div>
    </div>
  </div>
</section>
<!-- work section --> 
@endsection

@section('after-scripts-end')
@stop
