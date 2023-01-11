const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '63aadd980e8a85c97307f24d'
  };
  next();
});

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);
const cardsRouter = require("./routes/cards");
app.use("/cards", cardsRouter);
const unexistRouter = require("./routes/unexist");
app.use("/", unexistRouter);

// const mainRouter = require("./routes/index.js");
// app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log('--------------------------');
  console.log('                          ');
  console.log('SERVER HAS BEEN STARTED!!!');
  console.log('                          ');
  console.log('--------------------------');
});
