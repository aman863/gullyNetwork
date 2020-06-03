const Transaction = require("./../models/transactionModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

//GETS MONTHLY BALANCE
exports.getMonthlyBalance = catchAsync(async (req, res, next) => {
  const month = req.body.month;
  const year = req.body.year;
  let monthlyNetBalance;
  // BALANCE OF A PARTICULAR MONTH
  if (month && year) {
    monthlyNetBalance = await Transaction.aggregate([
      {
        $match: {
          time: {
            $gte: new Date(`${year}-${month}-01`),
            $lte: new Date(`${year}-${month}-31`),
          },
        },
      },
      {
        $group: {
          _id: null,
          balance: { $sum: "$amount" },
        },
      },
    ]);
    if (monthlyNetBalance.length === 0) {
      return next(new AppError("No data available", 404));
    }
    res.status(200).json({
      status: "success",
      year: year,
      month: month,
      balance: monthlyNetBalance[0].balance,
    });
  }
  //MONTHLY BALANCE OF A GIVEN YEAR
  else if (!month && year) {
    monthlyNetBalance = await Transaction.aggregate([
      {
        $match: {
          time: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$time" },
          balance: { $sum: "$amount" },
        },
      },
      {
        $project: {
          month: "$_id",
          balance: true,
          _id: false,
        },
      },
    ]);
    if (monthlyNetBalance.length === 0) {
      return next(new AppError("No data available", 404));
    }
    res.status(200).json({
      status: "success",
      year: year,
      monthlyNetBalance,
    });
  }
  //MONTHLY BALANCE OF ALL TIME TRANSACTIONS
  else if (!month & !year) {
    monthlyNetBalance = await Transaction.aggregate([
      {
        $match: {
          transactionId: {
            $gt: 0,
          },
        },
      },

      {
        $group: {
          _id: {
            month: { $month: "$time" },
            year: { $year: "$time" },
          },
          balance: { $sum: "$amount" },
        },
      },
      {
        $project: {
          yearAndMonth: "$_id",
          balance: true,
          _id: false,
        },
      },
    ]);
    if (monthlyNetBalance.length === 0) {
      return next(new AppError("No data available", 404));
    }
    res.status(200).json({
      status: "success",
      monthlyNetBalance,
    });
  }
});
// GET WEEKLY BALANCE
exports.getWeeklyBalance = catchAsync(async (req, res, next) => {
  const month = req.body.month;
  const year = req.body.year;
  const week = req.body.week;
  let weeklyNetBalance;
  // BALANCE OF A GIVEN WEEK
  if (week && month && year) {
    weeklyNetBalance = await Transaction.aggregate([
      {
        $match: {
          time: {
            $gte: new Date(`${year}-${month}-${7 * (week - 1) + 1}`),
            $lte: new Date(`${year}-${month}-${7 * week + 1}`),
          },
        },
      },

      {
        $group: {
          _id: null,
          balance: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: false,
        },
      },
    ]);
  }
  // WEEKLY BALANCE OF A GIVEN MONTH
  else if (!week && month && year) {
    weeklyNetBalance = await Transaction.aggregate([
      {
        $match: {
          time: {
            $gte: new Date(`${year}-${month}-01`),
            $lte: new Date(`${year}-${month}-31`),
          },
        },
      },
      {
        $group: {
          _id: { $week: "$time" },
          balance: { $sum: "$amount" },
        },
      },
      {
        $project: {
          week: "$_id",
          _id: false,
          balance: true,
        },
      },
    ]);
  }
  //WEEKLY BALANCE OF A GIVEN YEAR
  else if (!week && !month && year) {
    weeklyNetBalance = await Transaction.aggregate([
      {
        $match: {
          time: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $project: {
          week: { $week: "$time" },
          amount: true,
        },
      },
      {
        $group: {
          _id: "$week",
          balance: { $sum: "$amount" },
        },
      },
      {
        $project: {
          month: "$_id",
          balance: true,
          _id: false,
        },
      },
    ]);
  }
  // WEEKLY BALANCE OF ALL TIME TRANSACTIONS
  else if (!week && !month && !year) {
    weeklyNetBalance = await Transaction.aggregate([
      {
        $match: {
          transactionId: {
            $gt: 0,
          },
        },
      },

      {
        $group: {
          _id: {
            year: { $year: "$time" },
            month: { $month: "$time" },
            week: { $week: "$time" },
          },
          balance: { $sum: "$amount" },
        },
      },
      {
        $project: {
          yearAndMonthAndWeek: "$_id",
          balance: true,
          _id: false,
        },
      },
    ]);
  }
  // CHECKING IF THE DATA IS AVAILABLE
  if (weeklyNetBalance.length === 0) {
    return next(new AppError("No data available", 404));
  }
  //SENDING DATA TO CLIENT
  res.status(200).json({
    status: "success",
    year,
    month,
    week,
    weeklyNetBalance,
  });
});

//GET DAILY BALANCE
exports.getDailyBalance = catchAsync(async (req, res, next) => {
  const day = req.body.day;
  const dayTwo = parseInt(req.body.day) + 1;
  const month = req.body.month;
  const year = req.body.year;

  let dailyNetBalance;
  //DAILY BALANCE OF A GIVEN DAY
  if (day && month && year) {
    dailyNetBalance = await Transaction.aggregate([
      {
        $match: {
          time: {
            $gte: new Date(`${year}-${month}-${day}`),
            $lte: new Date(`${year}-${month}-${dayTwo}`),
          },
        },
      },
      {
        $group: {
          _id: null,
          balance: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: false,
          balance: true,
        },
      },
    ]);
  }
  //DAILY BALANCE OF A GIVEN MONTH
  else if (!day && month && year) {
    dailyNetBalance = await Transaction.aggregate([
      {
        $match: {
          time: {
            $gte: new Date(`${year}-${month}-01`),
            $lte: new Date(`${year}-${month}-31`),
          },
        },
      },
      {
        $project: {
          day: { $dayOfMonth: "$time" },
          amount: true,
        },
      },
      {
        $group: {
          _id: "$day",
          balance: { $sum: "$amount" },
        },
      },
      {
        $project: {
          day: "$_id",
          balance: true,
          _id: false,
        },
      },
    ]);
  }
  //CHECKING IF DATA IS AVAILABLE
  if (dailyNetBalance.length === 0) {
    return next(new AppError("No data available", 404));
  }
  //SENDING DATA TO CLIENT
  res.status(200).json({
    status: "success",
    totalDays: dailyNetBalance.length,
    day,
    month,
    year,
    dailyNetBalance,
  });
});
// CATEGORY WISE EXPENDITURE
exports.categoryExpenditure = catchAsync(async (req, res, next) => {
  const year = req.body.year;
  const month = req.body.month;
  const day = req.body.day;
  const category = req.body.category;
  const dayTwo = parseInt(req.body.day) + 1;
  let categoryExpenditure;
  //BALANCE OF A PARTICULAR CATEGORY
  if (category) {
    // BALANCE OF A PARTICULAR DAY
    if (year && month && day) {
      categoryExpenditure = await Transaction.aggregate([
        {
          $match: {
            time: {
              $gte: new Date(`${year}-${month}-${day}`),
              $lte: new Date(`${year}-${month}-${dayTwo}`),
            },
          },
        },
        {
          $match: {
            category: category,
          },
        },
        {
          $group: {
            _id: null,
            balance: { $sum: "$amount" },
          },
        },
        {
          $project: {
            _id: false,
            balance: true,
          },
        },
      ]);
    }
    // BALANCE OF A PARTICULAR MONTH
    else if (year && month && !day) {
      categoryExpenditure = await Transaction.aggregate([
        {
          $match: {
            time: {
              $gte: new Date(`${year}-${month}-01`),
              $lte: new Date(`${year}-${month}-31`),
            },
          },
        },
        {
          $match: {
            category: category,
          },
        },
        {
          $group: {
            _id: null,
            balance: { $sum: "$amount" },
          },
        },
        {
          $project: {
            _id: false,
            balance: true,
          },
        },
      ]);
    }
    //BALANCE OF A PARTICULAR YEAR
    else if (year && !month && !day && category) {
      categoryExpenditure = await Transaction.aggregate([
        {
          $match: {
            time: {
              $gte: new Date(`${year}-01-01`),
              $lte: new Date(`${year}-12-31`),
            },
          },
        },
        {
          $match: {
            category: category,
          },
        },
        {
          $group: {
            _id: null,
            balance: { $sum: "$amount" },
          },
        },
        {
          $project: {
            _id: false,
            balance: true,
          },
        },
      ]);
    }
    // BALANCE OF ALL TIME TRANSACTIONS
    else if (!year && !month && !day && category) {
      categoryExpenditure = await Transaction.aggregate([
        {
          $match: {
            transactionId: {
              $gt: 0,
            },
          },
        },
        {
          $match: {
            category: category,
          },
        },
        {
          $group: {
            _id: null,
            balance: { $sum: "$amount" },
          },
        },
        {
          $project: {
            _id: false,
            balance: true,
          },
        },
      ]);
    }
  }
  // BALANCES OF ALL CATEGORIES
  else if (!category) {
    //BALANCE OF A PARTICULAR DAY
    if (year && month && day) {
      categoryExpenditure = await Transaction.aggregate([
        {
          $match: {
            time: {
              $gte: new Date(`${year}-${month}-${day}`),
              $lte: new Date(`${year}-${month}-${dayTwo}`),
            },
          },
        },
        {
          $group: {
            _id: "$category",
            balance: { $sum: "$amount" },
          },
        },
        {
          $project: {
            category: "$_id",
            _id: false,
            balance: true,
          },
        },
      ]);
    }
    //BALANCE OF A PARTICULAR MONTH
    else if (month && year && !day) {
      categoryExpenditure = await Transaction.aggregate([
        {
          $match: {
            time: {
              $gte: new Date(`${year}-${month}-01`),
              $lte: new Date(`${year}-${month}-31`),
            },
          },
        },
        {
          $group: {
            _id: "$category",

            balance: { $sum: "$amount" },
          },
        },
        {
          $project: {
            _id: false,
            category: "$_id",
            balance: true,
          },
        },
      ]);
    }
    //BALANCE OF A PARTICULAR YEAR
    else if (year && !month && !day) {
      categoryExpenditure = await Transaction.aggregate([
        {
          $match: {
            time: {
              $gte: new Date(`${year}-01-01`),
              $lte: new Date(`${year}-12-31`),
            },
          },
        },
        {
          $group: {
            _id: "$category",
            balance: { $sum: "$amount" },
          },
        },
        {
          $project: {
            category: "$_id",
            _id: false,
            balance: true,
          },
        },
      ]);
    }
    //BALANCE OF ALL TIME TRANSACTIONS
    else if (!month && !year && !day) {
      categoryExpenditure = await Transaction.aggregate([
        {
          $match: {
            transactionId: {
              $gt: 0,
            },
          },
        },
        {
          $group: {
            _id: "$category",
            balance: { $sum: "$amount" },
          },
        },
        {
          $project: {
            _id: false,
            balance: true,
            category: "$_id",
          },
        },
      ]);
    }
  }
  //CHECKING IF DATA IS AVAILABLE
  if (categoryExpenditure.length === 0) {
    return new AppError("No data available", 404);
  }
  //SENDING DATA TO THE CLIENT
  res.status(200).json({
    status: "success",
    year,
    month,
    day,
    category,
    categoryExpenditure,
  });
});
