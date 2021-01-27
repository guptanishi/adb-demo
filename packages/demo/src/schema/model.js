const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let product = new Schema({
    manufacturer: String,
    model: String,
})

let detail = new Schema({
    device_owner: String,
    product: product,
    buildVersion: String,
    sdk: String,
    os: String
});

module.exports = mongoose.model("deviceInfo", detail);