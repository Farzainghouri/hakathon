import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5q97k3mQHu3n1iod5ngTO3-zA5nRqT6Y",
    authDomain: "hakathone-7393e.firebaseapp.com",
    projectId: "hakathone-7393e",
    storageBucket: "hakathone-7393e.firebasestorage.app",
    messagingSenderId: "1070658491828",
    appId: "1:1070658491828:web:d282a6c22fbab8d3660ee1",
    measurementId: "G-SJWQNLCJN1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginForm = () => {
    const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!validateEmail(formData.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }
    if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // Firebase login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("User logged in:", userCredential.user);
      alert("Login Successful!");
      Navigate("/")
    } catch (error) {
      console.error("Error logging in:", error);
      setErrors({ firebase: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          {/* Submit Button with Loader */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            {loading ? (
              <div className="animate-spin border-4 border-t-transparent border-white w-5 h-5 rounded-full" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        {errors.firebase && (
          <p className="text-red-500 text-center text-sm mt-4">
            {errors.firebase}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
