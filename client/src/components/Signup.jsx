import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/form.css';
import axios from "axios";
import { apiUrl } from '../const';
import Notification from './Notifcation';

export default function Signup() {
    const [login, setLogin] = React.useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = React.useState({ name: "", email: "", password: "" });
    const [notificationMessage, setNotificationMessage] = useState({status:'',message:''});
    const navigate = useNavigate();
    function updateState(e) {
        setErrors({ name: "", email: "", password: "" })
        const { name, value } = e.target;
        setLogin(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors({ name: "", email: "", password: "" })
        try {
            const response = await axios.post(`${apiUrl}/auth/user/signup`, { ...login })
            console.log(response);
            if (response.data.errors)
                setErrors(prev => ({
                    ...prev,
                    ...response.data.errors
                }))
            setNotificationMessage(prev => ({...prev,...response.data}))
            setTimeout(() => {
                if (response.data.status) {
                    navigate('/user/login')
                }
            }, 10000)

        } catch (e) {
            setNotificationMessage({status:false, message:e.message})
            console.error('Signup failed:', e);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Signup</h1>
            <label htmlFor='name' >Name: </label>
            <input type='text' id='name' placeholder='Name' value={login.name} name='name' onChange={updateState} />
            {errors.name && <div className="error">{errors.name}</div>}
            <label htmlFor='email' >Email: </label>
            <input type='text' id='email' placeholder='Email' value={login.email} name='email' onChange={updateState} />
            {errors.email && <div className="error">{errors.email}</div>}
            <label htmlFor='password' >Password: </label>
            <input type='password' id='password' placeholder='Password' value={login.password} name='password' onChange={updateState} />
            {errors.password && <div className="error">{errors.password}</div>}
            <div className="switch-auth-message">
                Already have an account? <Link to="/user/login">Login</Link>
            </div>
            <button type='submit'>Submit</button>
            <Notification {...notificationMessage} />
        </form>

    )
}
