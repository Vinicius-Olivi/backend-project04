const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const db = require("../db/config");

// "mongodb://localhost:27017/test"
// db.uri
mongoose.connect(db.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors());
app.use(express.json());

const router = require("./routes/index");

router(app);

const port = process.env.PORT ? Number(process.env.PORT) : 3001;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

module.exports = app;
