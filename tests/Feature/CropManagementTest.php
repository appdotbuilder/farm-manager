<?php

namespace Tests\Feature;

use App\Models\Crop;
use App\Models\CropActivity;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CropManagementTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private User $farmer;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->admin = User::factory()->admin()->create();
        $this->farmer = User::factory()->farmer()->create();
    }

    public function test_dashboard_displays_crop_statistics()
    {
        // Create some test crops
        Crop::factory()
            ->count(5)
            ->for($this->farmer)
            ->create(['status' => 'growing']);
            
        Crop::factory()
            ->count(2)
            ->for($this->farmer)
            ->create(['status' => 'harvest_ready']);

        $response = $this->actingAs($this->farmer)->get(route('dashboard'));

        $response->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('dashboard')
                ->has('stats')
                ->where('stats.totalCrops', 7)
                ->where('stats.activeCrops', 7)
                ->where('stats.readyForHarvest', 2)
            );
    }

    public function test_farmer_can_create_crop()
    {
        $cropData = [
            'name' => 'Test Crop',
            'type' => 'corn',
            'planting_date' => '2024-01-15',
            'expected_harvest_date' => '2024-06-15',
            'field_location' => 'North Field',
            'status' => 'planted',
            'notes' => 'Test notes',
        ];

        $response = $this->actingAs($this->farmer)
            ->post(route('crops.store'), $cropData);

        $response->assertRedirect();
        $this->assertDatabaseHas('crops', [
            'name' => 'Test Crop',
            'user_id' => $this->farmer->id,
        ]);
    }

    public function test_farmer_can_view_their_crops()
    {
        $crop = Crop::factory()->for($this->farmer)->create();

        $response = $this->actingAs($this->farmer)
            ->get(route('crops.index'));

        $response->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('crops/index')
                ->has('crops.data', 1)
                ->where('crops.data.0.name', $crop->name)
            );
    }

    public function test_admin_can_view_all_crops()
    {
        $farmerCrop = Crop::factory()->for($this->farmer)->create();
        $anotherFarmer = User::factory()->farmer()->create();
        $anotherCrop = Crop::factory()->for($anotherFarmer)->create();

        $response = $this->actingAs($this->admin)
            ->get(route('crops.index'));

        $response->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('crops/index')
                ->has('crops.data', 2)
            );
    }

    public function test_farmer_cannot_view_other_farmers_crops()
    {
        $anotherFarmer = User::factory()->farmer()->create();
        $otherCrop = Crop::factory()->for($anotherFarmer)->create();

        $response = $this->actingAs($this->farmer)
            ->get(route('crops.show', $otherCrop));

        $response->assertStatus(403);
    }

    public function test_farmer_can_add_activity_to_their_crop()
    {
        $crop = Crop::factory()->for($this->farmer)->create();

        $activityData = [
            'activity_date' => '2024-01-20',
            'activity_type' => 'irrigation',
            'description' => 'Watered the crop',
            'quantity' => 100,
            'unit' => 'liters',
        ];

        $response = $this->actingAs($this->farmer)
            ->post(route('crop-activities.store', $crop), $activityData);

        $response->assertRedirect();
        $this->assertDatabaseHas('crop_activities', [
            'crop_id' => $crop->id,
            'activity_type' => 'irrigation',
            'description' => 'Watered the crop',
        ]);
    }

    public function test_farmer_cannot_add_activity_to_other_farmers_crop()
    {
        $anotherFarmer = User::factory()->farmer()->create();
        $otherCrop = Crop::factory()->for($anotherFarmer)->create();

        $activityData = [
            'activity_date' => '2024-01-20',
            'activity_type' => 'irrigation',
            'description' => 'Watered the crop',
        ];

        $response = $this->actingAs($this->farmer)
            ->post(route('crop-activities.store', $otherCrop), $activityData);

        $response->assertStatus(403);
    }

    public function test_crop_validation_requires_harvest_date_after_planting_date()
    {
        $cropData = [
            'name' => 'Test Crop',
            'type' => 'corn',
            'planting_date' => '2024-06-15',
            'expected_harvest_date' => '2024-01-15', // Before planting date
            'field_location' => 'North Field',
        ];

        $response = $this->actingAs($this->farmer)
            ->post(route('crops.store'), $cropData);

        $response->assertSessionHasErrors('expected_harvest_date');
    }

    public function test_welcome_page_displays_crop_management_info()
    {
        $response = $this->get('/');

        $response->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('welcome')
            );
    }
}