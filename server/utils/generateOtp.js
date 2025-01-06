// generateOtp.js

/**
 * Generates a random OTP.
 * @param {number} length - The length of the OTP to be generated.
 * @param {boolean} alphanumeric - If true, generates an alphanumeric OTP, else generates a numeric OTP.
 * @returns {string} The generated OTP.
 */
function generateOtp(length = 6, alphanumeric = false) {
  const numericCharacters = "0123456789";
  const alphaNumericCharacters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Select the character set based on the alphanumeric flag
  const characters = alphanumeric ? alphaNumericCharacters : numericCharacters;

  let otp = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters[randomIndex];
  }

  return otp;
}

module.exports = generateOtp;
