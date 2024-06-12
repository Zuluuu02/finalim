<?php

// app/Http/Controllers/PhotoController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Photo;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'image' => 'required|image|max:2048',
        ]);

        $imagePath = $request->file('image')->store('photos', 'public');

        $photo = new Photo();
        $photo->title = $request->title;
        $photo->category = $request->category;
        $photo->image_path = $imagePath;
        $photo->save();

        return response()->json($photo);
    }

    public function index()
    {
        $photos = Photo::all();
        return response()->json($photos);
    }
}
