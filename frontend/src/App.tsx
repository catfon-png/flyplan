import React from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { initializeApp } from "firebase/app";
import { config } from "./config/config";
import AuthRoute from "./components/Others/AuthRoute";
import Dashboard from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { getAuth } from "firebase/auth";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { ErrorPage } from "./pages/ErrorPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

initializeApp(config.firebaseConfig);

function App() {
  const auth = getAuth();
  return (
      <BrowserRouter>
      {window.location.pathname !== "/login" && <Navbar />}{" "}
      {/* Exclude Navbar from Login page */}
      <Routes>
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer />
      </BrowserRouter>
  );
}

export default App;
