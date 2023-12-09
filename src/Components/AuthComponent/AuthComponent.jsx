import React, { useState, useEffect, useContext } from "react";
import "./AuthComponent.css";
import AuthContext from "../../Context/Auth/AuthContext";

function AuthComponent() {
    const { baseUrl, setLoggedin, setisDoc, setAuthToken, setProgress } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(false);
    const [locationInput, setLocationInput] = useState("");
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [Registered, setRegistered] = useState(false)
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        hospitalName: "",
        location: "",
        userType: "patient",
    });

    const handleToggleAuth = () => {
        setIsLogin(!isLogin);
    };

    const handleLocationInputChange = (e) => {
        setLocationInput(e.target.value);
    };

    const handleLocationSuggestionClick = (suggestion) => {
        setLocationInput(suggestion);
        setLocationSuggestions([]);
        setFormData({ ...formData, location: suggestion });
    };

    const handleRegister = async () => {
        const headers = { "Content-Type": "application/json" };
        const body = {
            email: formData.email,
            password: formData.password,
            user_type: formData.userType,
        };
        setProgress(40)

        await fetch(`${baseUrl}/register`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.details) {
                    console.log(data)
                }
            })
            .catch((err) => {
                console.error(err);
            });

        setProgress(75)
    }
    const handleLogin = async () => {
        const headers = { "Content-Type": "application/x-www-form-urlencoded" };
        const Data = new URLSearchParams();
        Data.append("username", formData.email);
        Data.append("password", formData.password);

        try {
            const response = await fetch(`${baseUrl}/auth/login`, {
                method: "POST",
                headers: headers,
                body: Data.toString(),
            });
            setProgress(40)

            if (response.ok) {
                const data = await response.json();
                setAuthToken(data.access_token);
                localStorage.setItem('token', data.access_token)

                if (data.user_type === "doctor") {
                    if (Registered && (data.access_token != "")) {
                        await handelDoctorDetailsUpdate(data.access_token)
                        setRegistered(false)
                    }
                } else {
                    if (Registered && (data.access_token != "")) {
                        await handelPatientDetailsUpdate(data.access_token)
                        setRegistered(false)
                    }
                }
                setLoggedin(true)
            } else {
                const data = await response.json();
                alert(data.detail)
                console.error("Error:", data.detail);
            }

            setProgress(75)
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    const handelPatientDetailsUpdate = async (access_token) => {

        const body = {
            "first_name": formData.firstname,
            "last_name": formData.lastname,
            "address": formData.location
        };

        await fetch(`${baseUrl}/patient/my-profile`, {
            method: 'PATCH',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(data => {
                if (data.details) {
                    console.log(data)
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        setProgress(60)

    }

    const handelDoctorDetailsUpdate = async (access_token) => {

        const body = {
            "first_name": formData.firstname,
            "last_name": formData.lastname,
            "hospital": formData.hospitalName,
            "clinic_address": formData.location
        };

        await fetch(`${baseUrl}/doctor/my-profile`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(data => {
                if (data.details) {
                    console.log(data)
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        setProgress(60)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLogin) {
            if (formData.password === formData.confirmPassword) {
                try {
                    setProgress(10)

                    await handleRegister()
                    setRegistered(true)

                    if (formData.userType === "doctor") {
                        setisDoc(true);
                    } else {
                        setisDoc(false);
                    }
                } catch (error) {
                    console.error(error);
                }
                setIsLogin(true);
                setProgress(100)
            } else {
                setProgress(100)
                alert("Passwords don't match!!");
            }
        } else {
            try {
                setProgress(10)

                await handleLogin()

                if (formData.userType === "doctor") {
                    setisDoc(true);
                    localStorage.setItem("userType", "doctor");
                } else {
                    setisDoc(false);
                    localStorage.setItem("userType", "patient");
                }
                setProgress(100)
            } catch (error) {
                console.error(error);
            }
        }
    };




    useEffect(() => {
        if (locationInput) {
            const apiKey = "fM7W6UN9YwEdr5UCuGATE_em0KcO15gFyZeuO6l6tAI";
            const apiUrl = `https://geocode.search.hereapi.com/v1/geocode?q=${locationInput}&limit=4&apiKey=${apiKey}`;

            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    if (data.items && data.items.length > 0) {
                        const suggestions = data.items.map((item) => item.title);
                        setLocationSuggestions(suggestions);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching location suggestions:", error);
                });
        } else {
            setLocationSuggestions([]);
        }
    }, [locationInput]);

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form text-centre">
                <p className="title">{isLogin ? "Login" : "Signup"}</p>
                <p className="message">
                    {isLogin
                        ? "Sign in to access your account."
                        : "Signup now and get access to our start booking an appointment."}
                </p>
                <div>
                    <label className="role">
                        {isLogin ? "Login as : " : "Signup as : "}
                        <span>
                            <input
                                type="radio"
                                name="userType"
                                value="patient"
                                checked={formData.userType === "patient"}
                                onChange={(e) =>
                                    setFormData({ ...formData, userType: e.target.value })
                                }
                            />
                            Patient
                        </span>
                        <span>
                            <input
                                type="radio"
                                name="userType"
                                value="doctor"
                                checked={formData.userType === "doctor"}
                                onChange={(e) =>
                                    setFormData({ ...formData, userType: e.target.value })
                                }
                            />
                            Doctor
                        </span>
                    </label>
                </div>
                {!isLogin && (
                    <div className="flex">
                        <label>
                            <input
                                required
                                placeholder=""
                                type="text"
                                className="input"
                                value={formData.firstname}
                                onChange={(e) =>
                                    setFormData({ ...formData, firstname: e.target.value })
                                }
                            />
                            <span>Firstname</span>
                        </label>

                        <label>
                            <input
                                required
                                placeholder=""
                                type="text"
                                className="input"
                                value={formData.lastname}
                                onChange={(e) =>
                                    setFormData({ ...formData, lastname: e.target.value })
                                }
                            />
                            <span>Lastname</span>
                        </label>
                    </div>
                )}

                <label>
                    <input
                        required
                        placeholder=""
                        type="email"
                        className="input"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                    <span>Email</span>
                </label>

                <label>
                    <input
                        required
                        placeholder=""
                        type="password"
                        className="input"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                    />
                    <span>Password</span>
                </label>

                {!isLogin && (
                    <label>
                        <input
                            required
                            placeholder=""
                            type="password"
                            className="input"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                                setFormData({ ...formData, confirmPassword: e.target.value })
                            }
                        />
                        <span>Confirm password</span>
                    </label>
                )}

                {formData.userType === "doctor" && !isLogin && (
                    <label>
                        <input
                            required
                            placeholder=""
                            type="text"
                            className="input"
                            value={formData.hospitalName}
                            onChange={(e) =>
                                setFormData({ ...formData, hospitalName: e.target.value })
                            }
                        />
                        <span>Hospital Name</span>
                    </label>
                )}

                {!isLogin && (
                    <label className="location-input">
                        <input
                            required
                            placeholder=""
                            type="text"
                            className="input"
                            value={locationInput}
                            onChange={handleLocationInputChange}
                        />
                        <span>Location</span>
                        {locationSuggestions.length > 0 && (
                            <div className="location-suggestions">
                                {locationSuggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className="location-suggestion"
                                        onClick={() => handleLocationSuggestionClick(suggestion)}
                                    >
                                        {suggestion}
                                    </div>
                                ))}
                            </div>
                        )}
                    </label>
                )}

                <button className="submit" type="submit">
                    {isLogin ? "Login" : "Signup"}
                </button>
                <p className="signin">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <a href="#" onClick={handleToggleAuth}>
                        {isLogin ? "Sign up" : "Log in"}
                    </a>
                </p>
            </form>
        </div>
    );
}

export default AuthComponent;
