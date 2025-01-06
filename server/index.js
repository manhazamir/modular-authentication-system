require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

// Setup the mongoose connection database

require("./utils/mongoose");

// Setup body and cookie parser middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.set("trust proxy", 1);

// Express rate limiting on APIs to avoid brute-force attacks
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 1000,
  message: "Too many requests. Please try again later.",
});
app.use(limiter);

// Express mongo santize to sanitize the MongoDB operations for reserved operators
app.use(mongoSanitize());

// Setup CORS
let allowedOrigins = [/localhost:\d{4}$/, /127.0.0.1:\d{4}$/];

const corsConfig = {
  origin: allowedOrigins,
  maxAge: 86400, // NOTICE: 1 day
  credentials: true, // allows cookie to be sent
};

app.use(cors(corsConfig));

app.get("/", (_, res) => {
  res.send("Hello world");
});

const PORT = process.env.PORT || 5000;

app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on ${process.env.NODE_ENV}: ${PORT}`);
});
