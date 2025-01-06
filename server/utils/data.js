exports.cookieOptions = {
  maxAge: process.env.AUTH_COOKIE_EXPIRY,
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? true : "none",
  secure: true,
};
