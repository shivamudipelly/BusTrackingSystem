import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import '../css/form.css';
import { apiUrl } from '../const';
import { useAuth } from './AuthProvider';
import Notification from './Notifcation';

export default function DriverLogin() {
    const [driverLogin, setDriverLogin] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [busId ,setBusId] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState({ status: '', message: '' });
    const navigate = useNavigate();
    const { login } = useAuth();
    

    const handleNotificationClose = () => {
        login();
        navigate(`/driver/bus/${busId}`);
    };

    function updateState(e) {
        setErrors({ email: "", password: "" });
        const { name, value } = e.target;
        setDriverLogin(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors({ email: "", password: "" });
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(`${apiUrl}/auth/driverlogin`, { ...driverLogin });
            if (response.data.errors)
                setErrors(prev => ({
                    ...prev,
                    ...response.data.errors
                }));
            if (response.data.status) {
                 setBusId(response.data.busId)
                setNotificationMessage(prev => ({ ...prev, ...response.data }));
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
            <h1>Driver Login</h1>
            <label htmlFor='email'>Email: </label>
            <input type='text' id='email' value={driverLogin.email} placeholder='Email' name='email' onChange={updateState} />
            {errors.email && <div className="error">{errors.email}</div>}

            <label htmlFor='password'>Password: </label>
            <input type='password' id='password' value={driverLogin.password} placeholder='Password' name='password' onChange={updateState} />
            {errors.password && <div className="error">{errors.password}</div>}
            
            <Link to="/user/forgotPassword">Forgot password?</Link>
            <div className="switch-auth-message">
                Don't have an account? <Link to="/driver/signup">Sign up</Link>
            </div>
            <button>Submit</button>
            <Notification {...notificationMessage} onClose={handleNotificationClose} />
        </form>
    );
}
