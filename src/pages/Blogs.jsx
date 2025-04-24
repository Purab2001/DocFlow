import React from 'react';
import { useLoaderData } from 'react-router';

const Blogs = () => {
    const blogs = useLoaderData();

    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                    Frequently Asked Questions
                </h2>
                <p className="text-base text-gray-700 md:text-lg">
                    Here are some of the most common questions and answers about React and its ecosystem.
                </p>
            </div>
            {/* Flexbox layout */}
            <div className="flex flex-wrap justify-center gap-5 mb-8">
                {blogs.map((blog, index) => (
                    <div
                        key={index}
                        className="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]"
                    >
                        <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
                            <svg
                                className="w-10 h-10 text-deep-purple-accent-400"
                                stroke="currentColor"
                                viewBox="0 0 52 52"
                            >
                                <polygon
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                                />
                            </svg>
                        </div>
                        <h6 className="text-base font-bold leading-5">{blog.question}</h6>
                        <div className="border-b-2 border-dashed border-gray-300 my-3"></div>
                        <p className="text-sm text-gray-600">{blog.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blogs;