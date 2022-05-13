const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./Routes/UserRoute");
const NoteRoute = require("./Routes/NoteRoute");
const cors = require("cors");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api", NoteRoute);

app.get("/", (req, res) => {
  res.send("Api is running....");
});

mongoose
  .connect(process.env.mongo_connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Database connected`))
  .catch((err) => console.log(err));

app.listen(process.env.port, () => {
  console.log(`Server is running at port on ${process.env.port}` || 7000);
});
