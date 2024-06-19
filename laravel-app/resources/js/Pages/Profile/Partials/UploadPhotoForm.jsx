import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-css';

const Modal = ({ isOpen, onClose, imageSrc }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed z-50 inset-0 overflow-y-auto" onClick={onClose}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white p-6">
                        <img 
                            src={imageSrc} 
                            alt="Selected" 
                            className="w-full h-full object-contain" 
                            onClick={(e) => e.stopPropagation()} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function UploadedPhotosForm() {
    const [pins, setPins] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        const fetchPins = async () => {
            try {
                const response = await axios.get('/uploads');
                const uploadedPins = response.data.map(upload => ({
                    title: upload.style,
                    image: `/storage/${upload.path}`,
                    category: upload.style
                }));
                setPins(uploadedPins);
            } catch (error) {
                console.error('Failed to fetch uploads:', error);
            }
        };

        fetchPins();
    }, []);

    const openModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage('');
    };

    const breakpointColumnsObj = {
        default: 6,
        1100: 4,
        700: 2,
        500: 1
    };

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <h1 className="text-2xl font-bold px-6 py-4">Uploaded Photos</h1> 
                    <div className="p-6 bg-white border-b border-gray-200">
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column"
                        >
                            {pins.map((pin, index) => (
                                <div key={index} className="mb-4">
                                    <div className="rounded-lg overflow-hidden shadow-md">
                                        <img
                                            src={pin.image}
                                            alt={pin.title}
                                            className="w-full h-auto object-cover cursor-pointer transition-transform transform hover:scale-105"
                                            onClick={() => openModal(pin.image)}
                                        />
                                        <div className="p-2 bg-white">
                                            <h2 className="text-lg font-semibold">{pin.title}</h2>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Masonry>
                        <Modal isOpen={isModalOpen} onClose={closeModal} imageSrc={selectedImage} />
                    </div>
                </div>
            </div>
        </div>
    );
}
