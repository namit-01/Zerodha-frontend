import React, { useState, useEffect } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;
  const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
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
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{
          width: "380px",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <div className="text-center mb-4">
          <img
            src="https://zerodha.com/static/images/logo.svg"
            alt="Zerodha Logo"
            width="140"
            className="mb-3"
          />
          <h3 className="fw-bold text-primary mb-1">Welcome Back</h3>
          <p className="text-muted">Sign in to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control form-control-lg rounded-3"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control form-control-lg rounded-3"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold rounded-3"
          >
            Sign In
          </button>
        </form>

        {message && (
          <div className="alert alert-light text-center mt-3 mb-0 border-0">
            {message}
          </div>
        )}

        <hr className="my-4" />
        <p className="text-center text-muted">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-primary text-decoration-none fw-semibold"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
