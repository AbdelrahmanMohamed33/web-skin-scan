import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // ✅ Changed to HashRouter
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Doctors from './Components/Doctors';
import Blogs from './Components/Blogs';
import Footer from './Components/Footer';
import Scan from './Components/Scan';
import Feedback from './Components/Feedback';
import Login from './Components/Login';
import Register from './Components/Register';
import ForgotPassword from './Components/Forgot-password'; 
import Account from './Components/Account';
import Logout from './Components/Logout';
import { AuthProvider } from './Components/contextAuth';
import History from "./Components/History";
import Details from './Components/Details';
import Appointment from './Components/Appointment';
import Success from './Components/Success';
import Booking from './Components/Booking';
import Doctordetails from './Components/Doctordetails';
import Users from './Components/Users';
import Chat from './Components/Chat';
import Clinics from './Components/Clinics';
import Clinicdetails from './Components/Clinicdetails';

function App() {
  const [page, setPage] = useState('login');

  return (
    <AuthProvider>
      <Router> {/* ✅ Now using HashRouter */}
        <>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/scan" element={<Scan />} />
              <Route path="/history" element={<History />} />
              <Route path="/about" element={<About />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/login" element={<Login setPage={setPage} />} />
              <Route path="/register" element={<Register setPage={setPage} />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/account" element={<Account />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/appointment/:doctorId" element={<Appointment />} />
              <Route path="/doctordetails" element={<Doctordetails/>} />
              <Route path="/success" element={<Success/>}/>
              <Route path="/users" element={<Users/>}/>
              <Route path="/booking/:doctorId" element={<Booking />} />
              <Route path="/chat" element={<Chat/>}/>
              <Route path="/clinics" element={<Clinics/>}/>
              <Route path="/clinicdetails/:id" element={<Clinicdetails/>}/>
            </Routes>
          </main>
          <Footer />
        </>
      </Router>
    </AuthProvider>
  );
}

export default App;
