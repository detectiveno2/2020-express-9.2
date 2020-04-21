const express = require("express");
const shortid = require("shortid");

const controller = require('../controllers/books.controller');
const db = require("../db");

const router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", controller.postCreate);

router.get("/edit/:id", controller.edit);

router.post("/edit", controller.postEdit);

router.get("/delete/:id", );

module.exports = router;
