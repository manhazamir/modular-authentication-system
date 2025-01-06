import React, { useState } from "react";
import { verifyOtp } from "../../../Services/AuthApi";
import { useNavigate } from "react-router-dom";

const OtpForm = ({ email, onSwitchToLogin, setLoading, toast }) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // Handle OTP input change
  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and limit to 6 digits
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await verifyOtp({ email, otp });
      toast.success("Login successful!");
      navigate("/dashboard"); // Redirect to the dashboard
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleVerifyOtp} className="form">
      <h2 className="form-title">Enter OTP</h2>
      <div className="form-group">
        <label htmlFor="otp">OTP</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={handleOtpChange}
          required
          maxLength="6"
          pattern="[0-9]*" // Optional, can be used for mobile devices to show number pad
        />
      </div>
      <button type="submit" className="form-button">
        Verify OTP
      </button>
      <p className="form-footer">
        Need to login again?{" "}
        <span onClick={onSwitchToLogin} className="form-link">
          Login
        </span>
      </p>
    </form>
  );
};

export default OtpForm;
