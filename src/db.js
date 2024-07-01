const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/node', {
    UseNewUrlParser: true,
    UseUnifiedToplogy: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDb');
});

module.exports = db;