import React from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import BookAppointment from '../components/BookAppointment';
import EmptyState from '../ui/EmptyState';

const AvailabilityBadge = ({ day }) => (
    <span
        className="py-1 px-3 rounded-full text-[10px] sm:text-[12px] font-medium border border-[#FFA000] bg-[#FFA000]/10 text-[#FFA000]"
    >
        {day}
    </span>
);

const DoctorDetails = ({ data }) => {
    const { registration_number } = useParams();
    const doctor = data?.find(doc => doc.registration_number === registration_number);

    if (!doctor) {
        return <EmptyState registrationNumber={registration_number} />;
    }

    return (
        <div className="py-8 px-0 md:px-8 lg:px-16 space-y-6">
            {/* Header section */}
            <div className="bg-white rounded-xl py-6 px-6 sm:py-8 sm:px-8 md:py-10 md:px-12 text-center space-y-5">
                <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl">Doctor's Profile Details</h1>
                <p className="font-medium text-sm sm:text-base md:text-lg text-gray-700">{doctor.description}</p>
            </div>

            {/* Details section */}
            <div className="bg-white rounded-xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-10">
                <img
                    className="rounded-xl w-full sm:w-1/3 md:w-1/2 lg:w-[335px] lg:h-[400px] object-cover"
                    src={doctor.image}
                    alt={`Profile photo of Dr. ${doctor.name}, ${doctor.speciality}`}
                    loading="lazy"
                />
                <div className="w-full">
                    <section aria-labelledby="doctor-info">
                        <h2 id="doctor-info" className="sr-only">Doctor Information</h2>
                        <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl mb-4">{doctor.name}</h1>
                        <p className="text-gray-600 font-medium text-sm sm:text-base md:text-lg">{doctor.education}</p>
                        <p className="text-gray-600 font-medium text-sm sm:text-base md:text-lg mb-4">
                            {doctor.speciality}
                            {doctor.designation && `, ${doctor.designation}`}
                        </p>
                    </section>

                    <section aria-labelledby="workplace-info">
                        <h2 id="workplace-info" className="sr-only">Workplace Information</h2>
                        <p className="text-gray-600 font-medium text-sm sm:text-base md:text-lg">Working at:</p>
                        <p className="font-medium text-base sm:text-lg">{doctor.workplace}</p>
                    </section>

                    <div className="border-b-2 border-dashed border-gray-300 my-4"></div>

                    <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg">
                        Reg No: {doctor.registration_number}
                    </p>

                    <div className="border-b-2 border-dashed border-gray-300 mt-4"></div>

                    <section aria-labelledby="availability-info" className="my-4">
                        <h2 id="availability-info" className="font-bold text-sm sm:text-base md:text-lg">Availability</h2>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {doctor.availability?.map((day, index) => (
                                <AvailabilityBadge key={index} day={day} />
                            ))}
                        </div>
                    </section>

                    <section aria-labelledby="fee-info" className="mt-5">
                        <h2 id="fee-info" className="sr-only">Fee Information</h2>
                        <span className="font-extrabold text-sm sm:text-base md:text-lg mr-4">Consultation Fee: </span>
                        <span className="font-bold text-[#176AE5] text-sm sm:text-base md:text-lg">
                            {doctor.fee} BDT
                        </span>
                        <span className="mx-2 font-light text-gray-600 text-sm sm:text-base">(incl Vat)</span>
                        <span className="text-blue-500/90 font-light text-sm sm:text-base">Per Consultation</span>
                    </section>
                </div>
            </div>

            {/* Booking section */}
            <BookAppointment doctor={doctor} />
        </div>
    );
};

AvailabilityBadge.propTypes = {
    day: PropTypes.string.isRequired,
};

DoctorDetails.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            image: PropTypes.string,
            education: PropTypes.string,
            speciality: PropTypes.string,
            designation: PropTypes.string,
            workplace: PropTypes.string,
            registration_number: PropTypes.string.isRequired,
            availability: PropTypes.arrayOf(PropTypes.string),
            fee: PropTypes.number,
            description: PropTypes.string,
        })
    ).isRequired,
};

export default DoctorDetails;