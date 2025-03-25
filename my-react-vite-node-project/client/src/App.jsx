import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import IconMenu from './components/IconMenu';
import ImageSlider from './components/ImageSlider';
import Horaire from './Horaire'; // Correct import path
import Medecin from './Medecin'; // Correct import path
import Propos from './Propos'; // Correct import path
import CreateCompt from './CreateCompt'; // Correct import path
import Login from './Login'; // Correct import path
import Boutoun from './components/btn'; // Correct import path
import Dashboard from './components/Dashboard'; 
import Profile from './components/Profile';
import TakeAppointment from './components/TakeAppointment'; // Correct import path
import "./App.css"
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import AppointmentsList from "./components/AppointmentsList";
import EditProfile from './components/EditProfile';
const App = () => {
  const location = useLocation();

  return (
    <div>
      
      {location.pathname === '/' && <IconMenu />}
      <Routes>
      <Route path="/edit-profile" element={<EditProfile />} />

        <Route path="/AppointmentsList" element={<AppointmentsList />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/take-appointment" element={<TakeAppointment />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<ImageSlider />} />
        <Route path="/Horaire" element={<Horaire />} />
        <Route path="/Medecin" element={<Medecin />} />
        <Route path="/Propos" element={<Propos />} />
        <Route path="/CreateCompt" element={<CreateCompt />} />
        <Route path="/Login" element={<Login />} />
      
      </Routes>
      {location.pathname === '/' && (
        <div>
          <Boutoun />
          <Boutoun />
        </div>
      )}
    </div>
  );
};

export default App;