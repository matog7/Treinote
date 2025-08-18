import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Training from './pages/Training';
import Community from './pages/Community';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Events from './pages/Events';
// import Profile from './pages/Profile';
import './App.css';
import MyTrainingDashboard from './components/features/training/MyTrainingDashboard';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/training' element={<Training />} />
          <Route path='/community' element={<Community />} />
          <Route path='/events' element={<Events />} />
          <Route path='/login' element={<Login />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-training' element={<MyTrainingDashboard />} />
          {/* <Route path='/profile' element={<Profile />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
