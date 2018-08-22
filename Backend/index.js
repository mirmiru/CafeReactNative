var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var originalMenu = require('./cafeMenu.js')
var db;
var bodyParser = require('body-parser');
var uuidv4 = require('uuid/v4');
// 1. var login = require('./login');
// 2. node login.js (Proxy)

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
  var order = {
    _id: uuidv4(),
    order: request.body
  };

  db.collection('orders').insertOne(order, function(error, result){
    response.status(200).send(order);

    //Koden nedan är endast för att se hur orders collection ser ut. Onödigt egentligen.
    // db.collection('orders').find().toArray(function (error, result){
    //   if (error) {
    //     console.log(error);
    //   }
    //   console.log(result);
    // })
  });
});

app.post('/login', function(request, response) {

  // var username = request.body.username;
  // var password  = request.body.password;

  var {username, password} = request.body;

  if (username === 'fistbump' && password === '123') {
    response.send({}) // success, 200
  }else {
    response.status(401).send({}) // 401, unauthenticated
  };
});

// get order by object id
app.get('/:key', function (request, response) {
console.log(request.params.key);
db.collection('orders').find({"_id": new ObjectId(request.params.key)}).toArray(function (error, result) {
  if (error) {
    response.status(500).send({});
    return;
  }
  console.log(result);
  response.status(200).send(result);
});


});

app.get('/:user', function(request, response) {
  var order = {
    order: request.body
  };

  db.collection('orders').insertOne(order, function(error, result){
    response.status(200).send(result);

    //Koden nedan är endast för att se hur orders collection ser ut. Onödigt egentligen.
    db.collection('orders').find().toArray(function (error, result){
      if (error) {
  //      console.log(error);
      }
  //    console.log(result);
    })
  });
});

app.listen(3000, function () {
  console.log('this webserver is running');
});
