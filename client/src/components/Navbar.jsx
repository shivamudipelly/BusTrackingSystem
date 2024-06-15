import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Notification from './Notifcation';
import { useAuth } from './AuthProvider';
import svg from '../images/group 2.svg'
import { apiUrl } from '../const';

export default function Navbar() {
    const { isLoggedIn, login, logout } = useAuth();
    const [notificationMessage, setNotificationMessage] = useState({ status: '', message: '' });

    const handleLogout = async () => {
        axios.defaults.withCredentials = true;
        axios.get(`${apiUrl}/auth/user/logout`)
            .then(response => {
                console.log(response.data);
                if (response.data.status) {
                    logout();
                    setNotificationMessage(prev => ({ ...prev, ...response.data }))
                    console.log('Logout successful');
                } else {
                    setNotificationMessage(prev => ({ ...prev, ...response.data }))
                    login();
                }
            })
            .catch(error => {
                console.error('Logout error', error);
            });
    };

    useEffect(() => {
        async function checkLoginStatus() {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get(`${apiUrl}/auth/user/islogin`);
                if (response.data.isLoggedIn) {
                    login();
                } else {
                    logout();
                }
            } catch (error) {
                console.log(error);
                logout();
            }
        }

        checkLoginStatus();
    }, [login, logout]);

    return (
        <header className="header">
            <Notification {...notificationMessage} />
            <div className="logo">
                <img alt="pit" src={svg} className="home-image" />
            </div>
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="icons">
                <FaBars id="menu-icon" />
                <FaTimes id="close-icon" />
            </label>
            <nav className="navbar">
                <Link to="/">Home</Link>
                <Link to="/user/map">Buses</Link>
                {isLoggedIn ? <Link onClick={handleLogout}>Logout</Link> :
                    <>
                        <Link to="/user/login">Login/signup</Link>
                        {/* <Link to="/user/signup">Signup</Link> */}
                    </>
                }
            </nav>
        </header>
    );
};

