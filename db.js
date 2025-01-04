const mongoose = require('mongoose');
const MongoURL = 'mongodb://localhost:27017/task_manager';

mongoose.connect(MongoURL);
const db = mongoose.connection;

db.on('connected', () => console.error("DB Connected"));
db.on('error', (error) => console.error("Error connecting to database", error));
db.on('disconnected', () => console.error("DB Disconnected"));

module.exports = db;