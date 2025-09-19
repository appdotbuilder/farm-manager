<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Crop>
 */
class CropFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $cropTypes = ['corn', 'wheat', 'soybeans', 'tomatoes', 'lettuce', 'carrots', 'potatoes', 'beans'];
        $statuses = ['planted', 'seedling', 'growing', 'harvest_ready', 'harvested'];
        
        $plantingDate = fake()->dateTimeBetween('-6 months', 'now');
        $harvestDate = fake()->dateTimeBetween($plantingDate, '+6 months');

        return [
            'name' => fake()->words(2, true) . ' Field',
            'type' => fake()->randomElement($cropTypes),
            'planting_date' => $plantingDate,
            'expected_harvest_date' => $harvestDate,
            'field_location' => fake()->streetAddress(),
            'status' => fake()->randomElement($statuses),
            'notes' => fake()->optional(0.7)->paragraph(),
            'user_id' => User::factory(),
        ];
    }

    /**
     * Indicate that the crop is ready for harvest.
     */
    public function harvestReady(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'harvest_ready',
        ]);
    }

    /**
     * Indicate that the crop has been harvested.
     */
    public function harvested(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'harvested',
        ]);
    }

    /**
     * Indicate that the crop is still growing.
     */
    public function growing(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'growing',
        ]);
    }
}