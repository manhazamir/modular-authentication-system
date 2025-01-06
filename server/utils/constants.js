const verificationTemplate = (token) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow: hidden;
      }
      .header {
        background-color: #4caf50;
        color: #ffffff;
        text-align: center;
        padding: 20px;
      }
      .content {
        padding: 20px;
        line-height: 1.5;
        color: #333333;
      }
      .footer {
        background-color: #f4f4f4;
        text-align: center;
        padding: 10px;
        font-size: 12px;
        color: #666666;
      }
      a.button {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #4caf50;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>Welcome!</h1>
      </div>
      <div class="content">
        <p>Hi there,</p>
        <p>We're excited to have you onboard!</p>
        <p>Please click the button below to verify your email address and complete your registration.</p>
        <a href="${process.env.REACT_APP_FRONTEND_URL}/verify-email?token=${token}" class="button">Verify Email</a>
        <p>If you have any questions, feel free to reach out to us anytime.</p>
        <p>Best regards,<br>Team Awesome</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 Team Awesome. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;

const twoAuthFactorTemplate = (otp) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow: hidden;
      }
      .header {
        background-color: #4caf50;
        color: #ffffff;
        text-align: center;
        padding: 20px;
      }
      .content {
        padding: 20px;
        line-height: 1.5;
        color: #333333;
      }
      .footer {
        background-color: #f4f4f4;
        text-align: center;
        padding: 10px;
        font-size: 12px;
        color: #666666;
      }
      a.button {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #4caf50;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>Here's your OTP!</h1>
      </div>
      <div class="content">
        <p>Hi!</p>
        <p>Please use the below one-time pin (OTP).</p>
        <a>${otp}</a>
        <p>Please ignore this email if you did not request.</p>
        <p>Best regards,<br>Team Awesome</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 Team Awesome. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;

exports.EMAIL_MESSAGES = {
  EMAIL_VERIFICATION: {
    subject: "Verify Your Email Address",
    message: (token) => verificationTemplate(token),
  },
  LOGIN_VERIFICATION: {
    subject: "Login: OTP",
    message: (otp) => twoAuthFactorTemplate(otp),
  },
};

exports.EXPIRATION_AT = {
  VERIFICATION_TOKEN: 600, // 600 seconds = 10 minutes
};
