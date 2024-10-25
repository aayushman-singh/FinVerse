import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import AddFunds from './pages/addfunds';
import Chatbot from './pages/chatbot';
import Header from './pages/header';
import Portfolio from './pages/portfolio';
import Login from './pages/login';
import Signup from './pages/signup';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userInfo")));

  const handleLogin = (userData) => {
    localStorage.setItem("userInfo", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <Router>
      <div>
        <Header user={user} onLogout={handleLogout} />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/portfolio' element={<Portfolio />} />
          <Route path='/addfunds' element={<AddFunds />} />
          <Route path='/chatbot' element={<Chatbot />} />
          <Route path='/login' element={<Login onLogin={handleLogin} />} />
          <Route path='/signup' element={<Signup onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
