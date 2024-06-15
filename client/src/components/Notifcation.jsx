import React, { useState, useEffect } from 'react';
import '../css/notification.css';

const Notification = ({ status, message, duration = 10000, onClose }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (message) {
      setIsActive(true);
      const timer = setTimeout(() => {
        setIsActive(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  const handleClose = () => {
    setIsActive(false);
    if (onClose) onClose();
  };

  return (
    <div className={`notification ${isActive ? 'notification-active' : ''}`}>
      <span className={`icon ${status ? 'success-icon' : 'error-icon'}`}>
        {status ? '\u2714' : '!'}
      </span>
      <p className="notification-text">{message}</p>
      <span id="notification-close" onClick={handleClose}>
        &#10006;
      </span>
      <div className="progress-bar"></div>
    </div>
  );
};

export default Notification;
