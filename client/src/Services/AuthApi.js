import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const API_DEVELOPMENT_VERSION = "v1";

axios.defaults.baseURL = `${API_BASE_URL}/${API_DEVELOPMENT_VERSION}`;
axios.defaults.withCredentials = true;

// Login API
export const login = async (loginPayload) => {
  const response = await axios.post("/auth/login", loginPayload);
  return response.data;
};

// Register API
export const register = async (userPayload) => {
  const response = await axios.post("/users/user", userPayload);
  return response.data;
};

// Verify Email API
export const verifyEmailAddress = async (token) => {
  const response = await axios.get(`/users/verify/${token}`);

  return response.data;
};

// Verify OTP API
export const verifyOtp = async (otpPayload) => {
  const response = await axios.post("/auth/verify-otp", otpPayload);
  return response.data;
};

// Logout API
export const logout = async () => {
  const response = await axios.post("/auth/logout");

  return response.data;
};

// Get Current User

export const getCurrentUser = async () => {
  const response = await axios.get("/auth/me", { withCredentials: true });

  return response.data;
};
