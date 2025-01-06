const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongoose_delete = require("mongoose-delete");
const jwt = require("jsonwebtoken");
const { EXPIRATION_AT } = require("../utils/constants");

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

const Token = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Creating a TTL index that expires the document based on the VERIFICATION_TOKEN expiry after createdAt

Token.index(
  { createdAt: 1 },
  { expireAfterSeconds: EXPIRATION_AT.VERIFICATION_TOKEN }
);

User.plugin(mongoose_delete, {
  overrideMethods: true,
  deletedAt: true,
  deletedBy: true,
});

User.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);

  return next();
});

User.methods.matchPassword = async function (input) {
  return await bcrypt.compare(input, this.password);
};

User.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

module.exports = {
  User: mongoose.model("User", User),
  Token: mongoose.model("Token", Token),
};
