import React, { useContext } from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import AuthContext from '../../Context/Auth/AuthContext'

const Sidebar = ({ sidebarStatus, setSidebarStatus, setCurrentDescription }) => {
    const context = useContext(AuthContext)
    const { isDoc } = context;

    const closeSidebar = () => {
        setSidebarStatus("close")
    }

    return (
        <div className={`sidebar ${sidebarStatus} `} >
            <div className="sidebar-top">
                <h1 className="navbar-title">
                    <span className="material-symbols-outlined" onClick={closeSidebar}>
                        menu
                    </span>
                    Mediline
                </h1>
                <ul>
                    {(!isDoc) && (<li onClick={() => { setCurrentDescription("Appointments"); closeSidebar() }} ><Link to={"/"}>My Appointments</Link></li>)}
                    {(isDoc) && (<li onClick={() => { setCurrentDescription("Appointments"); closeSidebar() }} ><Link to={"/"}>Today&apos;s Appointments</Link></li>)}
                    {(!isDoc) && (<li onClick={() => { setCurrentDescription("Doctors"); closeSidebar() }} ><Link to={"/doctors"}>Find Doctors</Link></li>)}
                    {(isDoc) && (<li onClick={() => { setCurrentDescription("Availability"); closeSidebar() }} ><Link to={"/availability"}>Your Availability</Link></li>)}
                    <li onClick={() => { setCurrentDescription("Profile"); closeSidebar() }} ><Link to={"/profile"}>Profile</Link></li>
                </ul>
            </div>

            <div className="sidebar-bottom">
                <ul>
                    <li>About</li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
