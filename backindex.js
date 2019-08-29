const express = require("express");
const bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
const mongo = require('mongodb').MongoClient;
const mongoose = require("mongoose");
let router = express.Router();

var app = express();
const path = require("path");


//parse application
app.use(bodyParser.urlencoded({ extended: false }))

// parse application to json
app.use(bodyParser.json())

mongo.connect("mongodb://localhost", {  useUnifiedTopology: true  }, function(err, client){
    if(err){
        throw err;
    }
    console.log('Mongodb est connecté....');
    
    //je récupère le nom de ma DB

    let contacts = require('./routes/contacts');
    app.use('/', contacts);


    var db = client.db('resume');
    const Contact = db.collection("resume");
    Contact.findOne({}, function (findErr, result) {
      if (findErr) throw findErr;
    //   console.log(result.username);
    });
})



app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');

});

app.listen(3000, function(error){
    if(!error) console.log("everything works");
});
