const express = require("express");
const app = express();
const transactionRouter = require("./routes/transactionRoutes");
const globalErrorHandler = require("./controllers/errorControllers");

//USING MIDDLEWARES
app.use(express.json());


console.log(process.env.NODE_ENV);
//MOUNTING THE ROUTER
app.use("/", transactionRouter);

//USING ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);
module.exports = app;
