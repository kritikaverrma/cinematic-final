const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");

// including env variables
dotenv.config();
const { PORT, DB_PASSWORD, DB_USER } = process.env;
/**********************connection to our DB********************************/
const dbURL = `mongodb+srv://kritikaverma51510:${DB_PASSWORD}@cluster0.r8cop.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// once

mongoose
  .connect(dbURL)
  .then(function (connection) {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));

// with this your creating simple app -> api
const app = express();
// user crud
const UserRouter = require("./routes/userRouter.js");
// auth
const AuthRouter = require("./routes/authRouter.js");
// movies
//const MoviesRouter = require("./router/MoviesRouter");
// home page
//const DiscoverRouter = require("./router/DiscoverRouter");
// tv shows
//const TvShowsRouter = require("./router/TvRouter");
// video -> video steraming ke liye
//const StreamRouter = require("./router/StreamRouter");
// payment
const PaymentRouter = require("./routes/paymentRouter");

const corsConfig = {
  origin: true,
  credentials: true,
};

// this is allowing all the requests
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
// app.use(mongoSanitize());

app.use("/api/user", UserRouter);

app.use("/api/auth", AuthRouter);

app.use("/api/payment", PaymentRouter);
{
  /*
app.use("/api/movies", MoviesRouter);
app.use("/api/tv", TvShowsRouter);
app.use("/api/discover", DiscoverRouter);
app.use("/api/video", StreamRouter);
;*/
}

/******************handler functions ***************/
// 404 route not found
app.use(function cb(req, res) {
  // response
  res.status(404).json({
    status: "failure",
    message: " route not found",
  });
});
// server -> run on a port
app.listen(process.env.PORT || PORT, function () {
  console.log(` server is listening to port ${PORT}`);
});

/***
 * At code level -> prevent Repetiton -> Factory(controllers)
 * At file level -> structure to segregate the code  -> MVC
 * **/
