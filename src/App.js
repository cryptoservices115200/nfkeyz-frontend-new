import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

import Home from "./pages/home";
import Admin from "./pages/admin";

import "./App.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  function getLibrary(provider) {
    return new Web3(provider);
  }
  return (
    <div className="App">
      <Web3ReactProvider getLibrary={getLibrary}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/whitelist" element={<Admin />} />
          </Routes>
        </Router>
      </Web3ReactProvider>
    </div>
  );
}

export default App;
