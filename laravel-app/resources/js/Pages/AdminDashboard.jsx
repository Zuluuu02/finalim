import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const Modal = ({ isOpen, onClose, imageSrc }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" onClick={onClose}>
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

export default function AdminDashboard({ auth }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const categories = ['All', 'Streetwear', 'Dress', 'Formal', 'Semi-Formal', 'Casual'];
    const pins = [
        {
            title: 'Streetwear',
            image: 'https://i.pinimg.com/564x/e8/a9/f4/e8a9f42c68c0abbab918c24baf7edd06.jpg',
            category: 'Streetwear'
        },
        {
            title: 'Dress',
            image: 'https://i.pinimg.com/736x/ea/f5/ac/eaf5ac6da2020b35553cc5c52bcf0813.jpg',
            category: 'Dress'
        },
        {
            title: 'Formal',
            image: 'https://i.pinimg.com/736x/1a/b3/e6/1ab3e6038c13132d22cb6ad410edaeee.jpg',
            category: 'Formal'
        },
        {
            title: 'Semi-Formal',
            image: 'https://i.pinimg.com/564x/73/13/1d/73131dba1c92172b02946a9e109bcdea.jpg',
            category: 'Semi-Formal'
        },
        {
            title: 'Casual',
            image: 'https://i.pinimg.com/736x/65/3b/e6/653be667dde96622922c5914f3fb0d63.jpg',
            category: 'Casual'
        },
        {
            title: 'Dress',
            image: 'https://i.pinimg.com/564x/06/ed/b6/06edb68e59f7a314ff8edef7ce767fdd.jpg',
            category: 'Dress'
        },
        {
            title: 'Formal',
            image: 'https://i.pinimg.com/564x/42/3c/d4/423cd4ad8d23627ae822c5f64b176342.jpg',
            category: 'Formal'
        },
        {
            title: 'Semi-Formal',
            image: 'https://i.pinimg.com/564x/94/27/5c/94275c6214f79aa251265e463f12dd90.jpg',
            category: 'Semi-Formal'
        },
        {
            title: 'Streetwear',
            image: 'https://i.pinimg.com/564x/0d/df/20/0ddf207e792745d075901b0c3902db3b.jpg',
            category: 'Streetwear'
        },
        {
            title: 'Casual',
            image: 'https://i.pinimg.com/736x/83/06/72/830672f6faf989c0f3b55ca5c39adcc5.jpg',
            category: 'Casual'
        },
    ];

    const filteredPins = selectedCategory === 'All' ? pins : pins.filter(pin => pin.category === selectedCategory);

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

    return (
        <AdminAuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6 relative inline-block text-left">
                        <button
                            type="button"
                            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                            onClick={toggleDropdown}
                        >
                            {selectedCategory}
                            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 3a1 1 0 01.707 1.707L5.414 10l5.293 5.293A1 1 0 0110 17l-6-6a1 1 0 010-1.414l6-6A1 1 0 0110 3z" clipRule="evenodd" />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    {categories.map((category, index) => (
                                        <button
                                            key={index}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            role="menuitem"
                                            onClick={() => selectCategory(category)}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredPins.map((pin, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm cursor-pointer"
                                onClick={() => openModal(pin.image)}
                            >
                                <img
                                    src={pin.image}
                                    alt={pin.title}
                                    className="w-64 h-80 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg text-gray-900">{pin.title}</h3> 
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} imageSrc={selectedImage} />
        </AdminAuthenticatedLayout>
    );
}
