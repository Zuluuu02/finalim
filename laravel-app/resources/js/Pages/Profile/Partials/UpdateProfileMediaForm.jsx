import React, { useState } from 'react';

export default function UpdateProfileMediaForm({ className }) {
    const [profilePicture, setProfilePicture] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [description, setDescription] = useState('');

    const handleProfilePictureChange = (e) => {
        setProfilePicture(URL.createObjectURL(e.target.files[0]));
    };

    const handleCoverPhotoChange = (e) => {
        setCoverPhoto(URL.createObjectURL(e.target.files[0]));
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission, e.g., via an API call
        console.log({
            profilePicture,
            coverPhoto,
            description,
        });
    };

    const handleDelete = () => {
        // Handle the deletion logic
        console.log('Delete profile picture, cover photo, and description');
        setProfilePicture(null);
        setCoverPhoto(null);
        setDescription('');
    };

    return (
        <div className={`${className} space-y-6`}>
            <form onSubmit={handleSubmit}>
                <div className="relative mb-8">
                    <label className="block text-gray-700 mb-2">Cover Photo</label>
                    <input type="file" onChange={handleCoverPhotoChange} className="block mb-4" />
                    {coverPhoto && <img src={coverPhoto} alt="Cover" className="w-full h-48 object-cover border border-gray-300 mb-4" />}

                    <div className="absolute bottom-0 right-0 transform translate-y-1/2">
                        <label className="block text-gray-700 mb-2">Profile Picture</label>
                        <input type="file" onChange={handleProfilePictureChange} className="block mb-4" />
                        {profilePicture && 
                            <div className="relative inline-block">
                                <img src={profilePicture} alt="Profile" className="w-24 h-24 rounded-full border-4 border-white" />
                            </div>
                        }
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={handleDescriptionChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        rows="3"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Save
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
}
