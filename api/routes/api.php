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

Route::get('/homeTimeline', function (Request $request) {
    $token = Cookie::get('user_id');

    $user = Auth::loginUsingId($token);

    $oauth_token = $user->oauth_token;
    $oauth_token_secret = $user->oauth_token_secret;

    Twitter::reconfig(['token' => $oauth_token, 'secret' => $oauth_token_secret]);

    $tweets = Twitter::getHomeTimeline([
        'tweet_mode' => 'extended',
        'count' => 200,
        'format' => 'array'
    ]);

    $tweetRes = array();

    foreach ($tweets as $tweet) {
        $tweetLinkified = Twitter::linkify($tweet=>full_text);
        $tweetRes[] = $tweetLinkified;
    }

    $tweetRes = mb_convert_encoding($tweetRes, 'UTF-8', 'UTF-8');
    return $tweetRes;
});

Route::get('/userTimeline', function (Request $request) {
    $token = Cookie::get('user_id');

    $user = Auth::loginUsingId($token);

    $oauth_token = $user->oauth_token;
    $oauth_token_secret = $user->oauth_token_secret;
    $username = $user->screen_name;

    Twitter::reconfig(['token' => $oauth_token, 'secret' => $oauth_token_secret]);

    return Twitter::getUserTimeline([
        'screen_name' => $username,
        'count' => 50,
        'format' => 'json'
    ]);
});
