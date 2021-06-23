require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.database_url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (e) => console.error(e));
db.on("open", () => console.log("Connected to database"));

app.use(express.json());

const usersRouter = require("./routes/users");
app.use('/users', usersRouter)

app.listen(3000, () => console.log("Server Started"));
