import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contact from "./contact";
import Home from "./Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Rentals from './Rentals';

function App() {
  return (
    <div>
      <Header />
      <Router>
        <div className="App">
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            <Routes>
              <Route path="/contact" element={<Contact />} />
            </Routes>
             <Routes>
              <Route path="/rentals" element={<Rentals />} />
            </Routes>
          </div>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
