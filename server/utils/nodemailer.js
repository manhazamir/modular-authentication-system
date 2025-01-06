const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: process.env.NODEMAILER_PORT === "465",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
});

const sendEmail = (to, subject, html) => {
  return new Promise((resolve, reject) => {
    const msg = {
      from: process.env.NODEMAILER_USER,
      to,
      subject,
      html,
    };

    return transporter.sendMail(msg, (err, info) => {
      if (err) {
        reject(err);
      }
      resolve(info);
    });
  });
};

module.exports = {
  sendEmail,
};
