import React, { useState } from 'react';
import '../css/form.css';
import axios from "axios";
import { apiUrl } from '../const';




export default function DriverSignup() {
    const [login, setLogin] = useState({ id: "", email: "", password: "" });
    const [errors, setErrors] = useState({ id: "", email: "", password: "" });
    function updateState(e) {
        setErrors({ id: "", email: "", password: "" })
        const { name, value } = e.target;
        setLogin(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors({ id: "", email: "", password: "" })
        try {
            const response = await axios.post(`${apiUrl}/auth/driversignup`, { ...login })
            console.log(response);
            if (response.data.errors)
                setErrors(prev => ({
                    ...prev,
                    ...response.data.errors
                }))
            console.log('Signup successful:', response.data);

        } catch (e) {
            console.error('Signup failed:', e);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Signup</h1>
            <label htmlFor='id' >name: </label>
            <input type='text' id='id' placeholder='Id' value={login.id} name='id' onChange={updateState} />
            {errors.id && <div className="error">{errors.id}</div>}
            <label htmlFor='email' >Email: </label>
            <input type='text' id='email' placeholder='Email' value={login.email} name='email' onChange={updateState} />
            {errors.email && <div className="error">{errors.email}</div>}
            <label htmlFor='password' >Password: </label>
            <input type='password' id='password' placeholder='Password' value={login.password} name='password' onChange={updateState} />
            {errors.password && <div className="error">{errors.password}</div>}
            <button type='submit'>Submit</button>
        </form>

    )
}
