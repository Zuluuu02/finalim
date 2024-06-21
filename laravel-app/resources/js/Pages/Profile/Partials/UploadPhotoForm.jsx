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

const UploadedPhotosForm = () => {
    const [photos, setPhotos] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const categories = ['All', 'Streetwear', 'Dress', 'Formal', 'Semi-Formal', 'Casual'];

    const fetchUploadedPhotos = async () => {
        try {
            const response = await axios.get('/uploads');
            setPhotos(response.data);
        } catch (error) {
            console.error('Error fetching uploaded photos:', error);
        }
    };

    useEffect(() => {
        fetchUploadedPhotos();
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const selectCategory = (category) => {
        setSelectedCategory(category);
        setIsDropdownOpen(false);
    };

    const openModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage('');
    };

    const handleDelete = async (image) => {
        try {
            await axios.delete(`/delete-image`, { data: { image } });
            setPhotos(photos.filter(photo => photo.path !== image));
        } catch (error) {
            console.error('Failed to delete image:', error);
        }
    };

    const filteredPhotos = selectedCategory === 'All' ? photos : photos.filter(photo => photo.style === selectedCategory);

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
                    <div className="p-6 bg-white border-b border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold">Uploaded Photos</h1>
                            <div className="relative z-50">
                                <button
                                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                                    onClick={toggleDropdown}
                                >
                                    {selectedCategory}
                                    <svg
                                        className="-mr-1 ml-2 h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                {isDropdownOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div
                                            className="py-1"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="options-menu"
                                        >
                                            {categories.map((category) => (
                                                <button
                                                    key={category}
                                                    onClick={() => selectCategory(category)}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                                    role="menuitem"
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column"
                        >
                            {filteredPhotos.map((photo, index) => (
                                <div key={index} className="mb-4">
                                    <div className="rounded-lg overflow-hidden shadow-md relative">
                                        <img
                                            src={`/storage/${photo.path}`}
                                            alt={photo.style}
                                            className="w-full h-auto object-cover cursor-pointer transition-transform transform hover:scale-105"
                                            onClick={() => openModal(`/storage/${photo.path}`)}
                                        />
                                        <div className="p-2 bg-white">
                                            <h2 className="text-lg font-semibold">{photo.style}</h2>
                                            <button
                                                onClick={() => handleDelete(photo.path)}
                                                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                                            >
                                                Delete
                                            </button>
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
};

export default UploadedPhotosForm;
