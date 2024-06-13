<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/users', function () {
    return Inertia::render('Users/UserComponent');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard/create', function () {
    return Inertia::render('Create');
})->middleware(['auth', 'verified'])->name('create');

Route::get('/admin/dashboard', function () {
    return Inertia::render('AdminDashboard');
})->middleware(['auth', 'verified'])->name('admin.dashboard');

Route::get('/admin/dashboard/admin-create', function () {
    return Inertia::render('AdminCreate');
})->middleware(['auth', 'verified'])->name('admin.create');

Route::get('/admin/dashboard/manage-user', function () {
    return Inertia::render('ManageUsers');
})->middleware(['auth', 'verified'])->name('manage.user');

Route::middleware('auth')->group(function () {
    Route::get('/admin/dashboard/profile', [ProfileController::class, 'adminedit'])->name('admin.profile.edit');
    Route::patch('/admin/dashboard/profile', [ProfileController::class, 'adminupdate'])->name('admin.profile.update');
    Route::delete('/admin/dashboard/profile', [ProfileController::class, 'admindestroy'])->name('admin.profile.destroy');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::middleware(['auth'])->group(function () {
    Route::get('/users', [UserController::class, 'index']);
});

Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');

Route::post('/upload', [UploadController::class, 'store']);
Route::get('/uploads', [UploadController::class, 'index']);