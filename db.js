const mysql = require('mysql')


//connection

const connection = mysql.createConnection({
    user: 'root',
    password: 'root@123',
    host: 'localhost',
    port: 3306,
    database: "record",
    multipleStatements: true

})

module.exports = { connection }