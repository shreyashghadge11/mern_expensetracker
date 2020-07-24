const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const app = express();
const port = process.env.port || 5000;
app.use(express.json());
const path = require("path");

require("dotenv").config();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

const Mongo = require("./config/keys").mongodb;

mongoose
  .connect(Mongo || process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Mongo Connection successful"))
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;

app.use("/", require("./routes/route"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`server up and running on ${port}`);
});

module.exports = app;
