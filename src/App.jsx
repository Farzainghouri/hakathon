import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./compunent/Navbar";
import Home from "./pages/Home";
import Wedding from "./loan/weddingLoan";
import Business from "./loan/weddingLoan";
import Form from "./loginDetail/Form";
import Login from "./auth/Login";
import Logintwo from "./auth/loginTwo";
import Change from "./auth/ChangePassword";

import React from "react";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wedding" element={<Wedding />} />
        <Route path="/businesss" element={<Business />} />
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logintwo" element={<Logintwo />} />
        <Route path="/changepaswd" element={<Change />} />
      </Routes>
    </Router>
  );
}

export default App;
