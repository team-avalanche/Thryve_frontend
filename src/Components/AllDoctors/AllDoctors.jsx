import React, { useContext, useEffect, useState } from 'react'
import DoctorCard from './DoctorCard/DoctorCard'
import "./AllDoctors.css"
import AuthContext from '../../Context/Auth/AuthContext'

const AllDoctors = () => {

    const { baseUrl, Loggedin, AuthToken } = useContext(AuthContext)

    const sampelResponse = [
        {
            name: "Bulma",
            gender: "female",
            contact: "9901234567",
            hospital: "XYZ Hospital",
            specialization: "Pediatritian",
            clinic_address: "XYZ Road, XYZ city, XYZ",
            doctor_availability: "yes"
        }, {
            name: "Chi Chi",
            gender: "female",
            contact: "9901234568",
            hospital: "XYZ Hospital",
            specialization: "cardiac specialist",
            clinic_address: "XYZ Road, XYZ city, XYZ",
            doctor_availability: "yes"
        }, {
            name: "Vedal",
            gender: "female",
            contact: "9901234569",
            hospital: "XYZ Hospital",
            specialization: "eye specialist",
            clinic_address: "XYZ Road, XYZ city, XYZ",
            doctor_availability: "yes"
        }
    ]

    useEffect(() => {

        if (Loggedin && (AuthToken)) {
            fetch(`${baseUrl}/doctor/get-all-doctors`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${AuthToken}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    // Replace null values with default values
                    const modifiedData = data.map(doctor => ({
                        name: doctor.first_name || "Unknown",
                        gender: doctor.gender || "other",
                        contact: doctor.contact || "000000000",
                        hospital: doctor.hospital || "Unknown Hospital",
                        specialization: doctor.specialization || "Unknown Specialization",
                        clinic_address: doctor.clinic_address || "Unknown Clinic Address",
                        doctor_availability: doctor.doctor_availability || "Unknown Availability"
                    }));
                    console.log(modifiedData);
                })
                .catch(error => {
                    console.error('Error:', error);
                });

        }

    }, [Loggedin, AuthToken])


    const [SearchBySpecial, setSearchBySpecial] = useState("")
    const [SearchByName, setSearchByName] = useState("")

    const [FilteredDoctors, setFilteredDoctors] = useState(sampelResponse)

    useEffect(() => {
        let newlist = sampelResponse.filter((doc) => doc.specialization.toLowerCase().includes(SearchBySpecial.toLowerCase()));
        newlist = newlist.filter((doc) => doc.name.toLowerCase().includes(SearchByName.toLowerCase()))

        setFilteredDoctors(newlist)

        return () => {

        }
    }, [SearchBySpecial, SearchByName])




    return (
        <div>
            <h1 className="avl-doc-title">Available doctors</h1>
            <div className="search-containers">
                <div>
                    <span className="material-symbols-outlined">
                        search
                    </span>
                    <input type="text" name="" id=""
                        placeholder='Search By specialization'
                        value={SearchBySpecial}
                        onChange={(e) => setSearchBySpecial(e.target.value)}
                        className='searchbyT'
                    />
                </div>
                <div>
                    <span className="material-symbols-outlined">
                        search
                    </span>

                    <input type="text" name="" id=""
                        placeholder='Search By Name'
                        value={SearchByName}
                        onChange={(e) => setSearchByName(e.target.value)}
                        className='searchTag'
                    />
                </div>
            </div>
            <div className="doctors-container">

                {FilteredDoctors.map(Doc => (
                    <DoctorCard key={Doc.contact} DocObj={Doc} />
                ))}
            </div>

        </div>
    )
}

export default AllDoctors
