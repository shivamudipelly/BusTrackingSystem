import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../const';
import Notification from './Notifcation';

export default function TrackLocation() {
  const { busId } = useParams();
  const [notificationMessage, setNotificationMessage] = useState({ status: '', message: '' });
  const intervalRef = useRef(null);

  useEffect(() => {
    axios.defaults.withCredentials = true;

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      stopTracking();
    };
  }, []);

  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  const fetchAndUpdateLocation =  () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      console.log(position.coords);

      try {
        const response = await axios.post(`${apiUrl}/auth/${busId}`, { latitude, longitude });
        console.log('Data received:', response.data);
      } catch (error) {
        console.error('Error getting location or updating database:', error);
        setNotificationMessage({ status: false, message: 'Error occurred while tracking location' });
      }
    }, (error) => {
      console.error('Error getting location:', error);
      setNotificationMessage({ status: false, message: 'Error occurred while getting location' });
    }, options);
  };

  const startTracking = () => {
    fetchAndUpdateLocation(); // Fetch location immediately on start

    // Set interval to update location periodically (e.g., every 1 second)
    intervalRef.current = setInterval(fetchAndUpdateLocation, 1000); // Update every 1 second
    setNotificationMessage({ status: true, message: 'Tracking started' });
  };

  const stopTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setNotificationMessage({ status: false, message: 'Tracking stopped' });
    }
  };

  return (
    <>
      <button onClick={startTracking}>Start Tracking</button>
      <button onClick={stopTracking}>Stop Tracking</button>
      <Notification {...notificationMessage} />
    </>
  );
}
