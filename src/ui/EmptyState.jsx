import React from 'react';
import { useNavigate } from 'react-router';

const EmptyState = ({ registrationNumber }) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-800">Oops! Something went wrong</h1>
                <p className="mt-4 text-gray-600">
                    We couldn't find a doctor with the registration number:
                </p>
                <p className="mt-2 text-blue-500 font-semibold">{registrationNumber}</p>
                <p className="mt-4 text-gray-600">
                    Please check the registration number or go back to the homepage.
                </p>
                <div className="flex items-center justify-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100 cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 rtl:rotate-180"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                            />
                        </svg>
                        <span>Go back</span>
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 cursor-pointer"
                    >
                        Take me home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmptyState;