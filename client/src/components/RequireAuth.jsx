// RequireAuth.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function RequireAuth({ children }) {
    let {isLoggedIn} = useAuth();
    let location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/user/login" state={{ from: location }} replace />;
    }

    return children;
}

