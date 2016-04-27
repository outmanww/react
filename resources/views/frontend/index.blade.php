@extends('frontend.layouts.master')

@section('after-styles-end')
<link rel="stylesheet" href="/css/top/responsive.css">
<link rel="stylesheet" href="/css/top/line-icon.css">
<link rel="stylesheet" href="/css/top/main.css">
@endsection

@section('content')

<!-- header section -->
<section class="banner" role="banner">
  <header id="header">
    <div class="header-content clearfix">
      <a class="logo" href="/"><img height="60" src="images/logo.png" alt=""></a> 
      <!-- navigation section  -->
      <nav class="navigation" role="navigation">
        <ul class="primary-nav">
          <li><a href="#banner">Home</a></li>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#screens">Screenshots</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/schools">学校関係者の方</a></li>
        </ul>
      </nav>
      <a href="#" class="nav-toggle">Menu<span></span></a>
    </div>
    <!-- navigation section  --> 
  </header>
</section>

<div class="background fullscreen" id="home">
<div class="overlay">
  <!-- container -->
  <div class="container clearfix fullscreen" style="height: 770px;">
    <div class="phone eight columns animated fadeInLeft">
      <div class="preview">
        <img src="images/app-screen/4.png" alt="">
      </div>
    </div>

    <div class="info eight columns animated fadeInRight" style="margin-top: 257px; bottom: 235; right: 0px;">
      <div class="logo">Re:act</div>
      <div class="welcome">双方向型講義を実現する</div>
      <div class="download">
        <div class="banner-btn">
          <a href="#"><img src="images/apple-store-btn.png"></a>
          <a href="#"><img src="images/google-store-btn.png"></a>
        </div>
      </div>
    </div>

  </div>
  <!-- container -->
  <div class="more"></div>
</div>
</div>
<!-- header section --> 

<!-- overview section -->
<section id="overview" class="section overview">
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2 text-center">
        <h2 class="section-title">Present Your App To The World With <span>Rooky</span></h2>
        <p class="section-intro">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis quasi architecto beatae vitae dicta sunt explicabo. </p>
      </div>
      <div class="col-md-12 text-center overview-video">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/XJ2nZL5Dabc" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 col-sm-12 "> <span class="icon icon-browser"></span>
        <div class="overview-content">
          <h4>Flexible Layouts</h4>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium demque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore </p>
        </div>
      </div>
      <div class="col-md-4 col-sm-12 "> <span class="icon icon-trophy"></span>
        <div class="overview-content">
          <h4>Clean Design</h4>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium demque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore </p>
        </div>
      </div>
      <div class="col-md-4 col-sm-12 "> <span class="icon icon-lifesaver"></span>
        <div class="overview-content">
          <h4>Amazing Support</h4>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium demque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore </p>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- overview section --> 
<!-- feature section 1 -->
<section id="features" class="section features1">
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2 text-center">
        <h2 class="section-title">We Offers A Wide Range Of <span>Features</span></h2>
        <p class="section-intro">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae. </p>
      </div>
    </div>
    <div class="row features1-content-space">
      <div class="col-md-3 col-sm-12">
        <div class="features1-content left"> <span class="icon icon-upload"></span>
          <h4>Light Weight</h4>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium demque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore </p>
        </div>
        <div class="features1-content left"> <span class="icon icon-tools"></span>
          <h4>Creatively Design</h4>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium demque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore </p>
        </div>
      </div>
      <div class="col-md-6 col-sm-12">

<div id="iphone5s" class="silver">
  <div class="device">
    <div class="inner"></div>
    <div class="sleep"></div>
    <div class="volume"></div>
    <div class="camera"></div>
    <div class="top-bar"></div>
    <div class="sensor"></div>
    <div class="speaker"></div>
    <div class="screen">
      <img src="./img/gallery/screen-1.jpg" alt="">
    </div>
    <div class="bottom-bar"></div>
    <div class="start"></div>
  </div>
