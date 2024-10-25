import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import AddFunds from './pages/addfunds';
import Chatbot from './pages/chatbot';
import Header from './pages/header';
const App = () => {
  return (
    <Router>
      <div>
      <Header/>
        <Routes>
         
          <Route path='/' element={<LandingPage />} />
          <Route path='/addfunds' element={<AddFunds />} />
          <Route path='/chatbot' element={<Chatbot />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
