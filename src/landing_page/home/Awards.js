import React from "react";

function Awards() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Image Section */}
        <div className="col-md-6 col-12 text-center p-4">
          <img
            src="media/images/largestBroker.svg"
            alt="Largest Broker"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        {/* Text Section */}
        <div className="col-md-6 col-12 p-4">
          <h2 className="fw-bold text-center text-md-start">
            Largest stock broker in India
          </h2>
          <p className="mb-4 text-center text-md-start">
            2+ million Zerodha clients contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
          </p>

          <div className="row">
            <div className="col-6">
              <ul>
                <li>Futures and Options</li>
                <li>Commodity derivatives</li>
                <li>Currency derivatives</li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li>Stocks & IPOs</li>
                <li>Direct mutual funds</li>
                <li>Bonds and Govt. Securities</li>
              </ul>
            </div>
          </div>

          <div className="text-center text-md-start mt-4">
            <img
              src="media/images/pressLogos.png"
              alt="Press Logos"
              className="img-fluid"
              style={{ maxWidth: "90%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;
