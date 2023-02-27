const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/user");
const cityRouter = require("./routes/cities");
const portRouter = require("./routes/port");
const fobRouter = require("./routes/fob");
const cors = require("cors");
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const helmet = require("helmet");

app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", userRouter);
app.use("/cities", cityRouter);
app.use("/ports", portRouter);
app.use("/fob", fobRouter);

module.exports = app;
