'use strict';

const express = require('express');
const path = require('path');
const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use(express.static('dist'));

app.use(function(req, res, next){
  res.status(404);
  res.end('404 Not Found');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});