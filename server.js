const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
const path = require("path");
const cors = require("cors");
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

const Mongo =
  "mongodb+srv://shree:shree_1234@cluster0-ty3uo.gcp.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(process.env.MONGO_URI || Mongo, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Mongo Connection successful"))
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;

app.use("/api", require("./routes/route"));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`server up and running on ${port}`);
});

module.exports = app;
