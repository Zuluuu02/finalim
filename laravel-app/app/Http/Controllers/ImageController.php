<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function destroy(Request $request)
    {
        $imagePath = $request->input('image');
        // Assuming the image path is stored in the 'uploads' folder
        $relativePath = str_replace('/storage/', '', $imagePath);

        if (Storage::exists($relativePath)) {
            Storage::delete($relativePath);
            return response()->json(['success' => true]);
        }

        return response()->json(['error' => 'Image not found'], 404);
    }
}
