require('./env');
const { notFound, errorStack } = require('./utils/errors');
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const routes = require('./routes');
const cors = require("cors");
const app = express();


app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

routes(app);

app.use(notFound);
app.use(errorStack);

module.exports = app;
