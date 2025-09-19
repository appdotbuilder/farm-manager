<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCropActivityRequest;
use App\Models\Crop;
use App\Models\CropActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CropActivityController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Crop $crop, Request $request)
    {
        $user = $request->user();
        
        // Check authorization
        if (!$user->isAdmin() && $crop->user_id !== $user->id) {
            abort(403, 'Unauthorized to add activities to this crop.');
        }

        return Inertia::render('crop-activities/create', [
            'crop' => $crop
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCropActivityRequest $request, Crop $crop)
    {
        $user = $request->user();
        
        // Check authorization
        if (!$user->isAdmin() && $crop->user_id !== $user->id) {
            abort(403, 'Unauthorized to add activities to this crop.');
        }

        $data = $request->validated();
        $data['crop_id'] = $crop->id;
        
        CropActivity::create($data);

        return redirect()->route('crops.show', $crop)
            ->with('success', 'Activity added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(CropActivity $cropActivity, Request $request)
    {
        $user = $request->user();
        $cropActivity->load('crop.user');
        
        // Check authorization
        if (!$user->isAdmin() && $cropActivity->crop->user_id !== $user->id) {
            abort(403, 'Unauthorized to view this activity.');
        }

        return Inertia::render('crop-activities/show', [
            'activity' => $cropActivity
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CropActivity $cropActivity, Request $request)
    {
        $user = $request->user();
        $cropActivity->load('crop');
        
        // Check authorization
        if (!$user->isAdmin() && $cropActivity->crop->user_id !== $user->id) {
            abort(403, 'Unauthorized to delete this activity.');
        }

        $crop = $cropActivity->crop;
        $cropActivity->delete();

        return redirect()->route('crops.show', $crop)
            ->with('success', 'Activity deleted successfully.');
    }
}