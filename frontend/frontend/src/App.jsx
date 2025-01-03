import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Canteen1 from './components/Canteen1';
import Canteen2 from './components/Canteen2';
import ViewCart from './components/ViewCart';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/canteen1" element={<Canteen1 />} />
        <Route path="/canteen2" element={<Canteen2 />} />
        <Route path="/viewcart" element={<ViewCart />} />
      </Routes>
    </Router>
  );
};

export default App;
