import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../const';
import Notification from './Notifcation';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [notificationMessage, setNotificationMessage] = useState({ status: '', message: '' });
    const navigate = useNavigate();
    const handleNotificationClose = () => {
        navigate('/user/login')
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/auth/user/forgotPassword`, { email })
            if (response.data.status) {
                setNotificationMessage(prev => ({ ...prev, ...response.data, message: 'Check your email for reset password Link' }))
                setTimeout(() => {
                    handleNotificationClose();
                }, 10000);

            }
        } catch (err) {
            setNotificationMessage(prev => ({status:false,message:'Try Again'}))
            console.log(err)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Notification {...notificationMessage} onClose={handleNotificationClose} />
            <h1>Forgot password</h1>
            <label htmlFor='email'>Email: </label>
            <input type='text' placeholder='Email' id='email' autoComplete='off' value={email} name='email' onChange={(e) => setEmail(e.target.value)} />
            <button>Send</button>
        </form>
    )
}
