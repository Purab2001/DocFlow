import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const Badge = ({ text, color }) => (
    <span className={`border border-${color} bg-${color}/10 text-${color} py-0.5 px-2 rounded-full text-xs font-medium`}>
        {text}
    </span>
);

const DocCard = ({ doctor }) => {
    const { image, name, education, speciality, experience, registration_number, availability } = doctor;

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = daysOfWeek[new Date().getDay()];

    // Determine if the doctor is available today
    const isAvailableToday = availability && availability.includes(today);

    // Scroll to the top when viewing details
    const handleViewDetails = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className="card bg-base-100 relative rounded-xl">
            <figure className="overflow-hidden pt-0 lg:pt-6">
                <img
                    src={image}
                    alt={`Profile picture of Dr. ${name}`}
                    width="347"
                    height="248"
                    className="w-[347px] h-[248px] object-cover object-[center_17%] rounded-lg"
                />
            </figure>

            <div className="card-body">
                <div className="mb-2 flex gap-2 flex-wrap">
                    {isAvailableToday ? (
                        <Badge text="Available" color="[#09982F]" />
                    ) : (
                        <Badge text="Unavailable" color="red-500" />
                    )}
                    <Badge text={`${experience}+ Experience`} color="[#176AE5]" />
                </div>

                <h2 className="card-title">{name}</h2>
                <p className="font-medium text-gray-700">{education} - {speciality}</p>
                <div className="border-b-2 border-dashed opacity-10"></div>
                <p className="font-medium text-gray-700">Reg No: {registration_number}</p>

                <div className="card-actions w-full mt-3">
                    <Link
                        to={`/doctor-details/${registration_number}`}
                        className="w-full"
                        onClick={() => handleViewDetails(registration_number)}
                    >
                        <button
                            className="w-full text-center py-2.5 px-4 rounded-full bg-white text-[#176AE5] border-2 border-[#176AE5] hover:bg-[#176AE5] hover:text-white transition-colors duration-300 font-medium cursor-pointer"
                            aria-label={`View details of Dr. ${name}`}
                        >
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

DocCard.propTypes = {
    doctor: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string.isRequired,
        education: PropTypes.string,
        speciality: PropTypes.string,
        experience: PropTypes.number,
        registration_number: PropTypes.string.isRequired,
        availability: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};

DocCard.defaultProps = {
    doctor: {
        image: '',
        education: 'Not specified',
        speciality: 'Not specified',
        experience: 0,
        availability: [],
    },
};

export default DocCard;