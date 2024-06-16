import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdateProfileMediaForm from './Partials/UpdateProfileMediaForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    const [uploadedPhotos, setUploadedPhotos] = useState([]);

    // Function to handle new uploads
    const handleNewUpload = (photoUrl) => {
        setUploadedPhotos([...uploadedPhotos, photoUrl]);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Profile Picture Section */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="flex justify-center">
                            <UpdateProfileMediaForm className="w-full" />
                        </div>
                    </div>

                    {/* New section for uploaded photos */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-center">Uploaded Photos</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {uploadedPhotos.map((photoUrl, index) => (
                                <div key={index} className="relative">
                                    <img src={photoUrl} alt={`Uploaded ${index + 1}`} className="max-w-full h-auto border rounded-lg shadow-sm" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Existing sections */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