</div>

      </div>
      <div class="col-md-3 col-sm-12">
        <div class="features1-content right"> <span class="icon icon-speedometer"></span>
          <h4>Boost performance</h4>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium demque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore </p>
        </div>
        <div class="features1-content right"> <span class="icon icon-camera"></span>
          <h4>Flexible Layouts</h4>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium demque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore </p>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- feature section 1 --> 

<!-- feature section 2 -->
<section id="features" class="section features2">
  <div class="container">
    <div class="row">
      <div class="col-md-6" style="float:right;">
        <div class="features2-content">
          <h2 class="section-title">Completely flexible, create the landing page <span>you want</span></h2>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
          <ul>
            <li><i class="fa fa-check"></i> Sed ut perspiciatis unde omnis </li>
            <li><i class="fa fa-check"></i> iste natus error sit voluptatem accusantium </li>
            <li><i class="fa fa-check"></i> doloremque laudantium, totam rem aperiam.</li>
          </ul>
        </div>
      </div>
      <div class="col-md-6"> <img class="img-responsive" src="images/feature-screen2.png"> </div>
    </div>
  </div>
</section>
<!-- feature section 2 --> 

<!-- feature section 3 -->
<section id="features" class="section features3">
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="features2-content">
          <h2 class="section-title">Super flexible and very easy to modify your <span>app screen</span></h2>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
        </div>
      </div>
      <div class="col-md-6"> <img class="img-responsive" src="images/feature-screen3.png"> </div>
    </div>
  </div>
</section>
<!-- feature section 3 --> 

<!-- screen shots slider section-->
<section id="screens" class="section screens">
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2 text-center">
        <h2 class="section-title">A landing page for the <span>next generation</span></h2>
        <p class="section-intro">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae. </p>
      </div>
    </div>
  </div>
  <!-- owl-carousel starts -->
  <div id="owl-demo" class="owl-carousel">
    <div class="item"><img width="281" height="500" src="images/app-screen/1.png"></div>
    <div class="item"><img width="281" height="500" src="images/app-screen/2.png"></div>
    <div class="item"><img width="281" height="500" src="images/app-screen/3.png"></div>
    <div class="item"><img width="281" height="500" src="images/app-screen/4.png"></div>
    <div class="item"><img width="281" height="500" src="images/app-screen/5.png"></div>
    <div class="item"><img width="281" height="500" src="images/app-screen/1.png"></div>
    <div class="item"><img width="281" height="500" src="images/app-screen/2.png"></div>
    <div class="item"><img width="281" height="500" src="images/app-screen/3.png"></div>
    <div class="item"><img width="281" height="500" src="images/app-screen/4.png"></div>
    <div class="item"><img width="281" height="500" src="images/app-screen/5.png"></div>
  </div>
  <!-- owl-carousel starts --> 
</section>
<!-- screen shots slider section --> 

<!--contact section -->
<section id="contact" class="section text-center">
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2 ">
        <h2 class="section-title">Get In Touch <span>Say Hello!</span></h2>
        <p class="section-intro">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae. </p>
      </div>
    </div>
    
    <!--contact form start-->
    <div class="col-md-6 col-md-offset-3 conForm">
      <div id="message"></div>
      <form method="post" action="php/contact.php" name="cform" id="cform">
        <input name="name" id="name" type="text" class="col-xs-12 col-sm-12 col-md-12 col-lg-12" placeholder="Your name..." >
        <input name="email" id="email" type="email" class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 noMarr" placeholder="Email Address..." >
        <textarea name="comments" id="comments" cols="" rows="" class="col-xs-12 col-sm-12 col-md-12 col-lg-12" placeholder="Project Details..."></textarea>
        <input type="submit" id="submit" name="send" class="submitBnt" value="Send">
        <div id="simple-msg"></div>
      </form>
    </div>
    <!--contact form end--> 
  </div>
</section>
<!--contact section --> 

@include('frontend.includes.footer')

@endsection

@section('after-scripts-end')
    <script src="/js/top/jquery.subscribe.js"></script> 
    <script src="/js/top/jquery.contact.js"></script> 
    <script src="/js/top/main.js"></script>
@stop