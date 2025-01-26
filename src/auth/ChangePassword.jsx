import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const Navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "A password reset email has been sent. Please check your inbox."
      );
      Navigate("/logintwo")
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setError(error.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin border-4 border-t-transparent border-white w-5 h-5 rounded-full" />
            ) : (
              "Send Reset Email"
            )}
          </button>
        </form>

        {/* Success Message */}
        {message && (
          <p className="text-green-600 text-center text-sm mt-4">{message}</p>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-center text-sm mt-4">{error}</p>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
