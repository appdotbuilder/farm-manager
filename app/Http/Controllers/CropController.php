<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCropRequest;
use App\Http\Requests\UpdateCropRequest;
use App\Models\Crop;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CropController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        $cropsQuery = $user->isAdmin() 
            ? Crop::with(['user', 'activities'])
            : Crop::with(['user', 'activities'])->forUser($user->id);

        $crops = $cropsQuery->latest()->paginate(10);
        
        return Inertia::render('crops/index', [
            'crops' => $crops
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('crops/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCropRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;
        
        $crop = Crop::create($data);

        return redirect()->route('crops.show', $crop)
            ->with('success', 'Crop created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Crop $crop, Request $request)
    {
        $user = $request->user();
        
        // Check authorization
        if (!$user->isAdmin() && $crop->user_id !== $user->id) {
            abort(403, 'Unauthorized to view this crop.');
        }

        $crop->load(['user', 'activities' => function ($query) {
            $query->latest('activity_date');
        }]);

        return Inertia::render('crops/show', [
            'crop' => $crop
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Crop $crop, Request $request)
    {
        $user = $request->user();
        
        // Check authorization
        if (!$user->isAdmin() && $crop->user_id !== $user->id) {
            abort(403, 'Unauthorized to edit this crop.');
        }

        return Inertia::render('crops/edit', [
            'crop' => $crop
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCropRequest $request, Crop $crop)
    {
        $user = $request->user();
        
        // Check authorization
        if (!$user->isAdmin() && $crop->user_id !== $user->id) {
            abort(403, 'Unauthorized to update this crop.');
        }

        $crop->update($request->validated());

        return redirect()->route('crops.show', $crop)
            ->with('success', 'Crop updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Crop $crop, Request $request)
    {
        $user = $request->user();
        
        // Check authorization
        if (!$user->isAdmin() && $crop->user_id !== $user->id) {
            abort(403, 'Unauthorized to delete this crop.');
        }

        $crop->delete();

        return redirect()->route('crops.index')
            ->with('success', 'Crop deleted successfully.');
    }
}