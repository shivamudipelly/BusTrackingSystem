import React, { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../const';
import Notification from './Notifcation';


export default function ResetPassword() {
    const [password, setPassword] = useState({'newPassword':'','password2':'', 'error':''});
    const [notificationMessage, setNotificationMessage] = useState({ status: '', message: '' });
    const navigate = useNavigate();
    const {token} = useParams();

    const update = (e)=>{
        const {name, value} = e.target
        setPassword(prev=>({
            ...prev,
            [name]: value,
             error: '' 
        }))
    }
    const handleNotificationClose = () => {
        navigate('/user/login')
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {newPassword} = password;
        if(password.newPassword === password.password2){
        try{
        const response = await axios.post(`${apiUrl}/auth/user/resetPassword/`+token,{newPassword})
        if(response.data){
            setNotificationMessage(prev => ({ ...prev, ...response.data}))
                setTimeout(() => {
                    handleNotificationClose();
                }, 10000);
        }
        console.log(response.data)
        }catch(err){
            console.log(err)
        }}else{
            setPassword(prev=>({...prev, error: 'Password does not match' }))
            console.log(password);
        }
    }
    
    return (
    <form onSubmit={handleSubmit}>
        <h1>Reset password</h1>
        <label htmlFor='password1'>New Password: </label>
        <input type='password' placeholder='New password' id='password1' autoComplete='off' value={password.newPassword} name='newPassword' onChange={update}/>
        <label htmlFor='password2'>Confirm Password: </label>
        <input type='password' placeholder='Confirm password' id='password2' autoComplete='off' value={password.password2} name='password2' onChange={update}/>
        {password.error && <div className="error">{password.error}</div>}
    <button>Reset Password</button>
    <Notification {...notificationMessage} onClose={handleNotificationClose} />
</form>
  )
}
