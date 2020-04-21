const express = require('express');
const shortid = require('shortid');

const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('transactions/index', {
    transactions: db.get('transactions').value(),
  })
})

module.exports = router;