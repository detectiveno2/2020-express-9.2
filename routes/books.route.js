const express = require("express");
const shortid = require("shortid");

const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("books/index", {
    books: db.get("books").value()
  });
});

router.get("/create", (req, res) => {
  res.render("books/create");
});

router.post("/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/books");
});

router.get("/edit/:id", (req, res) => {
  res.render("books/edit", {
    id: req.params.id
  });
});

router.post("/edit", (req, res) => {
  db.get("books")
    .find({ id: req.body.id })
    .assign({ title: req.body.title })
    .write();
  res.redirect("/books");
});

router.get("/delete/:id", (req, res) => {
  db.get("books")
    .remove({ id: req.params.id })
    .write();
  res.redirect("/books");
});

module.exports = router;
