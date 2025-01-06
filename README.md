# User Guide for a Secure User Authentication System

## Introduction

A modular authentication system for MERN apps, designed to provide secure user authentication with features such as login, registration, email verification, two-factor authentication (2FA via email OTP), password hashing and automatic session expiry. The application ensures secure access control and prevents data breaches and cyber threats such as brute force and XSS attack through rate limiting and secure cookies.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [User Registration](#user-registration)
3. [Email Verification](#email-verification)
4. [Login Process](#login-process)
5. [OTP Authentication](#otp-authentication)
6. [Session Management & Expiry](#session-management--expiry)
7. [Error Handling](#error-handling)
8. [Logout](#logout)
9. [Technology Stack](#technology-stack)

---

## 1. Getting Started

To get started, clone the repository and install the necessary dependencies.

### Installation Steps

1. Clone the repository:
    ```bash
    git clone <repository_url>
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```

3. Install frontend dependencies:
    ```bash
    npm install
    ```

4. Run the backend server:
    ```bash
    npm run dev
    ```

5. Run the frontend server:
    ```bash
    npm start
    ```

Ensure both the backend and frontend servers are running to interact with the application.

---

## 2. User Registration

### Setting up an account

To register a new user, the user needs to provide:

1. Name
2. Email
3. Password

All fields are required and must be validated before registering. 


## 3. Email Verification

### How to Verify Your Email:

1. After successful registration, a verification email will be sent.
2. The email contains a verification link with a **token**.
3. Click on the **Verify** link in the email, which will redirect you to the verification page on the web application.
4. If the token is valid, the user will be marked as verified, and you will be redirected to the login page.
5. If the token is invalid or expired, an error message will be shown.

---

## 4. Login Process

### How to Log In:

1. Enter your **email** and **password**.
2. After submission, the server verifies the credentials.
3. If the credentials are correct, an OTP (One-Time Password) will be sent to your email.
4. Enter the received OTP in the input field and submit.

---


## 5. OTP Authentication

### OTP Verification Flow:

1. After logging in with your credentials, an OTP will be sent to the registered email.
2. You will need to input the OTP on the frontend to verify your identity.
3. If the OTP is valid, you will be successfully logged in and directed to your dashboard.

The OTP expires after a set period (10 minutes), and if the user fails to verify it within the time limit, the request will be rejected, and a new OTP can be generated.

---

## 6. Session Management & Expiry


### JWT Authentication

The application uses JSON Web Tokens (JWT) for secure user authentication. Upon successful login, a JWT token is generated and stored in an HTTP-only cookie, which helps to mitigate potential Cross-Site Scripting (XSS) attacks. The token is not exposed to JavaScript, making it more secure.

Key properties configured for the authentication cookie:

1. httpOnly: true: This flag ensures that the cookie is not accessible by JavaScript, thus making it immune to XSS attacks.
2. secure: true: This flag ensures that the cookie is only sent over HTTPS connections.
3. maxAge: Defines how long the cookie is valid (in milliseconds).
4. No accessToken in response body: The JWT token is not included in the response body of the login request. Instead, the token is set directly in the cookie. This method improves security by limiting the exposure of the token to the client-side JavaScript, ensuring it is stored and sent automatically with each subsequent request to the backend, as needed.

### Automatic Session Expiry:

The application automatically expires user sessions after a period of inactivity to enhance security.

1. The session timeout is configured to log the user out automatically after a defined period (i.e., 15 minutes of inactivity).
2. If a user is inactive for a specific duration, they will be logged out and redirected to the login page.
3. The session expiry timer is reset with every user action, ensuring that the user remains logged in as long as they are actively using the application.

---

## 7. Error Handling

The application uses a comprehensive error handling mechanism:

1. **Invalid Credentials:** If the user provides incorrect credentials during login, an error message will be displayed.
2. **Invalid OTP:** If the OTP provided is incorrect, an error message will appear.
3. **Session Expiry:** If the session expires due to inactivity, the user will be logged out and redirected to the login page.
4. **Server Errors:** The application handles various server errors providing appropriate feedback to the user.

---

## 8. Logout

### How to Log Out:

1. To log out, simply click on the **Logout** button, typically located in the dashboard section.
2. The application will clear your authentication cookies and redirect you to the login page.

Once logged out, all active sessions will be terminated.

---

## 9. Technology Stack & Libraries

The application utilizes the following technologies:

### Frontend:
- **React.js**: The user interface is built using React.js, a popular JavaScript library for building interactive UIs.
- **React Router**: Used for navigation between different pages.
- **Axios**: For handling HTTP requests to the backend.
- **React Toastify**: For displaying toast notifications (success, error, etc.) in the UI.
- **SASS**: Allows for better customization and organization of styles compared to plain CSS.
- **Yup**: For input validations in frontend.
- **Web-vitals**: To measure and track real user performance on the site.

### Backend:
- **Node.js**: The backend is powered by Node.js, a JavaScript runtime built on Chrome’s V8 engine.
- **Express.js**: A fast web framework for Node.js used to create RESTful APIs.
- **JWT (JSON Web Tokens)**: Used for authentication and session management via cookies.
- **MongoDB**: The database used to store user data, including emails and passwords.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **Nodemailer**: A module for Node.js used to send emails, allowing seamless integration of email services within applications.
- **JOI**: For input validations in backend.

### Security:
- **Bcrypt**: For hashing passwords.
- **JWT**: Used to generate tokens for user authentication.
- **Cookies**: Authentication tokens are stored in cookies with HTTP-only and secure settings.
- **Rate Limiting**: To prevent brute-force attacks on the login routes.

---

## Conclusion

A ready-to-use authentication module that developers can integrate without needing deep customization. It includes core security measures, including email verification, JWT and OTP authentication, password hashing and session expiry, ensure that the user’s data and session are protected from unauthorized access.
