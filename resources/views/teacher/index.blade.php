<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="_token" content="{!! csrf_token() !!}" />
    <meta name="domain" content="{{$domain}}" />
    <title>@yield('title', app_name())</title>
    <!-- Webpack compiled -->
    @if ($env === 'local')
        <link rel="stylesheet" href="http://localhost:3001/static/bundle.css">
    @elseif ($env === 'production')
        <link rel="stylesheet" href="/dist/admin/bundle.css">
    @endif
    <!-- google Roboto font -->
    <!--<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'> -->
    <!--<link href='http://fonts.googleapis.com/earlyaccess/notosansjp.css' rel='stylesheet' type='text/css'> -->
  </head>
  <body style="padding-bottom: 0;">
    <div id="root"></div>
    @if ($env === 'local')
        <script src="http://localhost:3001/static/bundle.js"></script>
    @elseif ($env === 'production')
        <script src="/dist/admin/bundle.js"></script>
    @endif
  </body>
</html>