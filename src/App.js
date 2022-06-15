import './App.css';
import Home from "./components/Home";
import Nav from "./components/Navbar"
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
        <Nav />
      <Home />
    </>
  );
}

export default App;
