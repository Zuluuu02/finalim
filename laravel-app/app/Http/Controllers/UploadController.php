<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        // Validate the request
        $request->validate([
            'file' => 'required|image|max:2048',
            'style' => 'required|string',
        ]);

        // Handle the file upload
        if ($request->file('file')->isValid()) {
            $path = $request->file('file')->store('public/uploads');

            // Generate the URL to the file
            $url = Storage::url($path);

            return response()->json(['imageUrl' => $url], 200);
        }

        return response()->json(['error' => 'File upload failed.'], 500);
    }
}
