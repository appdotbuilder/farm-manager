<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\CropActivity
 *
 * @property int $id
 * @property int $crop_id
 * @property \Illuminate\Support\Carbon $activity_date
 * @property string $activity_type
 * @property string $description
 * @property float|null $quantity
 * @property string|null $unit
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Crop $crop
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|CropActivity newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CropActivity newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CropActivity query()
 * @method static \Illuminate\Database\Eloquent\Builder|CropActivity whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CropActivity whereCropId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CropActivity whereActivityDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CropActivity whereActivityType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CropActivity whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CropActivity whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CropActivity whereUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CropActivity whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CropActivity whereUpdatedAt($value)
 * @method static \Database\Factories\CropActivityFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class CropActivity extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'crop_id',
        'activity_date',
        'activity_type',
        'description',
        'quantity',
        'unit',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'activity_date' => 'date',
        'quantity' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the crop that owns the activity.
     */
    public function crop(): BelongsTo
    {
        return $this->belongsTo(Crop::class);
    }
}