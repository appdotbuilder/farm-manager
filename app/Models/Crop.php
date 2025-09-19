<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Crop
 *
 * @property int $id
 * @property string $name
 * @property string $type
 * @property \Illuminate\Support\Carbon $planting_date
 * @property \Illuminate\Support\Carbon $expected_harvest_date
 * @property string $field_location
 * @property string $status
 * @property string|null $notes
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CropActivity> $activities
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Crop newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Crop newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Crop query()
 * @method static \Illuminate\Database\Eloquent\Builder|Crop whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Crop whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Crop whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Crop wherePlantingDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Crop whereExpectedHarvestDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Crop whereFieldLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Crop whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Crop whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Crop whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Crop whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Crop whereUpdatedAt($value)
 * @method static \Database\Factories\CropFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Crop extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'type',
        'planting_date',
        'expected_harvest_date',
        'field_location',
        'status',
        'notes',
        'user_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'planting_date' => 'date',
        'expected_harvest_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the crop.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all activities for the crop.
     */
    public function activities(): HasMany
    {
        return $this->hasMany(CropActivity::class);
    }

    /**
     * Scope a query to only include crops for a specific user.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  int  $userId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope a query to only include crops with a specific status.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $status
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWithStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}