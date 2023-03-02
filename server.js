const dotenv = require("dotenv");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const port = process.env.PORT || 3050;
const mongo_url = process.env.MONGODB_URI;

async function start() {
  mongoose.set("strictQuery", true); //additional config for warning

  //Connect mongo db
  await mongoose.connect(mongo_url, {
    useNewUrlParser: true,
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

start();
