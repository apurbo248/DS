const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("Api is running....");
});

const port = process.env.PORT || 7000;
app.listen(port, console.log(`Server started on port ${port}`));
