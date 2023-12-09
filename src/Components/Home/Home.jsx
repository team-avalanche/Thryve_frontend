import React, { useContext, useEffect, useState } from 'react';
import "./Home.css";
import AuthContext from '../../Context/Auth/AuthContext';
import Appointment from './Appointment/Appointment';

const Home = () => {
    const context = useContext(AuthContext);
    const { Loggedin, isDoc } = context;

    const [docAppointmentsToday, setDocAppointmentsToday] = useState([])
    const [P_AllAppointments, setP_AllAppointments] = useState([])

    useEffect(() => {
        if (Loggedin) {
            if (isDoc) {

                setDocAppointmentsToday([
                    {
                        "_id": "5eb7cf5a86d9755df3a6c594",
                        "doctor_id": "string",
                        "date": "2023-09-23",
                        "time_slot": 0,
                        "purpose": "string",
                        "patient": {
                            name: "Gohan",
                            gender: "male",
                            dob: new Date(),
                            contact: "9901234567",
                            address: "ABC Road, ABC city, ABC",
                        },
                        "status": "scheduled"
                    }, {
                        "_id": "5eb7cf5a86d9755df3a6c593",
                        "doctor_id": "string",
                        "date": "2023-09-23",
                        "time_slot": 0,
                        "purpose": "string",
                        "patient": {
                            name: "Goku",
                            gender: "male",
                            dob: new Date(),
                            contact: "9901234567",
                            address: "ABC Road, ABC city, ABC",
                        },
                        "status": "scheduled"
                    }, {
                        "_id": "5eb7cf5a86d9755df3a6c595",
                        "doctor_id": "string",
                        "date": "2023-09-23",
                        "time_slot": 0,
                        "purpose": "string",
                        "patient": {
                            name: "Vegeta",
                            gender: "male",
                            dob: new Date(),
                            contact: "9901234567",
                            address: "ABC Road, ABC city, ABC",
                        },
                        "status": "scheduled"
                    }, {
                        "_id": "5eb7cf5a86d9755df3a6c596",
                        "doctor_id": "string",
                        "date": "2023-09-23",
                        "time_slot": 15,
                        "purpose": "string",
                        "patient": {
                            name: "trunks",
                            gender: "male",
                            dob: new Date(),
                            contact: "9901234567",
                            address: "ABC Road, ABC city, ABC",
                        },
                        "status": "scheduled"
                    }
                ])
            } else {
                setP_AllAppointments([
                    {
                        "_id": "5eb7cf5a86d9755df3a6c594",
                        "doctor": {
                            name: "Bulma",
                            gender: "female",
                            contact: "9901234567",
                            hospital: "XYZ Hospital",
                            specialization: "Pediatritian",
                            clinic_address: "XYZ Road, XYZ city, XYZ",
                            doctor_availability: "yes"
                        },
                        "date": "2023-09-23",
                        "time_slot": 0,
                        "purpose": "string",
                        "patient": "1122wdewe",
                        "status": "scheduled"
                    }, {
                        "_id": "5eb7cf5a86d9755df3a6c593",
                        "doctor": {
                            name: "Bulma",
                            gender: "female",
                            contact: "9901234567",
                            hospital: "XYZ Hospital",
                            specialization: "Pediatritian",
                            clinic_address: "XYZ Road, XYZ city, XYZ",
                            doctor_availability: "yes"
                        },
                        "date": "2023-09-23",
                        "time_slot": 0,
                        "purpose": "string",
                        "patient": "1122wdewe",
                        "status": "scheduled"
                    }, {
                        "_id": "5eb7cf5a86d9755df3a6c595",
                        "doctor": {
                            name: "Bulma",
                            gender: "female",
                            contact: "9901234567",
                            hospital: "XYZ Hospital",
                            specialization: "Pediatritian",
                            clinic_address: "XYZ Road, XYZ city, XYZ",
                            doctor_availability: "yes"
                        },
                        "date": "2023-09-23",
                        "time_slot": 0,
                        "purpose": "string",
                        "patient": "1122wdewe",
                        "status": "scheduled"
                    }, {
                        "_id": "5eb7cf5a86d9755df3a6c596",
                        "doctor": {
                            name: "Bulma",
                            gender: "female",
                            contact: "9901234567",
                            hospital: "XYZ Hospital",
                            specialization: "Pediatritian",
                            clinic_address: "XYZ Road, XYZ city, XYZ",
                            doctor_availability: "yes"
                        },
                        "date": "2023-09-23",
                        "time_slot": 15,
                        "purpose": "string",
                        "patient": "1122wdewe",
                        "status": "scheduled"
                    }, {
                        "_id": "5eb7cf5a86d9755df3a6c597",
                        "doctor": {
                            name: "Bulma",
                            gender: "female",
                            contact: "9901234567",
                            hospital: "XYZ Hospital",
                            specialization: "Pediatritian",
                            clinic_address: "XYZ Road, XYZ city, XYZ",
                            doctor_availability: "yes"
                        },
                        "date": "2023-09-23",
                        "time_slot": 15,
                        "purpose": "string",
                        "patient": "1122wdewe",
                        "status": "scheduled"
                    }
                ])
            }
        }

    }, [Loggedin, isDoc])


    const getAppointmentsByTimeSlot = (timeSlot) => {
        return docAppointmentsToday.filter(appointment => appointment.time_slot === timeSlot);
    };

    const hasAppointmentsInTimeSlot = (timeSlot) => {
        return getAppointmentsByTimeSlot(timeSlot).length > 0;
    };

    return (
        <>
            {isDoc && (<div>
                <h1 className='home-title'>Today&apos;s Appointments</h1>
                <div className="appointment-list-super-container">
                    {[...Array(24).keys()].map(hour => (
                        hasAppointmentsInTimeSlot(hour) && (
                            <div className='appointment-list-container' key={hour}>
                                <h2 className='slot-title' >{getTimeSlot(hour)}</h2>
                                <div className='appointment-list' >
                                    {getAppointmentsByTimeSlot(hour).map(appointment => (
                                        <Appointment key={appointment._id} AppointmentObj={appointment} SlotTiming={getTimeSlot(hour)} />
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>)}
            {!isDoc && (
                <div >
                    <h1 className='home-title'>Your Appointments</h1>
                    <div className="appointment-container-patient ">
                        {P_AllAppointments.map(appointment => (
                            <Appointment key={appointment._id} AppointmentObj={appointment} SlotTiming={getTimeSlot(appointment.time_slot)} />
                        ))}
                    </div>
                </div>
            )}

        </>
    );
};

function getTimeSlot(hour) {
    if (hour >= 0 && hour < 12) {
        return hour + ":00 am to " + (hour + 1) + ":00 am";
    } else if (hour === 12) {
        return "12:00 pm to 1:00 pm";
    } else {
        return (hour - 12) + ":00 pm to " + (hour - 11) + ":00 pm";
    }
}


export default Home;
