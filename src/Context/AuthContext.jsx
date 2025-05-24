import React, {useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [netflixUser, setNetflixUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if(storedUser) {
            setNetflixUser(storedUser)
        }
    }, [location])

    const login = (user) => {
        setNetflixUser(user);
        localStorage.setItem('loggedInUser', JSON.stringify(user))
        navigate('/home')
    }

    const logout = () => {
        setNetflixUser(null)
        localStorage.removeItem('loggedInUser');
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{netflixUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}