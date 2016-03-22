'use strict';

let express = require('express');
let app = express();
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:db');

let publicRouter = express.Router();


require('./routes/login')(publicRouter);
app.use('/users', publicRouter);

app.listen(3000, () => {
  console.log('THREE THOUSAND');
});
