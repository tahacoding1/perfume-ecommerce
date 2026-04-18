<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Product;
use App\Models\Category;
use App\Models\SiteSetting;
use App\Models\Review;
use App\Models\ContactMessage;
use App\Models\User;
use App\Models\Order;
use App\Models\Faq;
use App\Models\Page;
use App\Models\NewsletterSubscriber;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

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

Route::get('/faqs', function () {
    return Faq::where('is_active', true)->get();
});

Route::get('/pages/{slug}', function ($slug) {
    return Page::where('slug', $slug)->firstOrFail();
});

Route::post('/newsletter/subscribe', function (Request $request) {
    $validated = $request->validate(['email' => 'required|email|unique:newsletter_subscribers,email']);
    return NewsletterSubscriber::create($validated);
});

// Auth Routes (Sanctum Tokens)
Route::post('/login', function (Request $request) {
    $request->validate(['email' => 'required|email', 'password' => 'required']);
    $user = User::where('email', $request->email)->first();
    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages(['email' => ['Credentials do not match.']]);
    }
    return ['user' => $user, 'token' => $user->createToken('auth-token')->plainTextToken];
});

Route::post('/register', function (Request $request) {
    $request->validate(['name' => 'required', 'email' => 'required|email|unique:users', 'password' => 'required|min:6']);
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);
    return ['user' => $user, 'token' => $user->createToken('auth-token')->plainTextToken];
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/orders', function (Request $request) {
         $order = Order::create([
             'user_id' => $request->user()->id,
             'total_price' => $request->total_price,
             'shipping_address' => json_encode($request->shipping_details),
             'payment_method' => $request->payment_method,
             'items' => $request->items,
             'status' => 'pending'
         ]);
         return $order;
    });

    Route::get('/user/orders', function (Request $request) {
        return Order::where('user_id', $request->user()->id)->orderBy('created_at', 'desc')->get();
    });
});
