import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { saveAppointment, createAppointment, getAppointments, deleteAppointment } from '../utility/utility';

const BookAppointment = ({ doctor }) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = daysOfWeek[new Date().getDay()];
    const navigate = useNavigate();

    const [isBooked, setIsBooked] = useState(false);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchedAppointments = getAppointments();
        setAppointments(fetchedAppointments);

        const existingAppointment = fetchedAppointments.find(
            appointment => appointment.doctorRegistrationNumber === doctor?.registration_number
        );

        if (existingAppointment) {
            setIsBooked(true);
        }
    }, [doctor?.registration_number]);

    const isAvailableToday = doctor?.availability?.includes(today);

    const handleBookAppointment = () => {
        const appointment = createAppointment(doctor);
        saveAppointment(appointment);

        toast.success(`Appointment scheduled for ${doctor?.name} successfully!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });

        setIsBooked(true);

        setTimeout(() => {
            navigate('/bookings');
        }, 1500);
    };

    const handleCancelAppointment = () => {
        const existingAppointment = appointments.find(
            appointment => appointment.doctorRegistrationNumber === doctor?.registration_number
        );

        if (existingAppointment) {
            deleteAppointment(existingAppointment.id);
        }

        toast.error(`Appointment with ${doctor?.name} cancelled`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });

        setIsBooked(false);
    };

    const handleAppointmentToggle = () => {
        if (!isBooked) {
            handleBookAppointment();
        } else {
            handleCancelAppointment();
        }
    };

    return (
        <div className='bg-white rounded-xl p-8 space-y-5'>
            <h1 className='font-extrabold text-2xl md:text-3xl text-center'>Book an Appointment</h1>
            <div className='border-b-2 border-dashed border-gray-300'></div>
            <div className='flex justify-between items-center'>
                <h3 className='font-bold text-lg'>Availability</h3>
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${isAvailableToday
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                    }`}>
                    <div className={`w-2 h-2 rounded-full ${isAvailableToday ? "bg-green-500" : "bg-red-500"}`}></div>
                    <span className="font-medium">
                        {isAvailableToday
                            ? `Available today (${today})`
                            : `Not available today (${today})`
                        }
                    </span>
                </div>
            </div>
            <div className='border-b-2 border-dashed border-gray-300'></div>
            <div className='bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-md flex items-center justify-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className='text-sm text-center'>
                    Due to high patient volume, we are currently accepting appointments for today only. We appreciate your understanding and cooperation.
                </p>
            </div>
            <button
                onClick={handleAppointmentToggle}
                className={`relative w-full cursor-pointer items-center justify-center px-5 py-3 overflow-hidden font-medium transition-all ${isBooked ? 'bg-red-600' : 'bg-blue-600'} rounded-full hover:bg-white group`}
                disabled={!isAvailableToday}
                aria-label={isBooked ? 'Cancel Appointment' : 'Book Appointment Now'}
            >
                <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
                <span className={`relative w-full text-center text-white transition-colors duration-200 ease-in-out ${isBooked ? 'group-hover:text-red-600' : 'group-hover:text-blue-600'}`}>
                    {isBooked ? 'Cancel Appointment' : 'Book Appointment Now'}
                </span>
            </button>
            {!isAvailableToday && (
                <p className="text-center text-red-500 text-sm mt-2">
                    Doctor is not available today. Please check back on {doctor?.availability?.join(', ')}.
                </p>
            )}

            {isBooked && (
                <p className="text-center text-blue-600 text-sm mt-2">
                    You already have an appointment with this doctor. Click the button above to cancel.
                </p>
            )}
        </div>
    );
};

BookAppointment.propTypes = {
    doctor: PropTypes.shape({
        name: PropTypes.string,
        registration_number: PropTypes.string,
        availability: PropTypes.arrayOf(PropTypes.string),
        fee: PropTypes.number,
        image: PropTypes.string,
    }),
};

BookAppointment.defaultProps = {
    doctor: {
        name: '',
        registration_number: '',
        availability: [],
        fee: 0,
        image: '',
    },
};

export default BookAppointment;