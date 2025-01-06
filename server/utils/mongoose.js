const mongoose = require("mongoose");

// Create connection

async function connectToDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });

    console.log(
      `Connection established for MongoDB at ${conn.connection.host}`
    );

    return conn;
  } catch (err) {
    console.log("Connection error in MongoDB", err);
    throw err;
  }
}

module.exports = connectToDB();
