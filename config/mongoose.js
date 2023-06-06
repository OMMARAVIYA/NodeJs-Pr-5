const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/PR-5");

const db = mongoose.connection;

db.on('connected', (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("DB Connected");
})

module.exports = db;