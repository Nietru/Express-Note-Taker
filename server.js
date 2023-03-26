const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const PORT = 3001;

const app = express();

app.listen(PORT, () => {
  console.log("Server listening at localhost: " + PORT);
});
