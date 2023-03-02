const env = require('./env');
const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect("mongodb+srv://" + env.username+ ":" + env.password + "@cluster0.pjohcwl.mongodb.net/?retryWrites=true&w=majority");
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log("Database Conneted"));

app.use(cors());
const appRoute = require('./src/routes/route-jurusan');
app.use('/', appRoute);

app.listen(process.env.PORT, () => {
    console.log('Server Berjalan di Port : 3000');
});

