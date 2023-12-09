import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../Context/Auth/AuthContext';
import './Profile.css';

const Profile = () => {
    const Context = useContext(AuthContext);
    const { user_details, isDoc, AuthToken, baseUrl, setProgress } = Context;

    const [name, setName] = useState("");
    const [gender, setGender] = useState("other");
    const [contact, setContact] = useState("");
    const [hospital, setHospital] = useState("");
    const [BG, setBG] = useState("");
    const [dob, setDob] = useState("2001-01-01");
    const [specialization, setSpecialization] = useState("");
    const [Address, setAddress] = useState("");

    useEffect(() => {
        setProgress(10)
        if (isDoc) {
            setName(user_details.name)
            setGender(user_details.gender)
            setContact(user_details.contact)
            setHospital(user_details.hospital)
            setSpecialization(user_details.specialization)
            setAddress(user_details.clinic_address)
            setProgress(100)

        } else {

            setDob(user_details.dob ?? "2001-01-01");
            setName(user_details.name)
            setGender(user_details.gender)
            setBG(user_details.BG || "")
            setContact(user_details.contact)
            setAddress(user_details.address)
            setProgress(100)

        }
    }, [user_details, isDoc])


    const handleSaveClick = () => {
        setProgress(50)
        if (isDoc) {

            fetch(`${baseUrl}/doctor/my-profile`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${AuthToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    gender: gender,
                    contact: contact,
                    hospital: hospital,
                    specialization: specialization,
                    clinic_address: Address,
                })
            })
                .then(response => response.json())
                .then(data => {
                    setProgress(100)
                    if (data.details) {
                        console.log(data);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });

        } else {

            fetch(`${baseUrl}/patient/my-profile`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${AuthToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    gender: gender,
                    contact: contact,
                    dob: dob,
                    specialization: specialization,
                    BG: BG,
                    address: Address,
                })
            })
                .then(response => response.json())
                .then(data => {
                    setProgress(100)
                    if (data.details) {
                        console.log(data);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });

        }
    }

    return (
        <div className='profile'>
            <div className='profile-top'>
                <span className='material-symbols-outlined'>account_circle</span>
                My Profile
            </div>

            <div>
                <p>Name</p>
                <div>
                    <span className='material-symbols-outlined'>person</span>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <p>Gender</p>
                <div>
                    <span className='material-symbols-outlined'>{(gender === "male" || gender === "female") ? gender : "transgender"}</span>

                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="other">Prefer not to say</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </div>

            {(!isDoc) && (<div>
                <p>Date of Birth</p>
                <div>
                    <span className='material-symbols-outlined'>cake</span>
                    <input
                        type='date'
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />
                </div>
            </div>)}


            <div>
                <p>Contact</p>
                <div>
                    <span className='material-symbols-outlined'>call</span>
                    <input
                        type='text'
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                </div>
            </div>
            {(!isDoc) && (<div>
                <p>Blood Group</p>
                <div>
                    <span className='material-symbols-outlined'>bloodtype</span>
                    <input
                        type='text'
                        value={BG}
                        onChange={(e) => setBG(e.target.value)}
                    />
                </div>
            </div>)}

            {(isDoc) && (<div>
                <p>Hospital</p>
                <div>
                    <span className='material-symbols-outlined'>local_hospital</span>
                    <input
                        type='text'
                        value={hospital}
                        onChange={(e) => setHospital(e.target.value)}
                    />
                </div>
            </div>)}

            {(isDoc) && (<div>
                <p>Specialization</p>
                <div>
                    <span className='material-symbols-outlined'>hotel_class</span>
                    <input
                        type='text'
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                    />
                </div>
            </div>)}

            <div>
                <p> {isDoc ? "Hospital Address" : "Address"} </p>
                <div>
                    <span className='material-symbols-outlined'>location_on</span>
                    <textarea
                        type='text'
                        value={Address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
            </div>

            <button onClick={handleSaveClick}>Save</button>
        </div>
    );
};

export default Profile;
