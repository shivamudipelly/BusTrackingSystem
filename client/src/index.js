import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from "./layout/MainLayout";

import './css/style.css'

import { AuthProvider } from "./components/AuthProvider";
import RequireAuth from "./components/RequireAuth";


import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword';
import Map from './components/Map'
import DriverLogin from "./components/DriverLogin";
import TrackLocation from "./components/TrackLocation";
import DriverSignup from "./components/DriverSignup";
import Bus from "./components/bus";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/user/login" element={<Login />} />
                    <Route path="/user/signup" element={<Signup />} />
                    <Route path="/user/forgotPassword" element={<ForgotPassword />} />
                    <Route path="/user/resetPassword/:token" element={<ResetPassword />} />
                    <Route path="/user/map" element={<RequireAuth><Bus /></RequireAuth>} />
                    <Route path="/user/map/:busId" element={<RequireAuth><Map /></RequireAuth>} />
                    <Route path="/driver/login" element={<DriverLogin />} />
                    <Route path="/driver/signup" element={<DriverSignup />} />
                    <Route path="/driver/bus/:busId" element={<TrackLocation />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

ReactDom.createRoot(document.querySelector("#root")).render(<AuthProvider>
    <App />
</AuthProvider>)
