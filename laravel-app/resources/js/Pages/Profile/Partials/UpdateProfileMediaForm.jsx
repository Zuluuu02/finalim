import React, { useState, useEffect } from 'react';

export default function UpdateProfileMediaForm({ className }) {
    const [profilePicture, setProfilePicture] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editMode, setEditMode] = useState(false);

    // Load data from local storage when the component mounts
    useEffect(() => {
        const savedProfilePicture = localStorage.getItem('profilePicture');
        const savedCoverPhoto = localStorage.getItem('coverPhoto');
        const savedName = localStorage.getItem('name');
        const savedDescription = localStorage.getItem('description');

        if (savedProfilePicture) setProfilePicture(savedProfilePicture);
        if (savedCoverPhoto) setCoverPhoto(savedCoverPhoto);
        if (savedName) setName(savedName);
        if (savedDescription) setDescription(savedDescription);
    }, []);

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePicture(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleCoverPhotoChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setCoverPhoto(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save data to local storage
        localStorage.setItem('profilePicture', profilePicture);
        localStorage.setItem('coverPhoto', coverPhoto);
        localStorage.setItem('name', name);
        localStorage.setItem('description', description);
        setEditMode(false);
    };

    const handleDelete = () => {
        // Delete data from local storage
        localStorage.removeItem('profilePicture');
        localStorage.removeItem('coverPhoto');
        localStorage.removeItem('name');
        localStorage.removeItem('description');
        // Reset state
        setProfilePicture(null);
        setCoverPhoto(null);
        setName('');
        setDescription('');
        setEditMode(false);
    };

    return (
        <div className={`${className} space-y-6`}>
            <form onSubmit={handleSubmit}>
                <div className="relative mb-8 border-4 border-white p-2">
                    {coverPhoto && (
                        <img
                            src={coverPhoto}
                            alt="Cover"
                            className="w-full h-48 object-cover"
                        />
                    )}
                    {profilePicture && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
                            <img
                                src={profilePicture}
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-4 border-white object-cover"
                            />
                        </div>
                    )}
                </div>

                <div className="text-center mt-16">
                    <h2 className="text-xl font-semibold">{name}</h2>
                    <div className="mt-2">
                        <p>{description}</p>
                    </div>
                </div>

                {editMode && (
                    <div className="relative mb-8">
                        <label className="block text-gray-700 mb-2">Cover Photo</label>
                        <input type="file" onChange={handleCoverPhotoChange} className="block mb-4" />
                        {coverPhoto && (
                            <img
                                src={coverPhoto}
                                alt="Cover"
                                className="w-full h-48 object-cover mb-4"
                            />
                        )}

                        <label className="block text-gray-700 mb-2">Profile Picture</label>
                        <input type="file" onChange={handleProfilePictureChange} className="block mb-4" />
                        {profilePicture && (
                            <div className="relative">
                                <img
                                    src={profilePicture}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full border-4 border-white mb-2 object-cover"
                                />
                            </div>
                        )}

                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 mb-4"
                        />

                        <label className="block text-gray-700 mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={handleDescriptionChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 mb-2"
                            rows="3"
                        />
                    </div>
                )}

                {!editMode ? (
                    <button
                        type="button"
                        onClick={() => setEditMode(true)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    >
                        Edit
                    </button>
                ) : (
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
                )}
            </form>
        </div>
    );
}
