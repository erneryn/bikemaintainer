'use strict';
if(process.env.NODE_ENV === 'development' ){
    require('dotenv').config()   
}
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3001;



app.use(cors());
app.use(bodyParser.urlencoded({extended: true,}))


app.get('/',(req,res)=> res.send('Application Programing Interface Bike Maintainer'))

const user = require('./controller/user');
const customer = require('./controller/customer');
const service = require('./controller/service');

app.use('/user', user);
app.use('/customer', customer);
app.use('/service',service)

app.listen(PORT,()=>{
    console.log('application running')
})