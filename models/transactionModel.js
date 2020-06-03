const mongoose = require("mongoose");
//DEFINING SCHEMA
const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: Number,
    required: [true, "A transaction must have an ID"],
    unique: [true, "Transaction id must be unique"],
  },
  sourceAccount: {
    type: Number,
    required: [true, "Please provide source account number"],
  },
  targetAccount: {
    type: Number,
    required: [true, "Please provide target account number"],
  },
  amount: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: ["groceries", "eating_out", "other", "salary"],
    required: true,
  },
  year: {
    type: Number,
    select: false,
  },
  month: {
    type: Number,
    select: false,
  },
  day: {
    type: Number,
    select: false,
  },
});
//PRE SAVE DOCUMENT MIDDLEWARE
transactionSchema.pre("save", function (next) {
  this.year = this.time.getFullYear();
  this.month = this.time.getMonth() + 1;
  this.day = this.time.getDate();

  next();
});
//DEFINING MODEL
const Transaction = mongoose.model("Transaction", transactionSchema);
//EXPORTING MODEL
module.exports = Transaction;
