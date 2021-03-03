'use strict';
// if(process.env.NODE_ENV === 'development' ){
//     require('dotenv').config()   
// }
require('dotenv').config()

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const PORT = process.env.PORT || 3001;
const http = require('http')

app.use(morgan('dev'))
app.use('/uploads',express.static('uploads'))
app.options('*',cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,x-token,application-id,module-id');
    next();
});

app.use(function(req, res, next) {
    req.headers['content-type'] = req.headers['content-type'] || 'application/json';
    next();
});

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
});

app.use(bodyParser.json({
    extended: true,
    limit: '500mb',
    parameterLimit: 1000000
}));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '500mb',
    parameterLimit: 1000000
}));

app.use(bodyParser.raw({
    extended: true,
    limit: '500mb',
    parameterLimit: 1000000
}));

app.use(bodyParser.text({
    extended: true,
    limit: '500mb',
    parameterLimit: 1000000
}));


app.get('/',(req,res)=> res.send('Application Programing Interface Bike Maintainer'))

const user = require('./controller/user');
const customer = require('./controller/customer');
const service = require('./controller/service');

app.use('/user', user);
app.use('/customer', customer);
app.use('/service',service)

app.listen(PORT,()=>{
    console.log('application running')
    console.log(`http://localhost:${PORT}/`)

})
