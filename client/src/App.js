import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar'; // Import the Navbar component

import LoginPage from './component/Login'; // Import your LoginPage component
import SignupPage from './component/SignUp'; // Import your SignupPage component
import Home from './component/Home';
import VotingPage from './component/VotingPage';
import VotingDetails from './component/VotingDetails';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/voting" element={<VotingPage />} />
          <Route path="/voting-details" element={<VotingDetails />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
