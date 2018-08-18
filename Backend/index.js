var express = require('express');
var MongoClient = require('mongodb').MongoClient;
 var originalMenu = require('./cafeMenu.js')
var db;

MongoClient.connect('mongodb://localhost:27017', function (error, client) {
  if (error) {
    console.error('Failed to connect to the database!');
    console.log(error);
  } else {
    console.log('Successfully connect to the database!');
    db = client.db('test');

    db.collection('CaMenu').insert(originalMenu);
  }
});

var app = express();

app.get('/', function (request, response) {
  db.collection('cities').find().toArray(function (error, result) {
    if (error) {
      response.status(500).send({});
      return;
    }
  console.log(result);

  });
});

app.listen(3000, function () {
  console.log('this webserver is running');
});
