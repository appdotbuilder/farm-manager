<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCropActivityRequest extends FormRequest
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
            'activity_date' => 'required|date',
            'activity_type' => 'required|in:irrigation,fertilization,pest_control,scouting,weeding,harvesting,other',
            'description' => 'required|string',
            'quantity' => 'nullable|numeric|min:0',
            'unit' => 'nullable|string|max:50',
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
            'activity_date.required' => 'Activity date is required.',
            'activity_type.required' => 'Activity type is required.',
            'activity_type.in' => 'Please select a valid activity type.',
            'description.required' => 'Activity description is required.',
            'quantity.numeric' => 'Quantity must be a number.',
            'quantity.min' => 'Quantity cannot be negative.',
        ];
    }
}