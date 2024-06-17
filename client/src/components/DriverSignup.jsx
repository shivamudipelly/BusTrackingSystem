import React, { useState } from 'react';
import '../css/form.css';
import axios from "axios";
import { apiUrl } from '../const';
import Notification from './Notification';

export default function DriverSignup() {
    const [formData, setFormData] = useState({ id: "", email: "", password: "" });
    const [errors, setErrors] = useState({ id: "", email: "", password: "" });
    const [notificationMessage, setNotificationMessage]  = useState({staus:'',message:''})

    function updateState(e) {
        setErrors({ id: "", email: "", password: "" });
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors({ id: "", email: "", password: "" });
        try {
            const response = await axios.post(`${apiUrl}/auth/driversignup`, { ...formData });
            console.log(response.data);
            if (response.data.errors) {
                setErrors(prev => ({
                    ...prev,
                    ...response.data.errors
                }));
            } else {
                setNotificationMessage((prev)=>{
                    return {...prev,...response.data}
                })
                console.log('Signup successful:', response.data);
            }
        } catch (e) {
            console.error('Signup failed:', e);
            if (e.response && e.response.data && e.response.data.errors) {
                setErrors(e.response.data.errors);
            } else {
                setErrors({ general: 'Signup failed, please try again later.' });
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Signup</h1>
            <label htmlFor='id'>Name: </label>
            <input
                type='text'
                id='id'
                placeholder='Id'
                value={formData.id}
                name='id'
                onChange={updateState}
                aria-describedby={errors.id ? 'id-error' : null}
            />
            {errors.id && <div id='id-error' className="error">{errors.id}</div>}

            <label htmlFor='email'>Email: </label>
            <input
                type='email'
                id='email'
                placeholder='Email'
                value={formData.email}
                name='email'
                onChange={updateState}
                aria-describedby={errors.email ? 'email-error' : null}
            />
            {errors.email && <div id='email-error' className="error">{errors.email}</div>}

            <label htmlFor='password'>Password: </label>
            <input
                type='password'
                id='password'
                placeholder='Password'
                value={formData.password}
                name='password'
                onChange={updateState}
                aria-describedby={errors.password ? 'password-error' : null}
            />
            {errors.password && <div id='password-error' className="error">{errors.password}</div>}

            {errors.general && <div className="error">{errors.general}</div>}
            <button type='submit'>Submit</button>
            <Notification {...notificationMessage}/>
        </form>
    );
}
