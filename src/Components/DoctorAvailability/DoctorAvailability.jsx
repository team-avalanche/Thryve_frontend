// DoctorAvailability.js

import React, { useState } from 'react';
import './DoctorAvailability.css';

const initialAvailability = {
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

function getTimeSlot(hour) {
    if (hour >= 0 && hour < 12) {
        return hour + ":00 am to " + (hour + 1) + ":00 am";
    } else if (hour === 12) {
        return "12:00 pm to 1:00 pm";
    } else {
        return (hour - 12) + ":00 pm to " + (hour - 11) + ":00 pm";
    }
}

function DoctorAvailability() {
    const [availability, setAvailability] = useState(initialAvailability);
    const [isEditing, setIsEditing] = useState(false);

    const handleSlotChange = (day, hour, newValue) => {
        const updatedAvailability = { ...availability };
        if (!updatedAvailability[day]) {
            updatedAvailability[day] = {};
        }

        if (newValue === '0') {
            delete updatedAvailability[day][hour];
        } else {
            updatedAvailability[day][hour] = newValue;
        }

        setAvailability(updatedAvailability);
    };


    const handleUpdate = () => {
        console.log(availability);
    };

    return (
        <div className="availability-container">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(24).keys()].map((hour) => (
                        <tr key={hour}>
                            <td>{getTimeSlot(hour)}</td>
                            {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                                <td key={day}>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            value={availability[day]?.[hour] || ''}
                                            onChange={(e) => handleSlotChange(day, hour, e.target.value)}
                                        />
                                    ) : (
                                        availability[day]?.[hour] !== undefined && availability[day]?.[hour] !== 0 ? (
                                            availability[day]?.[hour] + " slots"
                                        ) : null
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='child-row-center'>
                <button onClick={() => { isEditing ? handleUpdate() : console.log("Editing enabled"); setIsEditing(!isEditing) }}>
                    {isEditing ? 'Save' : 'Enable Editing'}
                </button>
            </div>

        </div>
    );
}

export default DoctorAvailability;
