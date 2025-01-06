const fs = require("fs");
const path = require("path");
const express = require("express");

const router = express.Router();

const versions = fs
  .readdirSync(__dirname)
  .filter((file) => fs.statSync(path.join(__dirname, file)).isDirectory());

versions.forEach((version) => {
  const versionRouter = require(`./${version}`);
  const versionPrefix = `/${version}`;
  router.use(versionPrefix, versionRouter);
});

module.exports = router;
