export const saveAppointment = (appointment) => {
    const existingAppointments = getAppointments();
    localStorage.setItem('appointments', JSON.stringify([...existingAppointments, appointment]));
};

export const getAppointments = () => {
    return JSON.parse(localStorage.getItem('appointments') || '[]');
};

export const deleteAppointment = (appointmentId) => {
    const existingAppointments = getAppointments();
    const updatedAppointments = existingAppointments.filter(
        appointment => appointment.id !== appointmentId
    );
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
};

export const createAppointment = (doctor) => {
    return {
        id: Date.now(),
        doctorId: doctor?.id,
        doctorRegistrationNumber: doctor?.registration_number,
        doctorName: doctor?.name,
        education: doctor?.education,
        speciality: doctor?.speciality,
        fee: doctor?.fee,
        date: new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        time: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        }),
        bookedOn: new Date().toISOString()
    };
};