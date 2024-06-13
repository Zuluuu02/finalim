import React from 'react';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="LeSunshine - Discover Everything" />
            <header className="w-full bg-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center py-6 px-6">
                    <div className="flex items-center space-x-3">
                        <img src="/sunshine.v2.png" alt="LeSunshine Logo" className="h-15 w-14" />
                        <div className="text-3xl font-extrabold text-black">
                            LeSunshine
                        </div>
                    </div>
                    <nav className="flex items-center space-x-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="btn-primary bg-white text-blue-500 font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-gray-100 transition duration-200"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <div className="flex space-x-2">
                                <Link
                                    href={route('login')}
                                    className="text-white hover:text-gray-900 font-bold rounded-full border bg-red-500 border-red-900 px-4 py-2 transition duration-200"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="text-white hover:text-black font-bold rounded-full border bg-gray-500 border-gray-900 px-4 py-2 transition duration-200"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            </header>
            <div className="relative bg-gradient-to-br from-white to-red-400 min-h-screen flex flex-col items-center justify-center text-white px-4 sm:px-0">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://s.hdnux.com/photos/77/77/72/16776858/6/960x0.webp")' }}></div>
                <div className="absolute inset-0 bg-black opacity-70"></div>
                <div className="max-w-2xl text-center relative z-10">
                    <header className="py-10">
                        <h1 className="text-8xl font-extrabold mb-6">Get Your Next</h1>
                        <p className="text-7xl font-extrabold mb-6">New Look Outfit</p>
                        <p className="text-lg font-semibold text-gray-100 mb-80">Find tons of ideas in one place, like browsing through a treasure trove of inspiration.</p>
                    </header>
                </div>
            </div>
            <div className="bg-white py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-2xl font-bold mb-8 text-center">Discover More Of Our Outfit Inspirations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-semibold mb-2">Casual Wear</h3>
                            <p className="text-gray-700">Explore trendy and comfortable casual outfits perfect for daily wear. From chic tops to stylish jeans, find your next favorite casual look here. Ideal for hanging out with friends or running errands in style.</p>
                        </div>
                        <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-semibold mb-2">Semi-Formal</h3>
                            <p className="text-gray-700">Find glamorous semi-formal wear options for your next special event. From dazzling dresses to chic jumpsuits, our collection ensures you shine. Perfect for cocktail parties, weddings, and other celebrations.</p>
                        </div>
                        <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-semibold mb-2">Formal Wear</h3>
                            <p className="text-gray-700">Discover elegant formal wear perfect for black-tie events. Our selection includes classic gowns and sophisticated suits to make you stand out. Be the epitome of grace and style at your next gala or formal event.</p>
                        </div>
                        <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 col-span-2 lg:col-span-1">
                            <h3 className="text-xl font-semibold mb-2">Dresses</h3>
                            <p className="text-gray-700">Browse our wide range of dresses, from casual sundresses to elegant evening gowns. Find the perfect dress for any occasion, whether it's a beach day, a date night, or a formal dinner.</p>
                        </div>
                        <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 col-span-2 lg:col-span-1">
                            <h3 className="text-xl font-semibold mb-2">Streetwear</h3>
                            <p className="text-gray-700">Stay fit and fashionable with our range of streetwear. Whether it’s yoga pants, running gear, or athletic tops, our collection supports your active lifestyle. Perfect for hitting the gym, going for a run, or casual outings.</p>
                        </div>
                    </div>
                    <div className="mt-12 flex justify-center items-center">
                        <div className="text-sm text-gray-900 text-center">
                            New to LeSunshine? <Link href="#" className="underline hover:text-gray-300 ml-1 transition duration-200">Learn more About Us</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
