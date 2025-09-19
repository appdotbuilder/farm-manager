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
        Schema::create('crops', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type');
            $table->date('planting_date');
            $table->date('expected_harvest_date');
            $table->string('field_location');
            $table->enum('status', ['planted', 'seedling', 'growing', 'harvest_ready', 'harvested'])->default('planted');
            $table->text('notes')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            
            // Add indexes for performance
            $table->index('user_id');
            $table->index('status');
            $table->index('planting_date');
            $table->index(['user_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crops');
    }
};