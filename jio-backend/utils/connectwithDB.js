const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { DB_PASSWORD, DB_USER } = process.env;

const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@jio-cinema.lzocot8.mongodb.net/?retryWrites=true&w=majority`;

// once
const connectwithDB = () => {
  mongoose
    .connect(dbURL)
    .then(function (connection) {
      console.log("connected to db");
    })
    .catch((err) => console.log(err));
};

module.exports = connectwithDB;
