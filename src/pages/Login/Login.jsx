import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { LuEye, LuEyeClosed } from "react-icons/lu";


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


  // Form Validation
  const formValidate = () => {
    const newErrors = {};

    if(signState === 'Sign Up' && !formData.name.trim()) {
      newErrors.name = "Name is required!"
    }

    if(!formData.email.trim()) {
      newErrors.email = "Email is required!"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if(!formData.password) {
      newErrors.password = "Password is required"
    } else if(formData.password.length < 6) {
      newErrors.password = "Password must be atleast 6 characters"
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
      console.log(`${signState} with data:`, formData);
    }
  }

  return (
    <div className='login'>
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

          <div className="form-help">
            <div className="remember">
              <input  type="checkbox" 
                      name='remember'
                      checked={formData.remember} 
                      onChange={handleChange}/>
              <label>Remember Me</label>
            </div>
            
            <p>Need help?</p>
          </div>
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