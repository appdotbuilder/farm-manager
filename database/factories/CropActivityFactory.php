<?php

namespace Database\Factories;

use App\Models\Crop;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CropActivity>
 */
class CropActivityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $activityTypes = ['irrigation', 'fertilization', 'pest_control', 'scouting', 'weeding', 'harvesting', 'other'];
        $activityType = fake()->randomElement($activityTypes);
        
        $descriptions = [
            'irrigation' => ['Watered the field thoroughly', 'Applied drip irrigation for 2 hours', 'Flood irrigation applied'],
            'fertilization' => ['Applied nitrogen fertilizer', 'Organic compost added', 'NPK fertilizer applied'],
            'pest_control' => ['Sprayed for aphids', 'Applied pesticide for beetles', 'Organic pest control treatment'],
            'scouting' => ['Checked for pest damage', 'Monitored plant growth', 'Assessed crop health'],
            'weeding' => ['Manual weeding completed', 'Herbicide application', 'Mechanical cultivation'],
            'harvesting' => ['Partial harvest completed', 'Full harvest', 'Early harvest due to weather'],
            'other' => ['General maintenance', 'Field preparation', 'Equipment maintenance']
        ];

        return [
            'crop_id' => Crop::factory(),
            'activity_date' => fake()->dateTimeBetween('-3 months', 'now'),
            'activity_type' => $activityType,
            'description' => fake()->randomElement($descriptions[$activityType]),
            'quantity' => fake()->optional(0.6)->randomFloat(2, 1, 100),
            'unit' => fake()->optional(0.6)->randomElement(['liters', 'kg', 'lbs', 'gallons', 'hours']),
        ];
    }

    /**
     * Indicate that the activity is irrigation.
     */
    public function irrigation(): static
    {
        return $this->state(fn (array $attributes) => [
            'activity_type' => 'irrigation',
            'description' => 'Irrigation system activated for optimal water distribution',
            'quantity' => fake()->randomFloat(2, 100, 500),
            'unit' => 'liters',
        ]);
    }

    /**
     * Indicate that the activity is fertilization.
     */
    public function fertilization(): static
    {
        return $this->state(fn (array $attributes) => [
            'activity_type' => 'fertilization',
            'description' => 'Applied organic fertilizer to improve soil nutrients',
            'quantity' => fake()->randomFloat(2, 10, 50),
            'unit' => 'kg',
        ]);
    }
}