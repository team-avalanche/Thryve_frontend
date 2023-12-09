import React, { useState } from 'react';
import "./DoctorCard.css"
import Modal from '../../Modal/Modal';

const DoctorCard = ({ DocObj }) => {
    const [ModalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date()); // To track the selected appointment date
    const [selectedSlot, setSelectedSlot] = useState(null); // To track the selected slot
    const [appointmentPurpose, setAppointmentPurpose] = useState(""); // For the purpose of the appointment

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    // Sample data
    const doctor_availability = {
        "0": {
            "9": 5,
            "7": 2,
            "13": 0
        },
        "2": {
            "14": 3,
            "15": 1,
            "21": 5
        },
        "5": {
            "20": 0,
            "21": 4,
            "22": 5
        }
    };

    // Function to handle slot selection
    const handleSlotSelection = (slot) => {
        setSelectedSlot(slot);
    };

    // Function to handle date selection
    const handleDateChange = (e) => {
        setSelectedDate(new Date(e.target.value));
    };

    // Function to render checkboxes based on availability for the selected date
    const renderCheckBoxes = () => {
        const dayOfWeek = selectedDate.getDay();
        const availability = doctor_availability[dayOfWeek] || {};

        return Object.keys(availability).map((slot) => (
            <label key={slot}>
                <input
                    type="checkbox"
                    value={slot}
                    disabled={availability[slot] <= 0}
                    onChange={() => handleSlotSelection(slot)}
                    checked={selectedSlot === slot}
                />
                {getTimeSlot(slot)} : {availability[slot]} slots available
            </label>
        ));
    };

    // Function to send the appointment data to the backend
    const handleSubmit = () => {
        if (selectedSlot && appointmentPurpose) {
            // Construct the data to send
            const appointmentData = {
                doctor_id: "string", // Replace with the actual doctor ID
                date: selectedDate.toISOString().split('T')[0],
                time_slot: parseInt(selectedSlot),
                purpose: appointmentPurpose
            };

            // Send the data to the backend (You will need to implement this part)
            console.log("Sending appointment data to backend:", appointmentData);

            // Close the modal after submission
            closeModal();
        } else {
            alert("Please select a slot, provide a purpose for the appointment, and select an appointment date.");
        }
    };

    return (
        <div className="card">
            <div className="doc-card-title">{DocObj.name}</div>
            <div className="info">
                <p className='doc-card-info' >
                    <span>
                        Contact : {DocObj.contact}
                    </span>
                    <span>
                        Hospital : {DocObj.hospital}
                    </span>
                    <span>
                        Specialization : {DocObj.specialization}
                    </span>
                    <span>
                        Address : {DocObj.clinic_address}
                    </span>
                </p>
            </div>
            <div className="footer">
                <button type="button" className="action" onClick={openModal}>
                    Book Appointment
                </button>
            </div>
            {ModalOpen && (
                <Modal>
                    <div className="slots-container">
                        <h2>Appointment Date</h2>
                        <input
                            type="date"
                            value={selectedDate.toISOString().split('T')[0]}
                            onChange={handleDateChange}
                            className='slot-date'
                        />
                        <h2>Available slots</h2>
                        <div className="checkboxes">
                            {renderCheckBoxes()}
                        </div>
                        <div className="appointment-purpose">
                            <label>
                                <h3>Purpose of Appointment</h3>
                                <textarea
                                    type="text"
                                    rows="3" cols="40"
                                    value={appointmentPurpose}
                                    onChange={(e) => setAppointmentPurpose(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="modal-btn-container">
                            <button type="submit" onClick={handleSubmit}>
                                Book
                            </button>
                            <button onClick={closeModal}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

// getTimeSlot function remains the same
function getTimeSlot(hour) {
    if (hour >= 0 && hour < 12) {
        return hour + ":00 am to " + (hour + 1) + ":00 am";
    } else if (hour === 12) {
        return "12:00 pm to 1:00 pm";
    } else {
        return (hour - 12) + ":00 pm to " + (hour - 11) + ":00 pm";
    }
}


export default DoctorCard;
