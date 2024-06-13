<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Upload;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|image',
            'style' => 'required|string',
        ]);

        $path = $request->file('file')->store('uploads', 'public');

        $upload = new Upload();
        $upload->path = $path;
        $upload->style = $request->input('style');
        $upload->save();

        return response()->json(['message' => 'File uploaded successfully']);
    }

    public function index()
    {
        $uploads = Upload::all();
        return response()->json($uploads);
    }
}
