<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="_token" content="{{ csrf_token() }}" />

        <title>@yield('title', app_name())</title>

        <!-- Meta -->
        <meta name="description" content="@yield('meta_description', 'Default Description')">
        <meta name="author" content="@yield('meta_author', 'Anthony Rappa')">
        @yield('meta')

        <!-- Styles -->
        @yield('before-styles-end')
        <link rel="stylesheet" href="/css/vendor/bootstrap.min.css">
        <link rel="stylesheet" href="/css/vendor/jquery.fancybox.css">
        <link rel="stylesheet" href="/css/vendor/owl.carousel.css">
        <link rel="stylesheet" href="/css/vendor/owl.transitions.css">
        <link rel="stylesheet" href="/css/vendor/animate.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
        @yield('after-styles-end')

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700" rel='stylesheet' type='text/css'>
    </head>
    <body id="app-layout">

        @yield('content')

        <!-- JavaScripts -->
        <script src="/js/vendor/jquery/jquery-2.1.4.min.js"></script>
        <script src="/js/vendor/bootstrap.min.js"></script> 
        <script src="/js/vendor/jquery.fancybox.pack.js"></script> 
        <script src="/js/vendor/retina.min.js"></script> 
        <script src="/js/vendor/modernizr.js"></script> 
        <script src="/js/vendor/owl.carousel.min.js"></script>
        @yield('before-scripts-end')
        @yield('after-scripts-end')

        @include('includes.partials.ga')
    </body>
</html>