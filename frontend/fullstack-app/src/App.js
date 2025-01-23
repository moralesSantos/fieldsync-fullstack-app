import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SavePage from "./pages/SavePage";
import FetchPage from "./pages/FetchPage";
import { UserProvider } from "./UserContext";
import Navbar from "./components/Navbar"


const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/save" element={<SavePage />} />
          <Route path="/fetch" element={<FetchPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
