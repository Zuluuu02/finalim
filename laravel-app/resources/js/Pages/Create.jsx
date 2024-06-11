import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Create({ auth }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedStyle, setSelectedStyle] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleStyleChange = (event) => {
        setSelectedStyle(event.target.value);
    };

    const handleClearPreview = () => {
        setSelectedFile(null);
        setPreviewImage(null);
        setUploadStatus('');
    };

    const handleSubmit = () => {
        if (!selectedFile || !selectedStyle) {
            setUploadStatus('Please select an image and a style.');
            return;
        }

        setUploadStatus('Uploading...');
        
        // Simulate an upload process
        setTimeout(() => {
            setUploadStatus('Upload successful!');
        }, 2000);

        console.log('File:', selectedFile);
        console.log('Style:', selectedStyle);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create</h2>}
        >
            <Head title="Create" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4">Upload an Image</h3>
                            {/* Preview the selected image */}
                            {previewImage && (
                                <div className="mb-4 relative">
                                    <img src={previewImage} alt="Preview" className="max-w-full h-auto border rounded-lg shadow-sm" />
                                    <button 
                                        onClick={handleClearPreview} 
                                        className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
                                    >
                                        &times;
                                    </button>
                                </div>
                            )}
                            {/* Input for uploading file */}
                            <input 
                                type="file" 
                                onChange={handleFileChange} 
                                className="mb-4 p-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                            />

                            <h3 className="text-lg font-semibold mt-8 mb-4">Select Style</h3>
                            {/* Dropdown for selecting style */}
                            <select 
                                value={selectedStyle} 
                                onChange={handleStyleChange} 
                                className="px-4 py-2 border rounded-lg shadow-sm mb-4 focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Select Style</option>
                                <option value="casual">Casual</option>
                                <option value="semi-formal">Semi-Formal</option>
                                <option value="formal">Formal</option>
                                <option value="dress">Dress</option>
                                <option value="streetwear">Streetwear</option>
                            </select>

                            {/* Display selected style */}
                            {selectedStyle && (
                                <div className="mb-4">
                                    <p className="font-semibold">Selected Style:</p>
                                    <p>{selectedStyle}</p>
                                </div>
                            )}

                            {/* Display upload status */}
                            {uploadStatus && (
                                <div className={`mb-4 p-2 rounded-lg ${uploadStatus.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {uploadStatus}
                                </div>
                            )}

                            {/* Submit button */}
                            <button 
                                onClick={handleSubmit} 
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
