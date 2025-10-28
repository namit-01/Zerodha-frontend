import React from "react";

const Hero = () => {
  // ✅ Load URLs from .env
  const AUTH_URL = process.env.REACT_APP_AUTH_URL;

  // Redirect to signup page of Auth app
  const handleSignUp = () => {
    window.location.href = `${AUTH_URL}/signup`;
  };

  // Redirect to signin page of Auth app
  const handleSignIn = () => {
    window.location.href = `${AUTH_URL}/signin`;
  };

  return (
    <div className="container py-5 mb-5">
      <div className="row text-center justify-content-center align-items-center">
        {/* Hero Image */}
        <div className="col-12 mb-4">
          <img
            src="media/images/homeHero.png"
            alt="Hero"
            className="img-fluid"
            style={{ maxWidth: "90%", height: "auto" }}
          />
        </div>

        {/* Hero Text */}
        <div className="col-12 col-md-10">
          <h1 className="fw-bold mb-3">Invest in everything</h1>
          <p className="lead text-muted mb-4">
            Online platform to invest in stocks, derivatives, mutual funds, and
            more.
          </p>

          {/* Buttons */}
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              onClick={handleSignUp}
              className="btn btn-primary px-5 py-3 fs-5"
              style={{ maxWidth: "250px", width: "100%" }}
            >
              Sign Up
            </button>

            <button
              onClick={handleSignIn}
              className="btn btn-outline-primary px-5 py-3 fs-5"
              style={{ maxWidth: "250px", width: "100%" }}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
