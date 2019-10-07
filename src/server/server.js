const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://admin:456987@cluster0-erwsh.mongodb.net/clinica?retryWrites=true&w=majority', 
{useNewUrlParser: true,
useUnifiedTopology: true
});

app.use(require('../routes/routes'));
//app.use(require('../controllers/ControllerDashboard'));

app.listen(4545, (req, res) =>{
    console.log('conectado!')
});