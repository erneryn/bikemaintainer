const mysql = require('mysql2/promise');
const config = require('./index');

var db_pool = mysql.createPool({
    host: config.db_host,
    user: config.db_user,
    password: config.db_pass,
    database: config.db_name,
    port: config.db_port,
    connectionLimit: 10,
    waitForConnections: true,
    namedPlaceholders: true,
    decimalNumbers: true,
    dateStrings: true,
    connectTimeout: 15000,
    timezone: '+00:00'
});

module.exports = db_pool