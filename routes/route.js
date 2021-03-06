const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const Expense = require("../model/expensetrack");

router.route("/insert").post((req, res) => {
  const description = req.body.description;
  const amount = req.body.amount;
  const month = req.body.month;
  const year = req.body.year;
  var expense = new Expense({ description, amount, month, year });

  expense
    .save()
    .then((doc) => res.json(doc))
    .catch((err) => console.log({ create: "Error creating new post" }));
});

router.delete("/delete/:id", (req, res) => {
  Expense.findOneAndDelete({ _id: req.params.id })
    .then((doc) => {
      return res.status(200).json(doc);
    })
    .catch((err) => {
      return res.status(400).json({ _id: "Error occured while deleting." });
    });
});

router.patch("/update/:id", (req, res) => {
  const description = req.body.description.description;
  const amount = req.body.amount;

  Expense.findOne({ _id: req.params.id })
    .then((doc) => {
      doc.description = description;
      doc.description === null || doc.description === undefined
        ? (doc.description = req.body.description)
        : null;
      doc.amount = amount;
      // console.log(doc);
      doc
        .save()
        .then((result) => {
          // console.log(result);
          return res.status(200).json(result);
        })
        .catch((err) => {
          return res.status(400).json({ _id: "Error occured while deleting." });
        });
      // console.log(doc);
    })
    .catch((err) => {
      res.status(400).json({ description: "Error updating existing expense" });
    });
});

router.get("/getall/:month", (req, res) => {
  const month = req.params.month;
  //const month = req.body.month;

  Expense.find({ month: month })
    .then((posts) => res.status(200).json(posts))
    .catch((err) =>
      res.status(400).json({ error: "error getting your expenses" })
    );
});

module.exports = router;
