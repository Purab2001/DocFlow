import React, { useState, useEffect } from 'react';
import { getAppointments, deleteAppointment } from '../utility/utility';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import AppointmentChart from '../components/Recharts'; // Renamed from Recharts
import PropTypes from 'prop-types';

// Extract to a utility file
const showToast = (message, type = 'success') => {
    toast[type](message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    });
};

const AppointmentCard = ({ appointment, onCancel }) => (
    <div className="bg-white rounded-xl p-6 sm:p-8 md:p-10 space-y-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
                <h3 className="font-bold text-lg sm:text-xl">{appointment.doctorName}</h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">
                    {appointment.education} - {appointment.speciality}
                </p>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
                Appointment Fee: {appointment.fee} Taka + Vat
            </p>
        </div>
        <div className="border-b-2 border-dashed border-gray-300"></div>
        <p className="font-medium text-sm sm:text-base md:text-lg text-gray-700">
            Appointment on: {appointment.date} at {appointment.time}
        </p>
        <button
            onClick={() => onCancel(appointment.id, appointment.doctorName)}
            className="relative cursor-pointer w-full items-center justify-center px-4 sm:px-5 py-2 sm:py-3 overflow-hidden font-medium transition-all bg-red-600 rounded-full hover:bg-white group"
            aria-label={`Cancel appointment with ${appointment.doctorName}`}
        >
            <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
            <span className="relative w-full text-center text-white transition-colors duration-200 ease-in-out group-hover:text-red-600">
                Cancel Appointment
            </span>
        </button>
    </div>
);

AppointmentCard.propTypes = {
    appointment: PropTypes.shape({
        id: PropTypes.string.isRequired,
        doctorName: PropTypes.string.isRequired,
        education: PropTypes.string,
        speciality: PropTypes.string,
        fee: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
};

const Bookings = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        setAppointments(getAppointments());
    }, []);

    const handleCancelAppointment = (id, doctorName) => {
        deleteAppointment(id);
        setAppointments(prev => prev.filter(appointment => appointment.id !== id));

        showToast(`Appointment with ${doctorName} cancelled`, 'error');
    };

    return (
        <section className="py-8 px-4 sm:px-6 md:px-8 lg:px-16 space-y-5">
            {appointments.length === 0 ? (
                <div aria-label="No appointments">
                    <h1 className="text-center font-extrabold text-2xl sm:text-3xl md:text-4xl">No Appointments Yet</h1>
                    <p className="text-center font-medium text-sm sm:text-base md:text-lg text-gray-700 my-4">
                        You haven't booked any appointments. Browse our doctors to find the right specialist for your needs.
                    </p>
                    <div className="flex justify-center mt-6 sm:mt-8">
                        <Link
                            to="/"
                            className="relative cursor-pointer items-center justify-center px-6 sm:px-8 py-2 sm:py-3 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-white group inline-block"
                        >
                            <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
                            <span className="relative text-white transition-colors duration-200 ease-in-out group-hover:text-blue-600">
                                Book Appointment Now
                            </span>
                        </Link>
                    </div>
                </div>
            ) : (
                <div aria-label="Appointment list">
                    <div className="flex justify-center w-full h-[400px] mb-16">
                        <AppointmentChart appointments={appointments} />
                    </div>
                    <h1 className="text-center font-extrabold text-2xl sm:text-3xl md:text-4xl">My Appointments</h1>
                    <p className="text-center font-medium text-sm sm:text-base md:text-lg text-gray-700 my-4">
                        Our platform connects you with verified, experienced doctors across various specialties.
                    </p>

                    <div className="space-y-5">
                        {appointments.map((appointment) => (
                            <AppointmentCard
                                key={appointment.id}
                                appointment={appointment}
                                onCancel={handleCancelAppointment}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Bookings;