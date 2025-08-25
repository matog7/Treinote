import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import {
  Home,
  Training,
  Community,
  Login,
  Contact,
  Events,
  About,
  Profile,
  Coach,
  Settings,
} from "./pages";

import "./App.css";
import MyTrainingDashboard from "./components/features/training/MyTrainingDashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/training" element={<Training />} />
          <Route path="/community" element={<Community />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-training" element={<MyTrainingDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/coaches" element={<Coach />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
