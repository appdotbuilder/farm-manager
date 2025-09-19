<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCropRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'planting_date' => 'required|date',
            'expected_harvest_date' => 'required|date|after:planting_date',
            'field_location' => 'required|string|max:255',
            'status' => 'sometimes|in:planted,seedling,growing,harvest_ready,harvested',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Crop name is required.',
            'type.required' => 'Crop type is required.',
            'planting_date.required' => 'Planting date is required.',
            'expected_harvest_date.required' => 'Expected harvest date is required.',
            'expected_harvest_date.after' => 'Harvest date must be after planting date.',
            'field_location.required' => 'Field location is required.',
        ];
    }
}