import React, { useState, useEffect } from 'react'
import AuthContext from './AuthContext'

const AuthState = (props) => {
    const baseUrl = import.meta.env.VITE_BASE_URL
    const [Loggedin, setLoggedin] = useState(false)
    const [isDoc, setisDoc] = useState(false)
    const [AuthToken, setAuthToken] = useState("")
    const [progress, setProgress] = useState(0)
    const [user_details, setUser_details] = useState({
        name: "",
        gender: "",
        contact: "",
        hospital: "",
        specialization: "",
        clinic_address: "",
        doctor_availability: "",
    })

    const handelGetDocDetails = (access_token) => {

        fetch(`${baseUrl}/doctor/my-profile`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.detail === "The method you are trying to access is only for doctor users.") {
                    console.log("You are NOT DOC OCK!!")
                }
                if ("specialization" in data) {

                    setUser_details(prevState => ({
                        ...prevState,
                        name: data.first_name || "",
                        gender: data.gender || "other",
                        specialization: data.specialization || "",
                        hospital: data.hospital || "",
                        contact: data.contact || "",
                        clinic_address: data.clinic_address || "",

                    }));


                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    const handelGetPatientDetails = (access_token) => {

        fetch(`${baseUrl}/patient/my-profile`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.detail === "The method you are trying to access is only for patient users.") {
                    console.log("You are a doc JUST LIKE DOC OCK!!")
                }
                if ("blood_group" in data) {

                    setUser_details(prevState => ({
                        ...prevState,
                        name: data.first_name || "",
                        gender: data.gender || "other",
                        BG: data.blood_group || "",
                        dob: data.dob || "2000-01-01",
                        contact: data.contact || "",
                        address: data.address || "",
                    }));


                    setisDoc(false);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    useEffect(() => {
        const localToken = localStorage.getItem("token");
        const localType = localStorage.getItem("userType")

        if ((!Loggedin) && (localToken)) {
            setAuthToken(localToken)
            setLoggedin(true)
            if (localType === "patient") {
                setisDoc(false)
            } else {
                setisDoc(true)
            }
        }

    }, [Loggedin, isDoc])

    useEffect(() => {
        if ((Loggedin) && (AuthToken)) {
            if (isDoc) {
                handelGetDocDetails(AuthToken)
            } else {
                handelGetPatientDetails(AuthToken)
            }
        }


    }, [Loggedin, AuthToken])



    const handelSignOut = () => {
        setLoggedin(false)
        setAuthToken("")
        localStorage.removeItem("token")
        localStorage.removeItem("userType")
    }

    return (
        <AuthContext.Provider value={{ progress, setProgress, handelSignOut, AuthToken, setAuthToken, baseUrl, Loggedin, setLoggedin, setisDoc, user_details, setUser_details, isDoc }} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
