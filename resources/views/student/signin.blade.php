@extends('frontend.layouts.master')

@section('content')

    <div class="row">
        <div class="col-md-8 col-md-offset-2">

            <div class="panel panel-default">
                <div class="panel-heading">Login</div>

                <div class="panel-body">

                    <form method="POST" action="/student/signin" accept-charset="UTF-8" class="form-horizontal"><input name="_token" type="hidden" value="4pN1JFUFrJrCLT9qI4PezH67gfXDuLUhv5o2nEBf">

                        <div class="form-group">
                            <label for="email" class="col-md-4 control-label">E-mail Address</label>
                            <div class="col-md-6">
                                <input class="form-control" placeholder="E-mail Address" name="email" type="email" id="email">
                            </div><!--col-md-6-->
                        </div><!--form-group-->

                        <div class="form-group">
                            <label for="password" class="col-md-4 control-label">Password</label>
                            <div class="col-md-6">
                                <input class="form-control" placeholder="Password" name="password" type="password" id="password">
                            </div><!--col-md-6-->
                        </div><!--form-group-->

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <div class="checkbox">
                                    <label>
                                        <input name="remember" type="checkbox" value="1"> Remember Me
                                    </label>
                                </div>
                            </div><!--col-md-6-->
                        </div><!--form-group-->

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <input class="btn btn-primary" style="margin-right:15px" type="submit" value="Login">

                                <a href="/student/password/reset">Forgot Your Password?</a>
                            </div><!--col-md-6-->
                        </div><!--form-group-->

                    </form>
                </div><!-- panel body -->

            </div>

        </div><!-- col-md-8 -->
    </div><!-- row -->

@endsection