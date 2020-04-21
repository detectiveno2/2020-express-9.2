const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
  res.render('users/index', {
    users: db.get('users').value(),
  })
})

router.get('/create', (req, res) => {
  res.render('users/create');
})

router

module.exports = router;