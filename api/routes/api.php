<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cookie;
use App\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/homeTimeline', function(Request $request)
{
    $token = Cookie::get('user_id');
    $value = $request->cookie('user_id');

    echo '<script>';
    echo 'console.log('.$token.')';
    echo 'console.log('.$value.')';
    echo '</script> ';

    $user = Auth::loginUsingId($token);
    print_r($user);

    echo '<script>';
    echo 'console.log('.$user.')';
    echo 'console.log('.print_r($user).')';
    echo '</script> ';

    $oauth_token = $user->oauth_token;
    $oauth_token_secret = $user->oauth_token_secret;

    Twitter::reconfig(['token' => $oauth_token, 'secret' => $oauth_token_secret]);

	return Twitter::getHomeTimeline([
        'count' => 50,
        'format' => 'json']);
});