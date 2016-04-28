@extends('frontend.layouts.master')

@section('after-styles-end')
<link rel="stylesheet" href="/css/schools/main.css">
<link rel="stylesheet" href="/css/schools/responsive.css">
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
        <li><a href="/">マイページへ</a></li>
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
      <div class="col-md-12 col-sm-12">
        <div class="intro-content">
          <h4 style="text-align: center;">教師及び管理者の方は各大学のログインフォームからログインしてください</h4>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- Intro Section --> 
<!-- work section -->
<section id="works" class="works section no-padding">
  <div class="container">
    <div class="container-fluid">
      <div class="row no-gutter">
        <div class="col-lg-2 col-md-4 col-sm-4 work">
          <a href="/nagoya-u/signin" class="work-box">
            <img src="/images/schools/nagoya-u-logo.png" alt="">
            <div class="overlay overlay-nagoya-u">
              <div class="overlay-caption"><p>名古屋大学</p></div>
            </div>
          </a>
        </div>
<!--         <div class="col-lg-2 col-md-4 col-sm-4 work">
          <a href="/aichitoho-u/signin" class="work-box">
            <img src="/images/schools/aichitoho-u-logo.png" alt="">
            <div class="overlay overlay-aichtoho-u">
              <div class="overlay-caption">
                <p>愛知東邦大学</p>
              </div>
            </div>
          </a>
        </div> -->
        <!--
        <div class="col-lg-2 col-md-4 col-sm-4 work">
          <a href="/chukyo-u/signin" class="work-box">
            <img src="/images/schools/chukyo-u-logo.png" alt="">
            <div class="overlay overlay-chukyo-u">
              <div class="overlay-caption"><p>中京大学</p></div>
            </div>
          </a>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-4 work">
          <a href="/aichtoho-u/signin" class="work-box">
            <img src="/images/schools/aichtoho-u-logo.png" alt="">
            <div class="overlay overlay-aichtoho-u">
              <div class="overlay-caption">
                <p>愛知東邦大学</p>
              </div>
            </div>
          </a>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-4 work">
          <a href="/aichtoho-u/signin" class="work-box">
            <img src="/images/schools/aichtoho-u-logo.png" alt="">
            <div class="overlay overlay-aichtoho-u">
              <div class="overlay-caption">
                <p>愛知東邦大学</p>
              </div>
            </div>
          </a>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-4 work">
          <a href="/aichtoho-u/signin" class="work-box">
            <img src="/images/schools/aichtoho-u-logo.png" alt="">
            <div class="overlay overlay-aichtoho-u">
              <div class="overlay-caption">
                <p>愛知東邦大学</p>
              </div>
            </div>
          </a>
        </div>
        -->
      </div>
    </div>
  </div>
</section>
<!-- work section --> 
@endsection

@section('after-scripts-end')
@stop
