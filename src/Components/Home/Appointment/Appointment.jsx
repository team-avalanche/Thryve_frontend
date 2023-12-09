import React, { useContext } from 'react'
import "./Appointment.css"
import AuthContext from '../../../Context/Auth/AuthContext'

const Appointment = ({ AppointmentObj, SlotTiming }) => {
    const context = useContext(AuthContext)
    const { isDoc } = context


    return (
        <div className={`appointment ${isDoc ? "" : "patient"}`} >
            {isDoc && (<div className="book">
                <div className="book-info">
                    <span>Gender : {AppointmentObj.patient.gender}</span>
                    <span>DOB : {AppointmentObj.patient.dob.getDate()}/{AppointmentObj.patient.dob.getMonth()}/{AppointmentObj.patient.dob.getFullYear()}</span>
                    <span>Contact : {AppointmentObj.patient.contact}</span>
                    <button id='cancel-appointment'>Cancel Appointment</button>
                </div>


                <div className="cover">
                    <div className="book-info-cover text-centre">

                        <h2>{AppointmentObj.patient.name}</h2>

                        <p>Purpose : {AppointmentObj.purpose}</p>

                    </div>
                </div>
            </div>)}
            {((!isDoc) && (AppointmentObj._id)) && (<div className="book patient">
                <div className="book-info">
                    <span>Date : {AppointmentObj.date}</span>
                    <span>Time : {SlotTiming}</span>
                    <span>Contact : {AppointmentObj.doctor.contact}</span>
                    <button id='cancel-appointment'>Cancel Appointment</button>
                </div>


                <div className="cover">
                    <div className="book-info-cover text-centre">

                        <h2>{AppointmentObj.doctor.name}</h2>

                        <p>Purpose : {AppointmentObj.purpose}</p>

                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default Appointment
