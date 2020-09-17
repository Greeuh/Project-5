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


//
// USERS_QUERIED HANDLE
//


Route::get('/isUserLog', function (Request $request) {
    $token = Cookie::get('user_id');

    if (!$token) {
        return response('User is not logged', 202)
        ->header('Content-Type', 'text/plain'); 
    }else{
        $user = Auth::loginUsingId($token);
        if (!$user->users_queried) {
            return response('User is log but users_queried is empty', 201)
            ->header('Content-Type', 'text/plain');;
        }else{
            return $user->users_queried;
        }
    }
});

Route::post('/updateQueryUser', function (Request $request) {
    $body = $request->All();

    $token = Cookie::get('user_id');
    $user = Auth::loginUsingId($token);

    $data = $body['users_queried'];
    
    DB::table('users')
        ->where('id', $token)
        ->update(['users_queried' => $data]);

    return response('users_queried updated', 200)
        ->header('Content-Type', 'text/plain');
});


//
// TIMELINE
//


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
        if (isset($tweet['retweeted_status'])) {
            $tweet['retweeted_status']['full_text'] = Twitter::linkify($tweet['retweeted_status']['full_text']);
        }
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
        if (isset($tweet['retweeted_status'])) {
            $tweet['retweeted_status']['full_text'] = Twitter::linkify($tweet['retweeted_status']['full_text']);
        }
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
        if (isset($tweet['retweeted_status'])) {
            $tweet['retweeted_status']['full_text'] = Twitter::linkify($tweet['retweeted_status']['full_text']);
        }
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


//
// UTILITARIES FUNCTION
//


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
        $body['id']
    );
});

Route::post('/destroyTweet', function (Request $request) {
    $body = $request->All();

    $token = Cookie::get('user_id');
    $user = Auth::loginUsingId($token);
    $oauth_token = $user->oauth_token;
    $oauth_token_secret = $user->oauth_token_secret;
    $username = $user->screen_name;
    Twitter::reconfig(['token' => $oauth_token, 'secret' => $oauth_token_secret]);

    return Twitter::destroyTweet(
        $body['id']
    );
});

Route::post('/checkIfUserExist', function (Request $request) {
    $body = $request->All();

    $token = Cookie::get('user_id');
    $user = Auth::loginUsingId($token);
    $oauth_token = $user->oauth_token;
    $oauth_token_secret = $user->oauth_token_secret;
    $username = $user->screen_name;
    Twitter::reconfig(['token' => $oauth_token, 'secret' => $oauth_token_secret]);

    return Twitter::getUsersLookup([
        'screen_name' => $body['screen_name'],
        'include_entities' => false,
    ]);
});

Route::get('/logOut', function (Request $request) {
    $cookie = Cookie::forget('user_id');

    return Redirect::to('https://projet5ocr.antoineparriaud.fr:3000/app')->withCookie($cookie);
});