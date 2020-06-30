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
    $token = Session::get('access_token');

    echo $token;

	return Twitter::getHomeTimeline([
        'access_token' => $token['oauth_token'],
        'token_secret' => $token['oauth_token_secret'],
        'count' => 50,
        'format' => 'json']);
});