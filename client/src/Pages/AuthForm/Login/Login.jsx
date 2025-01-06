import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../AuthForm/AuthForm.scss";
import { login } from "../../../Services/AuthApi";

const Login = ({ onSwitchToRegister, onOtpRequired, setLoading, toast }) => {
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const response = await login(values);

      toast.success("OTP sent to your email.");
      onOtpRequired(response.data.email); // Pass email to parent
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again"
      );
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ isSubmitting }) => (
        <Form className="form">
          <h2 className="form-title">Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              className="form-input"
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              id="password"
              name="password"
              className="form-input"
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <button type="submit" className="form-button" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          <p className="form-footer">
            Don’t have an account?{" "}
            <span onClick={onSwitchToRegister} className="form-link">
              Create one
            </span>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
