import React from "react";
import Navbar from "./layouts/navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Forcast from "./pages/Forcast";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./routes/protectedroutes";

function App() {

  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-50">

      {!hideNavbar && <Navbar />}

      <main className="max-w-7xl mx-auto p-6">

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route path="/forecast" element={<Forcast />} />
          <Route path="/about" element={<About />} />

        </Routes>

      </main>
    </div>
  );
}

export default App;