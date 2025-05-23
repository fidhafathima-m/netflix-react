import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import searchIcon from '../../assets/search_icon.svg'
import bellIcon from '../../assets/bell_icon.svg'
import profileImg from '../../assets/profile_img.png'
import caretIcon from '../../assets/caret_icon.svg'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navRef = useRef();
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

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
    }, []);

    const redirectToLogin = () => {
        const confirm = window.confirm("Are you sure to Sign out?")
        if(confirm) {
            navigate('/login');
        }
        
    }


  return (
    <div className='navbar' ref={navRef}>
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={searchIcon} alt=""  className='icons'/>
        <p>Children</p>
        <img src={bellIcon} alt=""  className='icons'/>
        <div className="navbar-profile">
          <img src={profileImg} alt=""  className='profile'/>
          <img src={caretIcon} alt="" />
          <div className="dropdown">
            <p onClick={redirectToLogin}>Sign out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Navbar