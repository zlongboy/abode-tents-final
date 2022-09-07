require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const homeRoute = require('./routes/home');
const shopRoute = require('./routes/shop');
const aboutRoute = require('./routes/about');
const pdpRoute = require('./routes/pdp');
const compareRoute = require('./routes/compare');

app.use('/', homeRoute);
app.use('/shop', shopRoute);
app.use('/contact', aboutRoute);
app.use('/kelty-rumpus', pdpRoute);
app.use('/compare', compareRoute);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});