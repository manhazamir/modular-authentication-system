import React, { useState } from "react";
import LoginForm from "./Login/Login";
import RegistrationForm from "./UserRegistration/UserRegistration";
import { toast } from "react-toastify";

import "./AuthForm.scss";
import OtpForm from "./Login/OtpForm";

const AuthForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSwitchToRegister = () => setIsRegistering(true);
  const handleSwitchToLogin = () => {
    setIsRegistering(false);
    setShowOtpForm(false);
  };

  return (
    <div className="auth-container">
      <div className={`auth-box ${loading ? "loading" : ""}`}>
        {isRegistering ? (
          <RegistrationForm
            onSwitchToLogin={handleSwitchToLogin}
            setLoading={setLoading}
            toast={toast}
          />
        ) : showOtpForm ? (
          <OtpForm
            email={email}
            onSwitchToLogin={handleSwitchToLogin}
            setLoading={setLoading}
            toast={toast}
          />
        ) : (
          <LoginForm
            onSwitchToRegister={handleSwitchToRegister}
            toast={toast}
            setLoading={setLoading}
            onOtpRequired={(email) => {
              setEmail(email);
              setShowOtpForm(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AuthForm;
