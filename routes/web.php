<?php

use App\Http\Controllers\CropActivityController;
use App\Http\Controllers\CropController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Crop management routes
    Route::resource('crops', CropController::class);
    
    // Crop activity routes
    Route::get('crops/{crop}/activities/create', [CropActivityController::class, 'create'])->name('crop-activities.create');
    Route::post('crops/{crop}/activities', [CropActivityController::class, 'store'])->name('crop-activities.store');
    Route::get('crop-activities/{cropActivity}', [CropActivityController::class, 'show'])->name('crop-activities.show');
    Route::delete('crop-activities/{cropActivity}', [CropActivityController::class, 'destroy'])->name('crop-activities.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
