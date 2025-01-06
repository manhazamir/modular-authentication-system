import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import * as RC from "./route_constants";
import { getCurrentUser } from "../Services/AuthApi";

export const PublicRouteWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await getCurrentUser();
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Redirect authenticated users to the dashboard
  return isAuthenticated ? <Navigate to={RC.DASHBOARD} /> : children;
};
