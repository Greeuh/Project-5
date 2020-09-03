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
        'count' => 50,
        'format' => 'array'
    ]);

    foreach ($tweets as &$tweet) {
        $tweet['full_text'] = Twitter::linkify($tweet['full_text']);
        $tweet['created_at'] = Twitter::ago($tweet['created_at']);
    }

    return $tweets;
});

Route::get('/userLogTimeline', function (Request $request) {
    $token = Cookie::get('user_id');
    $user = Auth::loginUsingId($token);
    $oauth_token = $user->oauth_token;
    $oauth_token_secret = $user->oauth_token_secret;
    $username = $user->screen_name;
    Twitter::reconfig(['token' => $oauth_token, 'secret' => $oauth_token_secret]);

    $tweets = Twitter::getUserTimeline([
        'tweet_mode' => 'extended',
        'screen_name' => $username,
        'count' => 50,
        'format' => 'array'
    ]);

    foreach ($tweets as &$tweet) {
        $tweet['full_text'] = Twitter::linkify($tweet['full_text']);
        $tweet['created_at'] = Twitter::ago($tweet['created_at']);
    }

    return $tweets;
});

Route::post('/queryUserTimeline', function (Request $request) {
    $body = $request->All();

    $token = Cookie::get('user_id');
    $user = Auth::loginUsingId($token);
    $oauth_token = $user->oauth_token;
    $oauth_token_secret = $user->oauth_token_secret;
    Twitter::reconfig(['token' => $oauth_token, 'secret' => $oauth_token_secret]);

    $tweets = Twitter::getUserTimeline([
        'tweet_mode' => 'extended',
        'screen_name' => $body['screen_name'],
        'count' => 50,
        'format' => 'array'
    ]);

    foreach ($tweets as &$tweet) {
        $tweet['full_text'] = Twitter::linkify($tweet['full_text']);
        $tweet['created_at'] = Twitter::ago($tweet['created_at']);
    }

    return $tweets;
});

Route::get('/mentionsTimeline', function (Request $request) {
    $token = Cookie::get('user_id');
    $user = Auth::loginUsingId($token);
    $oauth_token = $user->oauth_token;
    $oauth_token_secret = $user->oauth_token_secret;

    Twitter::reconfig(['token' => $oauth_token, 'secret' => $oauth_token_secret]);

    $tweets = Twitter::getMentionsTimeline([
        'tweet_mode' => 'extended',
        'count' => 50,
        'format' => 'array'
    ]);

    foreach ($tweets as &$tweet) {
        $tweet['full_text'] = Twitter::linkify($tweet['full_text']);
        $tweet['created_at'] = Twitter::ago($tweet['created_at']);
    }

    return $tweets;
});

Route::get('/directMessage', function (Request $request) {
    $token = Cookie::get('user_id');
    $user = Auth::loginUsingId($token);
    $oauth_token = $user->oauth_token;
    $oauth_token_secret = $user->oauth_token_secret;

    Twitter::reconfig(['token' => $oauth_token, 'secret' => $oauth_token_secret]);

    $dms = Twitter::getDms([
        'format' => 'array'
    ]);

    foreach ($dms['events'] as &$dm) {
        $dm['created_timestamp'] = Twitter::ago($dm['created_timestamp']);
        $dm['message_create']['sender_id'] = Twitter::getUsers(['user_id' => $dm['message_create']['sender_id'], 'include_entities' => false]);
    }

    return $dms;
});

Route::post('/postTweet', function (Request $request) {
    $body = $request->All();

    $token = Cookie::get('user_id');
    $user = Auth::loginUsingId($token);
    $oauth_token = $user->oauth_token;
    $oauth_token_secret = $user->oauth_token_secret;
    Twitter::reconfig(['token' => $oauth_token, 'secret' => $oauth_token_secret]);

    if (Str::length($body['status']) > 280){
        return 413;
    }else{
        //Twitter::postTweet(['status' => $body['status'], 'format' => 'json']);
        //return 200;
        http_response_code(200);
        return Twitter::postTweet([
            'status' => $body['status'], 
            'format' => 'json']);
    }
});

Route::post('/postFavorite', function (Request $request) {
    $body = $request->All();

    $token = Cookie::get('user_id');
    $user = Auth::loginUsingId($token);
    $oauth_token = $user->oauth_token;
    $oauth_token_secret = $user->oauth_token_secret;
    $username = $user->screen_name;
    Twitter::reconfig(['token' => $oauth_token, 'secret' => $oauth_token_secret]);

    return Twitter::postFavorite([
        'id' => $body['id'], 
        'format' => 'json']);
});

Route::post('/destroyFavorite', function (Request $request) {
    $body = $request->All();

    $token = Cookie::get('user_id');
    $user = Auth::loginUsingId($token);
    $oauth_token = $user->oauth_token;
    $oauth_token_secret = $user->oauth_token_secret;
    $username = $user->screen_name;
    Twitter::reconfig(['token' => $oauth_token, 'secret' => $oauth_token_secret]);

    return Twitter::destroyFavorite([
        'id' => $body['id'], 
        'format' => 'json']);
});

Route::post('/postRetweet', function (Request $request) {
    $body = $request->All();

    $token = Cookie::get('user_id');
    $user = Auth::loginUsingId($token);
    $oauth_token = $user->oauth_token;
    $oauth_token_secret = $user->oauth_token_secret;
    $username = $user->screen_name;
    Twitter::reconfig(['token' => $oauth_token, 'secret' => $oauth_token_secret]);

    return Twitter::postRt(
        1301190340179906562
    );
});
