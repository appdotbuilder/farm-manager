<?php

namespace Database\Seeders;

use App\Models\Crop;
use App\Models\CropActivity;
use App\Models\User;
use Illuminate\Database\Seeder;

class CropSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@cropmanager.com'],
            [
                'name' => 'System Administrator',
                'role' => 'admin',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        // Create farmer users
        $farmer1 = User::firstOrCreate(
            ['email' => 'john@farm.com'],
            [
                'name' => 'John Smith',
                'role' => 'farmer',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        $farmer2 = User::firstOrCreate(
            ['email' => 'sarah@farm.com'],
            [
                'name' => 'Sarah Johnson',
                'role' => 'farmer',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        // Create crops for farmer1
        $crops = [
            [
                'name' => 'North Field Corn',
                'type' => 'corn',
                'planting_date' => '2024-04-15',
                'expected_harvest_date' => '2024-09-15',
                'field_location' => 'North Field, Plot A',
                'status' => 'growing',
                'notes' => 'Premium seed variety. Expecting good yield this season.',
                'user_id' => $farmer1->id,
            ],
            [
                'name' => 'South Field Soybeans',
                'type' => 'soybeans',
                'planting_date' => '2024-05-01',
                'expected_harvest_date' => '2024-10-01',
                'field_location' => 'South Field, Plot B',
                'status' => 'seedling',
                'notes' => 'Organic certified field. Using rotation with corn.',
                'user_id' => $farmer1->id,
            ],
            [
                'name' => 'West Field Wheat',
                'type' => 'wheat',
                'planting_date' => '2024-03-20',
                'expected_harvest_date' => '2024-07-20',
                'field_location' => 'West Field, Plot C',
                'status' => 'harvest_ready',
                'notes' => 'Winter wheat variety. Ready for harvest soon.',
                'user_id' => $farmer1->id,
            ],
        ];

        // Create crops for farmer2
        $crops2 = [
            [
                'name' => 'Greenhouse Tomatoes',
                'type' => 'tomatoes',
                'planting_date' => '2024-06-01',
                'expected_harvest_date' => '2024-08-15',
                'field_location' => 'Greenhouse #1',
                'status' => 'growing',
                'notes' => 'Hydroponic system. Cherry tomato variety.',
                'user_id' => $farmer2->id,
            ],
            [
                'name' => 'East Field Potatoes',
                'type' => 'potatoes',
                'planting_date' => '2024-04-01',
                'expected_harvest_date' => '2024-08-01',
                'field_location' => 'East Field',
                'status' => 'harvested',
                'notes' => 'Russet variety. Good harvest this year.',
                'user_id' => $farmer2->id,
            ],
        ];

        // Create crops and activities
        foreach (array_merge($crops, $crops2) as $cropData) {
            $crop = Crop::create($cropData);

            // Create 3-5 random activities for each crop
            $activityCount = random_int(3, 5);
            for ($i = 0; $i < $activityCount; $i++) {
                CropActivity::factory()->create([
                    'crop_id' => $crop->id,
                    'activity_date' => fake()->dateTimeBetween($crop->planting_date, 'now'),
                ]);
            }
        }

        // Create some additional crops with factories
        Crop::factory()
            ->count(8)
            ->has(CropActivity::factory()->count(3), 'activities')
            ->create([
                'user_id' => collect([$farmer1->id, $farmer2->id])->random(),
            ]);

        $this->command->info('Created crops and activities for demonstration.');
    }
}