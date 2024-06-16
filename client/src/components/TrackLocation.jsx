import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../const';
import Notification from './Notification';

export default function TrackLocation() {
  const { busId } = useParams();
  const [notificationMessage, setNotificationMessage] = useState({ status: '', message: '' });
  const navigate = useNavigate(); // Correct way to use useNavigate hook
  const intervalRef = useRef(null);

  useEffect(() => {
    axios.defaults.withCredentials = true;

    // Clean up function
    return () => {
      clearInterval(intervalRef.current);
      setNotificationMessage({ status: true, message: 'Tracking stopped' });
    };
  }, []);

  const fetchAndUpdateLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Current coordinates:', latitude, longitude);

        try {
          const response = await axios.post(`${apiUrl}/auth/${busId}`, { latitude, longitude });
          console.log('Data received:', response.data);
          if (!response.data.status) {
            navigate('/driver/login'); // Navigate to login if status is false
          }
        } catch (error) {
          console.error('Error updating database:', error);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        if (error.code === 1) {
          console.log('User denied Geolocation. Please enable location access.');
        } else {
          console.log('Error occurred while getting location');
        }
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const startTracking = () => {
    fetchAndUpdateLocation(); // Fetch location immediately on start

    // Set interval to update location periodically (e.g., every 2 seconds)
    intervalRef.current = setInterval(fetchAndUpdateLocation, 2000); // Update every 2 seconds
    setNotificationMessage({ status: true, message: 'Tracking started' });
  };

  const stopTracking = () => {
    clearInterval(intervalRef.current);
    setNotificationMessage({ status: true, message: 'Tracking stopped' });
  };

  return (
    <>
      <button onClick={startTracking}>Start Tracking</button>
      <button onClick={stopTracking}>Stop Tracking</button>
      {notificationMessage && <Notification {...notificationMessage} />}
    </>
  );
}
