import React from 'react'
import LandingPage from './pages/landingPage'
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter> <div><LandingPage /></div></BrowserRouter>
   
  )
}

export default App