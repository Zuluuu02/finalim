<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateUploadsTable extends Migration
{
    public function up()
    {
        Schema::create('uploads', function (Blueprint $table) {
            $table->id();
            $table->string('path');
            $table->string('style');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        // Manually update IDs to start from 1
        DB::statement('SET @new_id = 0;');
        DB::statement('UPDATE uploads SET id = @new_id := @new_id + 1;');
        DB::statement('ALTER TABLE uploads AUTO_INCREMENT = 1;');
    }

    public function down()
    {
        Schema::dropIfExists('uploads');
    }
}
