const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const monk = require('monk');

const config = require('./config.json');
const routes = require('./routes');

const db = monk(config.mongodb);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  req.db = db;
  next();
});
app.use('/', routes);

app.listen(3001, () => {
  console.log('API is running.');
});
