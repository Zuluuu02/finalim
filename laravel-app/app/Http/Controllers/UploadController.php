<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Upload;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', 
            'style' => 'required|string',
        ]);

        // Store the file and get the path
        $path = $request->file('file')->store('uploads', 'public');

        // Save the path and style to the database
        $upload = new Upload();
        $upload->path = $path;
        $upload->style = $request->input('style');
        $upload->save();

        return response()->json(['message' => 'File uploaded successfully', 'path' => $path]);
    }

    public function index()
    {
        $uploads = Upload::all();
        return response()->json($uploads);
    }
}
