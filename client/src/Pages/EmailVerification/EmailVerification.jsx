import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmailAddress } from "../../Services/AuthApi";
import { toast } from "react-toastify";
import { TOAST_MESSAGES } from "../../Utils/constants";

const EmailVerification = () => {
  const [message, setMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const verifyEmail = async () => {
    if (!token) {
      setMessage(TOAST_MESSAGES.invalidToken);
      return;
    }

    try {
      await verifyEmailAddress(token);
      setIsVerified(true);
      toast.success(TOAST_MESSAGES.verificationSuccess);
      setTimeout(() => {
        // window.open("about:blank", "_self");
        // window.close();
        navigate("/"); // Redirect to login page after successful verification
      }, 3000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || TOAST_MESSAGES.verificationFailed
      );
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <div className="verification-container">
      <h2>Email Verification</h2>
      <p>{message}</p>
      {isVerified && <p>You will be redirected to the login page shortly.</p>}
    </div>
  );
};

export default EmailVerification;
