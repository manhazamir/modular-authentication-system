import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import { getCurrentUser, logout } from "../../Services/AuthApi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const getUser = async () => {
    const response = await getCurrentUser();
    console.log({ response });
    setUser(response?.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const onLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Welcome to Your Dashboard</h2>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-greeting">
          <p className="welcome-message">
            Hello, <span className="username">{user?.name}</span>!
          </p>
          <p className="dashboard-description">
            You have successfully logged in. This is your dashboard, where you
            can view all your important information and manage your account
            settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
