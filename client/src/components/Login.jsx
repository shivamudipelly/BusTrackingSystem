import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/form.css';
import { apiUrl } from '../const';
import { useAuth } from './AuthProvider';
import Notification from './Notifcation';

export default function Login() {
    const [userLogin, setUserLogin] = React.useState({ email: "", password: "" });
    const [errors, setErrors] = React.useState({ email: "", password: "" });
    const [notificationMessage, setNotificationMessage] = useState({status:'',message:''});
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const from = location.state?.from?.pathname || '/'
    const handleNotificationClose = () => {
        login()
        navigate(from, { replace: true });
    };

    function updateState(e) {
        setErrors({ email: "", password: "" })
        const { name, value } = e.target;
        setUserLogin(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors({ email: "", password: "" })
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(`${apiUrl}/auth/user/login`, { ...userLogin })
            if (response.data.errors)
                setErrors(prev => ({
                    ...prev,
                    ...response.data.errors
                }))
            if (response.data.status) {
                setNotificationMessage(prev => ({ ...prev, ...response.data }))
                setTimeout(() => {
                    handleNotificationClose();
                }, 10000);
            } 
        } catch (e) {
            console.error('login failed:', e);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label htmlFor='email'>Email: </label>
            <input type='text' id='email' value={userLogin.email} placeholder='Email' name='email' onChange={updateState} />
            {errors.email && <div className="error">{errors.email}</div>}

            <label htmlFor='password'>Password: </label>
            <input type='password' id='password' value={userLogin.password} placeholder='Password' name='password' onChange={updateState} />
            {errors.password && <div className="error">{errors.password}</div>}
            <Link to="/user/forgotPassword">forgot password?</Link>
            <div className="switch-auth-message">
                Don't have an account? <Link to="/user/signup">Sign up</Link>
            </div>
            <button>Submit</button>
            <Notification {...notificationMessage} onClose={handleNotificationClose} />
        </form>

    )
}
