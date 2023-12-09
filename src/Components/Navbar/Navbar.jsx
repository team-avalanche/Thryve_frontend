import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/Auth/AuthContext';
import './Navbar.css';
import Sidebar from '../Sidebar/Sidebar';

const FloatingMenu = ({ isOpen, setMenuOpen }) => {
  const { handelSignOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = (e) => {
    e.preventDefault();
    handelSignOut();
    setMenuOpen(false)
  };

  const handleViewProfile = () => {
    navigate("/profile");
    setMenuOpen(false)
  };

  return (
    <div className={`FloatingMenu ${isOpen ? 'active' : ''}`}>
      <ul className='float-list'>
        <li onClick={handleViewProfile}>View Profile</li>
        <li onClick={handleSignOut}>Sign-Out</li>
      </ul>
    </div>
  );
};

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [sidebarStatus, setSidebarStatus] = useState("close")
  const [CurrentDescription, setCurrentDescription] = useState("Welcome")

  const handleProfileClick = (e) => {
    e.preventDefault();
    setMenuOpen(!isMenuOpen);
  };

  const openSidebar = () => {
    setSidebarStatus('open')
  }

  return (
    <>
      <div className="navbar">
        <div className='nav-right'>
          <div className="hamburger" onClick={openSidebar}>
            <span className="material-symbols-outlined">
              menu
            </span>
          </div>
          <p>{CurrentDescription}</p>
        </div>
        <div className="navbar-title">Project Name</div>
        <div className='relative' >
          <div className="navbar-profile" onClick={handleProfileClick}></div>
          <FloatingMenu isOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
        </div>
      </div>
      <div className="cover-nav-space"></div>
      <Sidebar sidebarStatus={sidebarStatus} setSidebarStatus={setSidebarStatus} setCurrentDescription={setCurrentDescription} />
    </>
  );
}

export default Navbar;
