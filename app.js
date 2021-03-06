const express = require("express");
const morgan = require("morgan");
const views = require("./views");
const layout = require("./views/layout");
const { db, Page, User } = require("./models");
const wiki = require('./routes/wiki')
// const users = require('./routes/users')

const app = express();

//authenticate database
db.authenticate().then(() => {
  console.log("connected to the database");
});

const init = async () => {
  await db.sync({ force: true });
};

//middleware
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use('/wiki', wiki);
// app.use('/users', users);


app.get("/", (req, res) => {
  res.redirect("/wiki");
});

app.listen(1337, () => {
  console.log("listening");
});

init();
