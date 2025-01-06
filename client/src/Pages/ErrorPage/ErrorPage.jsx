import React from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorPage.scss";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <h1 className="error-page__title">404</h1>
      <p className="error-page__message">
        Oops! The page you're looking for doesn't exist.
      </p>
      <div className="error-page__actions">
        <button className="error-page__button" onClick={() => navigate(-1)}>
          Go Back
        </button>
        <button
          className="error-page__button error-page__button--primary"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
