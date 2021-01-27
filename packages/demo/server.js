const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const mongoose = require("mongoose");
const router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const deviceDetails = require('./src/schema/model');
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/deviceDetails", {
    useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once("open", function () {
    console.log("Connection with MongoDB was successful");
});

app.use("/", router);

app.post("/deviceDetails", (req, res) => {
    console.log(req.body);
    var myData = new deviceDetails(req.body);
    //console.log(myData);
    myData.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});