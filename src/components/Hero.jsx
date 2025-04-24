import React, { useState } from 'react';
import PropTypes from 'prop-types';
import bannerImg from '../assets/banner-img-1.png';
import bannerImg2 from '../assets/banner-img-2.jpg';

const Hero = ({ handleSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSearch(e, searchText);
        setSearchText('');
    };

    return (
        <div className="py-16 px-4 space-y-5 bg-gradient-to-t from-white to-[#EFEFEF] rounded-3xl border-3 border-white">
            <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-center">
                Dependable Care, Backed by Trusted <br /> Professionals.
            </h1>
            <p className="font-medium text-xs sm:text-sm md:text-base text-center text-gray-700">
                Our platform connects you with verified, experienced doctors across various specialties — all at your convenience. Whether it's a <br /> routine checkup or urgent consultation, book appointments in minutes and receive quality care you can trust.
            </p>
            {/* Form for searching doctors */}
            <form onSubmit={handleFormSubmit} className="flex flex-col md:flex-row justify-center items-center mb-4 md:px-24">
                <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text"
                    placeholder="Search any doctor..."
                    aria-label="Search for a doctor"
                    className="bg-white border border-gray-300 rounded-4xl w-2/3 h-12 px-4 mb-3 focus:outline-none focus:shadow-outline md:mr-2 md:mb-0"
                />
                <button
                    type="submit"
                    aria-label="Search for doctors"
                    className="relative cursor-pointer items-center justify-center px-5 py-3 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-white group"
                >
                    <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
                    <span className="relative w-full text-center text-white transition-colors duration-200 ease-in-out group-hover:text-blue-600">
                        Search Now
                    </span>
                </button>
            </form>
            {/* Banner images */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8 flex-wrap">
                <img
                    src={bannerImg}
                    alt="Doctor consultation banner"
                    loading="lazy"
                    className="w-full sm:w-2/3 md:w-1/3 object-contain"
                />
                <img
                    src={bannerImg2}
                    alt="Healthcare professionals banner"
                    loading="lazy"
                    className="hidden sm:block w-full sm:w-2/3 md:w-1/3 object-contain rounded-xl"
                />
            </div>
        </div>
    );
};

Hero.propTypes = {
    handleSearch: PropTypes.func.isRequired,
};

Hero.defaultProps = {
    handleSearch: () => { },
};

export default Hero;