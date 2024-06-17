import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthProvider';
import svg from '../images/group 2.svg';
import { apiUrl } from '../const';
import Notification from './Notification';

export default function Navbar() {
    const { isLoggedIn, login, logout } = useAuth();
    const [notificationMessage, setNotificationMessage] = useState({ status: '', message: '' });
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.get(`${apiUrl}/auth/user/logout`, { withCredentials: true });
            console.log(response.data);
            if (response.data.status) {
                logout();
                setNotificationMessage(prev => ({ ...prev, ...response.data }));
                console.log('Logout successful');
            } else {
                setNotificationMessage(prev => ({ ...prev, ...response.data }));
                login();
            }
        } catch (error) {
            console.error('Logout error', error);
        } finally {
            handleLinkClick();
        }
    };


    const handleLinkClick = () => {
        setIsMenuOpen(false);
        document.getElementById('check').checked = false;
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
            <input type="checkbox" id="check" checked={isMenuOpen} onChange={() => setIsMenuOpen(!isMenuOpen)} />
            <label htmlFor="check" className="icons">
                <FaBars id="menu-icon" />
                <FaTimes id="close-icon" />
            </label>
            <nav className="navbar">
                <Link to="/" onClick={handleLinkClick}>Home</Link>
                <Link to="/user/map" onClick={handleLinkClick}>Buses</Link>
                {isLoggedIn ? <Link onClick={handleLogout}>Logout</Link> : <Link to="/user/login" onClick={handleLinkClick}>Login/signup</Link>}
            </nav>
        </header>
    );
};
