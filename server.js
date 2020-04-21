// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const shortid = require("shortid");

// Routes

const usersRoute = require('./routes/users.route');

app.use('/users', usersRoute);

db.defaults({ books: [] }).write();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/books", (req, res) => {
  res.render("books/index", {
    books: db.get("books").value()
  });
});

app.get("/books/create", (req, res) => {
  res.render("books/create");
});

app.post("/books/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/books");
});

app.get("/books/edit/:id", (req, res) => {
  res.render("books/edit", {
    id: req.params.id
  });
});

app.post("/books/edit", (req, res) => {
  db.get("books")
    .find({ id: req.body.id })
    .assign({ title: req.body.title })
    .write();
  res.redirect("/books");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/books/delete/:id", (req, res) => {
  db.get("books")
    .remove({ id: req.params.id })
    .write();
  res.redirect("/books");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
