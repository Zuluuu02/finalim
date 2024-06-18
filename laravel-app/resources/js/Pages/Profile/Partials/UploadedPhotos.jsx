import React from 'react';

const UploadedPhotos = ({ photos }) => {
    return (
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <h3 className="text-lg font-medium text-gray-900">Uploaded Photos</h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                    <div key={index} className="aspect-w-1 aspect-h-1">
                        <img src={photo} alt={`Uploaded Photo ${index + 1}`} className="object-cover rounded-lg shadow" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadedPhotos;
