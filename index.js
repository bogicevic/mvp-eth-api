require('dotenv').config()

const express = require('express'),
  app = express(),
  HOST = process.env.HOST || 'http://localhost',
  PORT = +process.env.PORT || 3000;

const bodyParser = require('body-parser');
const routes = require('./routes');

routes(app);

app.use((req, res, next) => {
  res.status(404).send(`${req.originalUrl} route not found`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(PORT, () => {
  console.log(`Ethereum Vault API running on ${HOST}:${PORT}`);
});
