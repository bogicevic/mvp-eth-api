const express = require('express'),
  app = express(),
  HOST = 'http://localhost',
  PORT = 3000;

const bodyParser = require('body-parser');
const routes = require('./routes');

/*
 * Normalno bih koristio process.env.HOST i process.env.PORT varijablu.
 * e.g. const PORT = +process.env.PORT || 3000 (+ castuje u number)
 * A one bi bile exportovane iz config.js modula.
 * Ovako ne moras ti da se zezas sa setovanjem.
 *
 * Ili ubaciti .env fajl, pa koristiti dotenv paket da hendluje varijable
 */

routes(app);

app.use((req, res, next) => {
  res.status(404).send(`${req.originalUrl} route not found`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(PORT, () => {
  console.log(`Ethereum Vault API running on ${HOST}:${PORT}`);
});
