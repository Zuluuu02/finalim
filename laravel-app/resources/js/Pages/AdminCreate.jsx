import React, { useState } from 'react';
import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';

export default function Create({ auth }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedStyle, setSelectedStyle] = useState('');
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setUploadStatus('Please select an image to upload.');
            return;
        }
        if (!selectedStyle) {
            setUploadStatus('Please select a style for the photo.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('style', selectedStyle);

        try {
            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Success response:', response.data);

            Inertia.visit('/dashboard');

            setUploadStatus(`File uploaded successfully with style: ${selectedStyle}!`);
        } catch (error) {
            console.error('There was a problem with the upload:', error);
            setUploadStatus('Failed to upload file. Please try again.');
        }
    };

    return (
        <AdminAuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Upload Picture</h2>}
        >
            <Head title="Upload Picture" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="file-upload" className="block text-gray-700 font-semibold mb-2">Select a picture to upload:</label>
                                <input
                                    type="file"
                                    id="file-upload"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full"
                                />
                            </div>
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
                            <div className="mb-4">
                                <label htmlFor="style-select" className="block text-gray-700 font-semibold mb-2">Select the style of the photo:</label>
                                <select
                                    id="style-select"
                                    value={selectedStyle}
                                    onChange={handleStyleChange}
                                    className="w-full bg-white border border-gray-300 rounded py-2 px-3 text-gray-700"
                                >
                                    <option value="">-- Select Style --</option>
                                    <option value="casual">Casual</option>
                                    <option value="semi-formal">Semi-Formal</option>
                                    <option value="formal">Formal</option>
                                    <option value="dress">Dress</option>
                                    <option value="streetwear">Streetwear</option>
                                </select>
                            </div>
                            {uploadStatus && (
                                <div className={`mb-4 p-2 rounded-lg ${uploadStatus.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {uploadStatus}
                                </div>
                            )}
                            <div>
                                <button
                                    type="submit"
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                                >
                                    Upload
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
