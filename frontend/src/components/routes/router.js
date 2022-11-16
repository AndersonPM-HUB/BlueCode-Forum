import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nosotros from "../pages/nosotros"; 
import Login from '../forms/Login';
import Register from '../forms/register';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Nosotros />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}
