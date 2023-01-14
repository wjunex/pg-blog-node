var mysql = require('mysql')
var connection = mysql.createConnection({
    host: '139.9.146.62',
    user: 'root',
    password: '123456',
    database: 'pgblog',
    timezone: '08:00'
})

connection.connect()

module.exports = connection;
