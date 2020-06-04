const Transaction = require("./../models/transactionModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

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
  let queryObj = { ...req.query };
  let queryString = JSON.stringify(queryObj);
  //Filtering the transactions
  const excludedFields = ["page", "limit", "sort", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);
  let query = JSON.stringify(queryObj);
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte)\b/g,
    (match) => `$${match}`
  );
  query = JSON.parse(query);
  //Sorting transactions
  if (req.query.sort) {
    sortQuery = req.query.sort;
  } else {
    sortQuery = "time";
  }

  //Paginating transactions
  const page = parseInt(req.query.page) || 1; //defining default values here
  const limit = parseInt(req.query.limit) || 100;
  const skip = (page - 1) * limit;
  console.log(query);
  const transactions = await Transaction.find(query)
    .sort(sortQuery)
    .skip(skip)
    .limit(limit)
    .select("-_id")
    .select("-__v");
  if (transactions.length === 0) {
    return next(new AppError("No transactions available", 404));
  }
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
