const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var expenseSchema = new Schema({
  description: String,
  amount: Number,
  month: String,
  year: Number,
});

module.exports = mongoose.model("Expense", expenseSchema);
