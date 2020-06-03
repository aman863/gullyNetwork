const Transaction = require("./../models/transactionModel");
const catchAsync = require("./../utils/catchAsync");

//POST A TRANSACTION
exports.postTransaction = catchAsync(async (req, res, next) => {
  const transactions = await Transaction.create(req.body);
  res.status(200).json({
    status: "success",
    message: "Transaction successfully uploaded",
    transactions,
  });
});

//GET FILTERED TRANSACTIONS
exports.getTransactions = catchAsync(async (req, res, next) => {
  let transactions = await Transaction.find(req.query)
    .select("-_id")
    .select("-__v");
  res.status(200).json({
    status: "success",
    results: transactions.length,
    transactions,
  });
});
// GET A PARTICULAR TRANSACTION
exports.getOneTransaction = catchAsync(async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await Transaction.findOne({
    transactionId: transactionId,
  })
    .select("-__v")
    .select("-_id");
  res.status(200).json({
    status: "success",
    transaction,
  });
});
