<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Crop;
use App\Models\CropActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get statistics based on user role
        if ($user->isAdmin()) {
            $totalCrops = Crop::count();
            $activeCrops = Crop::whereNotIn('status', ['harvested'])->count();
            $readyForHarvest = Crop::where('status', 'harvest_ready')->count();
            $totalActivities = CropActivity::count();
            $recentCrops = Crop::with('user')->latest()->limit(5)->get();
            $recentActivities = CropActivity::with('crop.user')->latest()->limit(5)->get();
        } else {
            $totalCrops = $user->crops()->count();
            $activeCrops = $user->crops()->whereNotIn('status', ['harvested'])->count();
            $readyForHarvest = $user->crops()->where('status', 'harvest_ready')->count();
            $totalActivities = CropActivity::whereHas('crop', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })->count();
            $recentCrops = $user->crops()->latest()->limit(5)->get();
            $recentActivities = CropActivity::with('crop')->whereHas('crop', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })->latest()->limit(5)->get();
        }

        return Inertia::render('dashboard', [
            'stats' => [
                'totalCrops' => $totalCrops,
                'activeCrops' => $activeCrops,
                'readyForHarvest' => $readyForHarvest,
                'totalActivities' => $totalActivities,
            ],
            'recentCrops' => $recentCrops,
            'recentActivities' => $recentActivities,
        ]);
    }
}