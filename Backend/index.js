var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var originalMenu = require('./cafeMenu.js')
var db;
var bodyParser = require('body-parser');
var uuidv4 = require('uuid/v4');

MongoClient.connect('mongodb://localhost:27017', function (error, client) {
  if (error) {
    console.error('Failed to connect to the database!');
    console.log(error);
  } else {
    console.log('Successfully connect to the database!');
    db = client.db('Cafe');

    db.listCollections({ name: 'CaMenu' })
    .next(function(error, collinfo) {
      if (!collinfo) {
        db.collection('CaMenu').insertMany(originalMenu, function (error, result) {
          if (error) {
            console.log("The menu couln't be inserted into MongoDB");
          } else {
            console.log('Added the original menu!');
          }
        });
      }
    });
  }
});

var app = express();

app.use(bodyParser.json());

app.get('/', function (request, response) {
  // test push
  db.collection('CaMenu').find().toArray(function (error, result) {
    if (error) {
      response.status(500).send({});
      return;
    }
    console.log(result);
    response.status(200).send(result);
  });
});

app.post('/', function(request, response) {
  console.log('Req body: ', request.body);
  var order = {
    _id: uuidv4(),
    order: request.body
  };
  console.log('Order: ', order);

  db.collection('orders').insertOne(order, function(error, result){
    response.status(200).send(order);

    //Koden nedan är endast för att se hur orders collection ser ut. Onödigt egentligen.
    // db.collection('orders').find().toArray(function (error, result){
    //   if (error) {
    //     console.log(error);
    //   }
    //   response.send(result);
    // })
  });
});

app.listen(3000, function () {
  console.log('this webserver is running');
});
