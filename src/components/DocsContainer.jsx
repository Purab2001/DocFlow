import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DocCard from './DocCard';

const DocsContainer = ({ doctors }) => {
    const [visibleDoctors, setVisibleDoctors] = useState([]);
    const [showAll, setShowAll] = useState(false);

    // Update the list of visible doctors based on the "showAll" state
    useEffect(() => {
        if (showAll) {
            setVisibleDoctors(doctors);
        } else {
            setVisibleDoctors(doctors.slice(0, 6));
        }
    }, [doctors, showAll]);

    // Handle toggling between "View All" and "View Less"
    const handleToggleDoctors = () => {
        setShowAll((prev) => !prev);
        if (showAll) {
            window.scrollTo({
                top: 800,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="py-16 space-y-5">
            <h1 className="text-center font-extrabold text-3xl md:text-4xl">Our Best Doctors</h1>
            <p className="text-center font-medium text-xs sm:text-sm md:text-base text-gray-700">
                Meet our exceptional team of healthcare professionals who bring years of expertise and compassionate care to every patient interaction. From specialists to <br /> general practitioners, our doctors are committed to providing personalized treatment plans tailored to your unique health needs.
            </p>
            <div className="px-2 md:px-8 lg:px-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    {visibleDoctors.map((doctor) => (
                        <DocCard key={doctor.id} doctor={doctor} />
                    ))}
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={handleToggleDoctors}
                        className="relative cursor-pointer items-center justify-start px-5 py-3 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-white group"
                        aria-label={showAll ? 'View less doctors' : 'View all doctors'}
                    >
                        <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
                        <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-blue-600">
                            {showAll ? 'View Less Doctors' : 'View All Doctors'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

DocsContainer.propTypes = {
    doctors: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            image: PropTypes.string,
            speciality: PropTypes.string,
            experience: PropTypes.number,
            registration_number: PropTypes.string.isRequired,
            availability: PropTypes.arrayOf(PropTypes.string),
        })
    ).isRequired,
};

DocsContainer.defaultProps = {
    doctors: [],
};

export default DocsContainer;