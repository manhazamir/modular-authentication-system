import { useEffect } from "react";
import { logout } from "../Services/AuthApi";
import { useNavigate } from "react-router-dom";

// test: 60 * 1000
const useSessionTimeout = (timeout = 15 * 60 * 1000) => {
  const navigate = useNavigate();
  let timeoutId;

  const resetTimeout = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      handleLogout();
    }, timeout);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); // Redirect to login page
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  useEffect(() => {
    // Reset timeout on user activity
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimeout));

    resetTimeout();

    return () => {
      // Cleanup
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach((event) =>
        window.removeEventListener(event, resetTimeout)
      );
    };
  }, []);

  return null;
};

export default useSessionTimeout;
