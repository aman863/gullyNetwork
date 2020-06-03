const transactionControllers = require("./../controllers/transactionControllers");
const balanceControllers= require("./../controllers/balanceControllers");

const express = require("express");
const router = express.Router();
//BALANCE ROUTES
router
.route("/transactions/monthlyBalance")
.get(balanceControllers.getMonthlyBalance);
router
.route("/transactions/weeklyBalance")
.get(balanceControllers.getWeeklyBalance);
router
.route("/transactions/dailyBalance")
.get(balanceControllers.getDailyBalance);
router
.route("/transactions/categoryBalance")
.get(balanceControllers.categoryExpenditure);


//TRANSACTION ROUTES
router
  .route("/transactions")
  .get(transactionControllers.getTransactions)
  .post(transactionControllers.postTransaction);
router
  .route("/transactions/:id")
  .get(transactionControllers.getOneTransaction);

  
module.exports = router;
