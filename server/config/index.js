'user strict';

var config = {
    db_host : process.env.DB_HOST || '127.0.0.1',
    db_port : process.env.DB_PORT || '3306',
    db_user : process.env.DB_USER || 'root',
    db_pass : process.env.DB_PASS || 'smec123$',
    db_name : process.env.DB_NAME || 'bike_maintainer',
    url: process.env.URL_SERVER
}

module.exports = config