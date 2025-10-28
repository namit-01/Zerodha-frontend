import React, { useState, useEffect } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  // ✅ Load URLs from .env (with fallback)
  const API_URL = process.env.REACT_APP_API_URL;
  const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL;

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Already logged in → skip signin page
      window.location.href = `${DASHBOARD_URL}/?token=${token}`;
    }
  }, [DASHBOARD_URL]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Signing in...");

    try {
      const res = await fetch(`${API_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Login successful!");
        localStorage.setItem("token", data.token);

        // ✅ Redirect to dashboard root with token
        window.location.href = `${DASHBOARD_URL}/?token=${data.token}`;
      } else {
        setMessage(`❌ ${data.message || "Invalid credentials"}`);
      }
    } catch (error) {
      console.error("Signin error:", error);
      setMessage("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-2xl w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default SignIn;
