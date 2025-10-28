import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import Hero from "./Hero";
import Awards from "./Awards";
import Stats from "./Stats";
import Pricing from "./Pricing";
import Education from "./Education";
import OpenAccount from "../../OpenAccount";
import Footer from "../../Footer";

const HomePage = () => {
  const DASHBOARD_URL =
    process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";
  const BACKEND_URL =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:3002";

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      // ✅ If token doesn't exist → stay on landing page
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        // ✅ If expired → remove and stay
        if (isExpired) {
          console.warn("JWT expired, removing...");
          localStorage.removeItem("token");
          return;
        }

        // ✅ Ask backend to verify
        const response = await fetch(`${BACKEND_URL}/verifyToken`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();

        console.log("🔍 Token verification result:", data);

        // ✅ Only redirect if backend explicitly confirms valid = true
        if (data.valid === true) {
          window.location.href = `${DASHBOARD_URL}/?token=${token}`;
        } else {
          console.warn("Backend says token invalid — staying on landing page.");
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Token check failed:", err);
        localStorage.removeItem("token");
      }
    };

    checkToken();
  }, [DASHBOARD_URL, BACKEND_URL]);

  return (
    <>
      <Hero />
      <Awards />
      <Stats />
      <Pricing />
      <Education />
      <OpenAccount />
    </>
  );
};

export default HomePage;
