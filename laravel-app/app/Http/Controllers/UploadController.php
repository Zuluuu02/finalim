<?

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Upload;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg,gif',
            'style' => 'required|string',
        ]);

        $filePath = $request->file('file')->store('uploads');

        $upload = Upload::create([
            'file_path' => $filePath,
            'style' => $request->style,
        ]);

        return response()->json(['message' => 'File uploaded successfully!', 'upload' => $upload]);
    }
}
