<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get('/homeTimeline', function()
{
    $token = $request->cookie('user_id');

    echo '<script>';
    echo 'console.log('.$token.')';
    echo '</script>';

    Auth::loginUsingId($token['user_id']);

    Twitter::reconfig(['token' => $user->oauth_token, 'secret' => $user->oauth_token_secret]);

	return Twitter::getHomeTimeline([
        'count' => 50,
        'format' => 'json']);
});