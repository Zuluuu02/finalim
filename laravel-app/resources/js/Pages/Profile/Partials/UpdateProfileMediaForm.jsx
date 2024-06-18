import React, { useState, useEffect } from 'react';

export default function UpdateProfileMediaForm({ className }) {
    const [profilePicture, setProfilePicture] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const savedProfilePicture = localStorage.getItem('profilePicture');
        const savedName = localStorage.getItem('name');
        const savedDescription = localStorage.getItem('description');

        if (savedProfilePicture) setProfilePicture(savedProfilePicture);
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
        localStorage.setItem('name', name);
        localStorage.setItem('description', description);
        setEditMode(false);
    };

    const handleDelete = () => {
        // Delete data from local storage
        localStorage.removeItem('profilePicture');
        localStorage.removeItem('name');
        localStorage.removeItem('description');
        // Reset state
        setProfilePicture(null);
        setName('');
        setDescription('');
        setEditMode(false);
    };

    return (
        <div className={`${className} space-y-6`}>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 rounded-lg">
                <div className="relative mb-8">
                    {profilePicture ? (
                        <div className="flex justify-center">
                            <img
                                src={profilePicture}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                                <span>Add Photo</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="text-center mt-8">
                    <h2 className="text-2xl font-semibold">{name || 'Your Name'}</h2>
                    <p className="mt-2 text-gray-600">{description || 'Your description here...'}</p>
                </div>

                {editMode && (
                    <div className="mt-6 space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Profile Picture</label>
                            <input type="file" onChange={handleProfilePictureChange} className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:mr-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100" />
                            {profilePicture && (
                                <div className="mt-2">
                                    <img
                                        src={profilePicture}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full object-cover mx-auto"
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Description</label>
                            <textarea
                                value={description}
                                onChange={handleDescriptionChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                                rows="3"
                            ></textarea>
                        </div>
                    </div>
                )}

                <div className="mt-6 flex items-center justify-center">
                    {!editMode ? (
                        <button
                            type="button"
                            onClick={() => setEditMode(true)}
                            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md"
                        >
                            Edit
                        </button>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <button
                                type="submit"
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
