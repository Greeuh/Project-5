<?php

use Illuminate\Support\Facades\Route;
use App\User;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Redirect::to('https://projet5ocr.antoineparriaud.fr:3000/login');
});

Route::get('twitter/login', ['as' => 'twitter.login', function(){
	$sign_in_twitter = true;
	$force_login = false;

	Twitter::reconfig(['token' => '', 'secret' => '']);
	$token = Twitter::getRequestToken(route('twitter.callback'));

	if (isset($token['oauth_token_secret']))
	{
		$url = Twitter::getAuthorizeURL($token, $sign_in_twitter, $force_login);

		Session::put('oauth_state', 'start');
		Session::put('oauth_request_token', $token['oauth_token']);
		Session::put('oauth_request_token_secret', $token['oauth_token_secret']);

		return Redirect::to($url);
	}

	return Redirect::route('twitter.error');
}]);

Route::get('twitter/callback', ['as' => 'twitter.callback', function() {
	if (Session::has('oauth_request_token'))
	{
		$request_token = [
			'token'  => Session::get('oauth_request_token'),
			'secret' => Session::get('oauth_request_token_secret'),
		];

		Twitter::reconfig($request_token);

		$oauth_verifier = false;

		if (Request::has('oauth_verifier'))
		{
			$oauth_verifier = Request::get('oauth_verifier');
			$token = Twitter::getAccessToken($oauth_verifier);
		}

		if (!isset($token['oauth_token_secret']))
		{
			return Redirect::route('twitter.error')->with('flash_error', 'We could not log you in on Twitter.');
		}

		$credentials = Twitter::getCredentials();

		if (is_object($credentials) && !isset($credentials->error))
		{        

			Session::put('access_token', $token);

			if (User::where('id', '=', $token['user_id'])->count() > 0) {

				Auth::loginUsingId($token['user_id']);

				$cookie = cookie('user_id', $token['user_id'], 10800);
				
				cookie($cookie);
			} else {
				$user = new User();
				$user->id = $token['user_id'];
				$user->screen_name = $token['screen_name'];
				$user->oauth_token = $token['oauth_token'];
				$user->oauth_token_secret = $token['oauth_token_secret'];
				$user->save();

				$cookie = cookie('user_id', $token['user_id'], 10800);

				Auth::login($user, true);

				cookie($cookie);
			}

			return Redirect::to('https://projet5ocr.antoineparriaud.fr:3000/app')->cookie($cookie);
		}

		return Redirect::route('twitter.error')->with('flash_error', 'Crab! Something went wrong while signing you up!');
	}
}]);

Route::get('twitter/error', ['as' => 'twitter.error', function(){
}]);

Route::get('twitter/logout', ['as' => 'twitter.logout', function(){
	Session::forget('access_token');
	return Redirect::to('/')->with('flash_notice', 'You\'ve successfully logged out!');
}]);