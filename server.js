// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

const bodyParser = require('body-parser');
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const shortid = require('shortid');

var books = [
  {id: 5, title: 'Harry Potter', description: 'A magic book'},
  {id: 4, title: 'How to be poet', description: 'So many poem'},
]

db.defaults({ books: [] }).write();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/books', (req, res) => {
  res.render('books/index', {
    books: books,
  })
})

app.get('/books/create', (req, res) => {
  res.render
})

app.get('/', (req, res) => {
  res.render('index');
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
