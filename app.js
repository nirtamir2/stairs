var express = require('express')
var app = express()
var path = require("path");
var admin = require("firebase-admin");

var serviceAccount = require("./private/stairs-bd20d-firebase-adminsdk-xwaua-b513215370.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://stairs-bd20d.firebaseio.com/"
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.use(express.static(__dirname + '/static'));


// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("/enter");
ref.once("value", function(snapshot) {
    console.log(snapshot.val());
});



var i = 0;
app.get('/floor/:floorNumber', function (req, res) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    i++;

    var enterRef = db.ref("/enter");
    var newEnter = enterRef.push();
    newEnter.set({
        ip: ip,
        floor: req.params.floorNumber,
        timestamp: Date.now()
    });

    console.log(i);
    console.log(ip);

    res.send(ip);
});

app.listen(808)