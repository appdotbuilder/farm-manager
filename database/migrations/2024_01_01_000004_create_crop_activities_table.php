<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('crop_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('crop_id')->constrained()->onDelete('cascade');
            $table->date('activity_date');
            $table->enum('activity_type', ['irrigation', 'fertilization', 'pest_control', 'scouting', 'weeding', 'harvesting', 'other']);
            $table->text('description');
            $table->decimal('quantity', 8, 2)->nullable()->comment('Amount or quantity used');
            $table->string('unit')->nullable()->comment('Unit of measurement');
            $table->timestamps();
            
            // Add indexes for performance
            $table->index('crop_id');
            $table->index('activity_date');
            $table->index('activity_type');
            $table->index(['crop_id', 'activity_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crop_activities');
    }
};