import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import * as RC from "./route_constants";
import { getCurrentUser } from "../Services/AuthApi";
import useSessionTimeout from "../Hooks/useSessionTimeout";

export const PrivateRouteWrapper = ({ children, noWrapper }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Set session timeout (e.g., 15 minutes)
  useSessionTimeout(15 * 60 * 1000); // test: 60 * 1000

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Make a request to the backend to check if the user is logged in

        const user = await getCurrentUser();

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

  if (noWrapper) {
    return children;
  }

  // Redirect unauthenticated users to the login page
  return isAuthenticated ? children : <Navigate to={RC.BASEURL} />;
};
