const mysql = require('mysql')

const pool = mysql.createPool({
    host: '139.9.146.62',
    user: 'root',
    password: '123456',
    database: 'pgblog',
    timezone: '08:00',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


module.exports = pool;
