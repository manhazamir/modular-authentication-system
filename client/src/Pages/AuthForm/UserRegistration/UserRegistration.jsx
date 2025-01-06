import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../AuthForm/AuthForm.scss";
import { register } from "../../../Services/AuthApi";

const UserRegistration = ({ onSwitchToLogin, setLoading, toast }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(
          8,
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
        )
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&#])/,
          "Password must include uppercase, lowercase, number, and special character."
        )
        .required("Password is required."),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await register(values);
        toast.success(
          "A verification email has been sent to your email address!"
        );
        setSuccessMessage(
          "Please check your inbox and verify your email address."
        );
        onSwitchToLogin();
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Registration failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <h2 className="form-title">Create an Account</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="error">{formik.errors.name}</div>
        ) : null}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}
      </div>
      <button type="submit" className="form-button">
        Register
      </button>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <p className="form-footer">
        Already have an account?{" "}
        <span onClick={onSwitchToLogin} className="form-link">
          Login
        </span>
      </p>
    </form>
  );
};

export default UserRegistration;
