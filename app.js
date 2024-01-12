const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes');

app.use('/', router);

const connectionConfig = {
  url: 'mongodb://localhost:27017/movies-lobby',
};
const connectOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

mongoose.connect(`${connectionConfig.url}`, connectOptions);

mongoose.connection.on('connected', () => {
  const connectionString = connectionConfig.url;
  console.log(`[mongodb] default connection open to ${connectionString}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`[mongodb] default connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('[mongodb] default connection disconnected');
});

mongoose.set('debug', (collectionName, method, query, doc, options) => {
  console.log(`[mongodb][${collectionName}][${method}] ${JSON.stringify(query)}`);
});

app.listen(8080, () => {
  console.log('DAZN app listening on port 8080!');
});
