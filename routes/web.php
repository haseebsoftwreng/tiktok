<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Pixel\TiktokPixelController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::middleware(['verify.shopify'])
    ->group(function () {
        Route::get('/', function () {
            return view('welcome');
        })->name('home');
        Route::post('/saveTiktokPixel',[TiktokPixelController::class,'saveTiktokPixel'])->name('tiktokStore');
        Route::get('/getCollections',[TiktokPixelController::class,'getCollections'])->name('getCollectios');
        Route::get('/getTags',[TiktokPixelController::class,'getTags'])->name('getTags');
        Route::get('/getTikTokPixel',[TiktokPixelController::class,'tikTokPixelsGet'])->name('getTiktokPixel');
        Route::post('/deleteTiktokPixel',[TiktokPixelController::class,'deleteTiktokPixel'])->name('deleteTiktokPixel');
        Route::post('/tiktokInterestFinder',[TiktokPixelController::class,'tiktokInterestFinder'])->name('tikTokInterestFinder');
        Route::post('/getTiktokAnalyticByRange',[TiktokPixelController::class,'getTiktokAnalyticsByRange'])->name('tiktokAnalyticsByRange');
        Route::post('/getTiktokAnalytic',[TiktokPixelController::class,'getTiktokAnalytics'])->name('tiktokAnalytics');
        Route::post('/getTiktoPixelBySearch',[TiktokPixelController::class,'getTiktokPixelBySearch'])->name('getTiktokPixelBySearch');
        Route::post('/updateTiktokStatus',[TiktokPixelController::class,'updateTiktokStatus'])->name('updateTiktokStatus');
        Route::post('/getTiktokPixelById',[TiktokPixelController::class,'tiktokPixelsGetById'])->name('getTiktokPixelsById');
        Route::post('/updateTiktokPixel',[TiktokPixelController::class,'tiktokPixelEdited'])->name('tiktokPixelEdited');

        Route::get('{any}', function () {
            return view('welcome');
        });
       
    });

