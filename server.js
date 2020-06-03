//ENTRY POINT
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });
//HANDLING ANY UNCAUGHT EXCEPTION
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION: SHUTTING DOWN..");
  console.log(err.name, err.message);
  process.exit(1);
});
//CONNECTING TO THE DATABASE
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database connected succesfully"))
  .catch((err) => {
    console.log(err);
    console.log("Error while connecting to database");
  });
//LISTENING ON PORT
app.listen(3000, () => {
  console.log("server is up and running on port 3000");
});
// HANDLING UNHANDLED REJECTION
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("unhandled rejection: shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
