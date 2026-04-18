<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Product;
use App\Models\Category;
use App\Models\SiteSetting;
use App\Models\Review;
use App\Models\ContactMessage;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/products', function () {
    return Product::with('reviews')->get();
});

Route::get('/products/{id}', function ($id) {
    return Product::with('reviews')->findOrFail($id);
});

Route::get('/categories', function () {
    return Category::all();
});

Route::get('/site-settings', function () {
    return SiteSetting::all()->pluck('value', 'key');
});

Route::get('/reviews', function () {
    return Review::with('product')->get();
});

Route::post('/contact', function (Request $request) {
    $validated = $request->validate([
        'name' => 'required|string',
        'email' => 'required|email',
        'subject' => 'required|string',
        'message' => 'required|string'
    ]);
    return ContactMessage::create($validated);
});
