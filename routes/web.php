<?php

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
    return view('welcome');
});

//トークン発行
Route::get("createToken", "AtmController@createToken");

//口座開設
Route::post("bankTrading/accountOpening", "AtmController@accountOpen");

//残高照会
Route::get("bankTrading/{account_id}", "AtmController@balanceReference");

//預金の預け入れ
Route::post("bankTrading/depositMoney/{account_id}", "AtmController@depositMoney");

//預金の引き出し
Route::post("bankTrading/withdrawal/{account_id}", "AtmController@withdrawal");

Route::get("index", "AtmController@index");
