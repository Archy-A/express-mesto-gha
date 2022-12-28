const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '63aadd980e8a85c97307f24d'
  };
  next();
});

const usersRouter = require("./routes/users");
app.use("/", usersRouter);
const cardsRouter = require("./routes/cards");
app.use("/", cardsRouter);

// app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
  console.log('--------------------------');
  console.log('                          ');
  console.log('SERVER HAS BEEN STARTED!!!');
  console.log('                          ');
  console.log('--------------------------');

});