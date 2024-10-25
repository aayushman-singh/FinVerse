import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import AddFunds from './pages/addfunds';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/addfunds' element={<AddFunds />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
