//Budget API

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

var budget = require('./budget.json');


app.get('/budget',(req,res) => {
    res.send(budget);
});

app.listen(port,() => {
    console.log('API served at http://localhost:'+ port)
});