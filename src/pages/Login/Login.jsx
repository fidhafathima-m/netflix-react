import React, { useState, useContext } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { AuthContext } from '../../Context/AuthContext';
import netflixSpinner from '../../assets/netflix_spinner.gif'


const Login = () => {

  const [signState, setSignState] = useState('Sign In');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    remember: false
  });
  const [errors, setErrors] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)

  const {login} = useContext(AuthContext)


  // Form Validation
  const formValidate = () => {
    const newErrors = {};

    if (signState === 'Sign Up') {
    if (!formData.name.trim()) {
      newErrors.name = "Name is required!";
    } else {
      if (formData.name.length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      }
      if (formData.name.length > 50) {
        newErrors.name = "Name cannot exceed 50 characters";
      }
      if (/^\s+|\s+$/.test(formData.name)) {
        newErrors.name = "Name cannot start or end with whitespace";
      }
      if (/_{2,}/.test(formData.name)) {
        newErrors.name = "Name cannot contain multiple underscores in a row";
      }
      if (/[^a-zA-Z0-9 _-]/.test(formData.name)) {
        newErrors.name = "Name contains invalid characters";
      }
      if (/^\d+$/.test(formData.name)) {
        newErrors.name = "Name cannot be all numbers";
      }
    }
  }

    if(!formData.email.trim()) {
      newErrors.email = "Email is required!"
    } 
    else {
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if(formData.email.length > 254) {
        newErrors.email = "Email cannot exceed 254 characters";
      }
      if(/\.{2,}/.test(formData.email.split('@')[0])) {
        newErrors.email = "Email contains consecutive dots";
      }
      if(/^\.|\.@|@\.|\.$/.test(formData.email)) {
        newErrors.email = "Email has dots in invalid positions";
      }
    }

    if(!formData.password) {
      newErrors.password = "Password is required"
    }  
    else {
      if(formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
      if(formData.password.length > 128) {
        newErrors.password = "Password cannot exceed 128 characters";
      }
      if(!/[A-Z]/.test(formData.password)) {
        newErrors.password = "Password must contain at least one uppercase letter";
      }
      if(!/[a-z]/.test(formData.password)) {
        newErrors.password = "Password must contain at least one lowercase letter";
      }
      if(!/[0-9]/.test(formData.password)) {
        newErrors.password = "Password must contain at least one number";
      }
      if(!/[^A-Za-z0-9]/.test(formData.password)) {
        newErrors.password = "Password must contain at least one special character";
      }
      if(/\s/.test(formData.password)) {
        newErrors.password = "Password cannot contain whitespace";
      }
      if(/(.)\1{2,}/.test(formData.password)) {
        newErrors.password = "Password cannot contain repeated characters (more than 2)";
      }
    }

    const commonPasswords = ['password', '12345678', 'qwerty', 'letmein'];
    if(commonPasswords.includes(formData.password.toLowerCase())) {
      newErrors.password = "Password is too common, choose a stronger one";
    }

    if(formData.name && formData.password.toLowerCase().includes(formData.name.toLowerCase())) {
      newErrors.password = "Password should not contain your name";
    }
    if(formData.email && formData.password.toLowerCase().includes(formData.email.split('@')[0].toLowerCase())) {
      newErrors.password = "Password should not contain your email";
    }

    return newErrors;
  }

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = formValidate();
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      if(signState === 'Sign Up') {
        const userExists = users.some(user => user.email === formData.email)
        if(userExists) {
          setErrors({email: 'Email is already registered'})
          return;
        }
        users.push({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          remember: formData.remember
        });
        localStorage.setItem('users', JSON.stringify(users));
        alert("Registration Successfull. Please Sign In.");
        setSignState('Sign In');
        setFormData({
          name: '',
          email: '',
          password: '',
          remember: false
        })
      } else {
        const existingUser = users.find(
          user => user.email === formData.email && user.password === formData.password
        )
        if(!existingUser) {
          setErrors({email: 'Invalid Email or Password'})
          return;
        }
        setLoading(true)
        setTimeout(() => {
          login(existingUser);
          setLoading(false)
        }, 1000)
        
      }
    }
  }

  return (
    loading 
    ? <div className='login-spinner'>
      <img src={netflixSpinner} alt="Loading..." />
    </div> 
    : <div className='login'>
      <img src={logo} alt=""  className='login-logo'/>
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={handleSubmit}>
          {signState === 'Sign Up' && (
            <>
              <input  type="text" 
                      name='name'
                      placeholder='Your name'
                      value={formData.name} 
                      onChange={handleChange}/> 
              {errors.name && <p className='error'>{errors.name}</p>}
            </>
          )}
          
          <input  type="text" 
                  placeholder='Email' 
                  name='email'
                  value={formData.email} 
                  onChange={handleChange}/>
          {errors.email && <p className='error'>{errors.email}</p>}

          <div className="pass-wrapper">
            <input  type={showPassword ? 'text' : 'password'} 
                  placeholder='Password'
                  name='password'
                  value={formData.password} 
                  onChange={handleChange}/>
          <span className='toggle-pass'
                onClick={() => setShowPassword(prev => !prev)}>
                  {showPassword ? <LuEye /> : <LuEyeClosed />}
                </span>
          </div>
          
          {errors.password && <p className='error'>{errors.password}</p>}

          <button>{signState}</button>

          {/* <div className="form-help">
            <div className="remember">
              <input  type="checkbox" 
                      name='remember'
                      checked={formData.remember} 
                      onChange={handleChange}/>
              <label>Remember Me</label>
            </div>
            
            <p>Need help?</p>
          </div> */}
        </form>
        <div className="form-switch">
          {signState === 'Sign In'
                        ? <p>
                            New to Netflix? 
                            <span onClick={() => setSignState('Sign Up')}>
                              Sign Up Now
                            </span>
                          </p>
                        : <p>
                            Already have an account? 
                            <span onClick={() => setSignState('Sign In')}>
                              Sign In Now
                            </span>
                          </p>
        }
        </div>
      </div>
    </div>
  )
}

export default Login