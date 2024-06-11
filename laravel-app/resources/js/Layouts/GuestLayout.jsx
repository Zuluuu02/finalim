import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative">
            <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center" style={{ 
                backgroundImage: 'url("/backgroundimg.png")',
                filter: 'blur(8px)', // Adjust the blur strength as needed
                zIndex: -1, // Ensure the background stays behind other content
            }}></div>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
            <div className="relative z-10 flex flex-col items-center justify-center pt-6 sm:pt-0">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white bg-opacity-90 shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
