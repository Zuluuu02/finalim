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
            'user_id' => 'required|exists:users,id',
        ]);

        $path = $request->file('file')->store('uploads');

        $upload = new Upload();
        $upload->path = $path;
        $upload->style = $request->input('style');
        $upload->user_id = $request->input('user_id');
        $upload->save();

        return response()->json(['message' => 'File uploaded successfully', 'style' => $request->input('style')], 200);
    }

    public function index()
    {
        $uploads = Upload::all();
        return response()->json($uploads);
    }
}
