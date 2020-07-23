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

    foreach ($tweets as &$tweet) {
        $tweet['full_text'] = Twitter::linkify($tweet['full_text']);
        $tweet['created_at'] = Twitter::ago($tweet['created_at']);
    }

    return $tweets;
});

Route::get('/userTimeline', function (Request $request) {
    $token = Cookie::get('user_id');

    $user = Auth::loginUsingId($token);

    $oauth_token = $user->oauth_token;
    $oauth_token_secret = $user->oauth_token_secret;
    $username = $user->screen_name;

    Twitter::reconfig(['token' => $oauth_token, 'secret' => $oauth_token_secret]);

    return Twitter::getUserTimeline([
        'tweet_mode' => 'extended',
        'screen_name' => $username,
        'count' => 50,
        'format' => 'json'
    ]);
});

Route::post('/postTweet', function (Request $request) {
    $body = $request->All();

    $token = Cookie::get('user_id');
    $user = Auth::loginUsingId($token);
    $oauth_token = $user->oauth_token;
    $oauth_token_secret = $user->oauth_token_secret;
    Twitter::reconfig(['token' => $oauth_token, 'secret' => $oauth_token_secret]);

    // return Twitter::postTweet(['status' => $status, 'format' => 'json']);
    return $body['status'];
});
