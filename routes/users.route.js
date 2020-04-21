const express = require('express');
const shortid = require('shortid');

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

router.post('/create', (req, res) => {
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect('/users');
})

router.get('/edit/:id', (req, res) => {
  let user = db.get('users').find({id: req.params.id}).value();
  res.render('users/create', {
    id: user.id,
    oldName: user.name,
    oldPhone: user.phone,
  })
})

module.exports = router;