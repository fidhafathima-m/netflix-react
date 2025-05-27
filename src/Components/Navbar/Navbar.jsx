import React, { useState, useContext, useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import searchIcon from '../../assets/search_icon.svg';
import bellIcon from '../../assets/bell_icon.svg';
import profileImg from '../../assets/profile_img.png';
import { AuthContext } from '../../Context/AuthContext';
import netflixSpinner from '../../assets/netflix_spinner.gif';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import caretIcon from '../../assets/caret_icon.svg'

const Navbar = () => {
  const navRef = useRef();
  const { logout, netflixUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const redirectToLogin = () => {
    const confirmLogout = window.confirm("Are you sure to Sign out?");
    if (confirmLogout) {
      setLoading(true);
      setTimeout(() => {
        logout();
        setLoading(false);
      }, 1000);
    }
  };

  const handleMyListClick = () => {
    if (!netflixUser) {
      alert('Please login to view your watchlist!');
      navigate('/login');
      return;
    }
    navigate('/watchlist');
  };

  return loading ? (
    <div className="navbar-spinner">
      <img src={netflixSpinner} alt="Loading" />
    </div>
  ) : (
    <div className='navbar' ref={navRef}>
      <div className="navbar-left">
        <img src={logo} alt="Netflix" />
        <ul className="navbar-links">
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li onClick={handleMyListClick}>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>

      <div className="navbar-right">
        <img src={searchIcon} alt="Search" className='icons' />
        <p>Children</p>
        <img src={bellIcon} alt="Notifications" className='icons' />
        <div className="navbar-profile">
          <img src={profileImg} alt="" className="profile" />
          <p>{netflixUser ? netflixUser.name : ''}</p>
          <img src={caretIcon} alt="" />
          <div className="dropdown">
            <p onClick={redirectToLogin}>Sign out of Netflix</p>
          </div>
        </div>

        {menuOpen ? (
          <FiX className="burger-icon" onClick={() => setMenuOpen(false)} />
        ) : (
          <FiMenu className="burger-icon" onClick={() => setMenuOpen(true)} />
        )}
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-profile">
            <img src={profileImg} alt="Profile" />
            <p>{netflixUser?.name || 'Guest'}</p>
          </div>
          <ul>
            <li>Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>New & Popular</li>
            <li onClick={handleMyListClick}>My List</li>
            <li>Browse by Languages</li>
            <li onClick={redirectToLogin}>Sign out of Netflix</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
