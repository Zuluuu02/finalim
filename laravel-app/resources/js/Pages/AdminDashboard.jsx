import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
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

export default function AdminDashboard({ auth }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [pins, setPins] = useState([]);

    const categories = ['All', 'Streetwear', 'Dress', 'Formal', 'Semi-Formal', 'Casual'];
    const manualPins = [
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
        {
            title: 'Semi-Formal',
            image: 'https://i.pinimg.com/564x/cf/f1/b3/cff1b35c3f8e859f838d245dcbaa0dad.jpg',
            category: 'Semi-Formal'
        },
        {
            title: 'Streetwear',
            image: 'https://i.pinimg.com/564x/9a/d2/5b/9ad25b079208197c5c96c67ca5727cdb.jpg',
            category: 'Streetwear'
        },
        {
            title: 'Dress',
            image: 'https://i.pinimg.com/564x/9a/b6/f4/9ab6f4318569978a33e00f7722e6d3e7.jpg',
            category: 'Dress'
        },
        {
            title: 'Formal',
            image: 'https://i.pinimg.com/564x/76/f6/d2/76f6d232da4e334d5ca45a705961bb1a.jpg',
            category: 'Formal'
        },
        {
            title: 'Casual',
            image: 'https://i.pinimg.com/564x/b2/67/0b/b2670ba2073d3c9d9014c0254863f84a.jpg',
            category: 'Casual'
        },
        {
            title: 'Formal',
            image: 'https://i.pinimg.com/564x/92/f2/52/92f25250719709fe1f3e5f4fc3341653.jpg',
            category: 'Formal'
        },
        {
            title: 'Semi-Formal',
            image: 'https://i.pinimg.com/564x/7e/b1/be/7eb1be1a6991b413fce8594feca563b4.jpg',
            category: 'Semi-Formal'
        },
        {
            title: 'Casual',
            image: 'https://i.pinimg.com/564x/7b/d1/67/7bd16779572618fc6ea17e543d028bd0.jpg',
            category: 'Casual'
        },
        {
            title: 'Dress',
            image: 'https://i.pinimg.com/564x/32/a6/a5/32a6a591755c53ac59e8988daaf351e9.jpg',
            category: 'Dress'
        },
        {
            title: 'Streetwear',
            image: 'https://i.pinimg.com/564x/ea/76/61/ea766105a3bbf782d90c60f9bdd6c4ce.jpg',
            category: 'Streetwear'
        },
    ];

    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    useEffect(() => {
        const fetchPins = async () => {
            try {
                const response = await axios.get('/uploads');
                const uploadedPins = response.data.map(upload => ({
                    title: upload.style,
                    image: `/storage/${upload.path}`,
                    category: upload.style
                }));
                setPins(shuffleArray([...manualPins, ...uploadedPins]));
            } catch (error) {
                console.error('Failed to fetch uploads:', error);
                setPins(shuffleArray(manualPins));
            }
        };

        fetchPins();
    }, []);

    const filteredPins = selectedCategory === 'All' ? pins : pins.filter(pin => pin.category.toLowerCase() === selectedCategory.toLowerCase());

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
            // Assuming the image path is stored in the database and can be accessed via a delete endpoint
            await axios.delete(`/delete-image`, { data: { image } });
            setPins(pins.filter(pin => pin.image !== image));
        } catch (error) {
            console.error('Failed to delete image:', error);
        }
    };

    const breakpointColumnsObj = {
        default: 6,
        1100: 4,
        700: 2,
        500: 1
    };

    return (
        <AdminAuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-2xl font-bold">Categories</h1>
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
    d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
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
                                {filteredPins.map((pin, index) => (
                                    <div key={index} className="mb-4">
                                        <div className="rounded-lg overflow-hidden shadow-md relative">
                                            <img
                                                src={pin.image}
                                                alt={pin.title}
                                                className="w-full h-auto object-cover cursor-pointer transition-transform transform hover:scale-105"
                                                onClick={() => openModal(pin.image)}
                                            />
                                            <div className="p-2 bg-white">
                                                <h2 className="text-lg font-semibold">{pin.title}</h2>
                                                <button
                                                    onClick={() => handleDelete(pin.image)}
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
        </AdminAuthenticatedLayout>
    );
}
