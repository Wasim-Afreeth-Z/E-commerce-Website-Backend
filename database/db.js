const mysql =require('mysql2')
var util = require('util');


const db=mysql.createConnection({
    // connectionLimit: 10,
    // host: "localhost",
    // user: "root",
    // password: "1234",
    // database: "ecommerce_website_db",
    // charset: 'utf8mb4'
    connectionLimit: 10,
    host: "besqmdgi016kfzlubm2k-mysql.services.clever-cloud.com",
    user: "u3o3vrrn9khc4onx",
    password: "yNEqKYArruTtQWu6wjTv",
    database: "besqmdgi016kfzlubm2k",
    port:3306,
    charset: 'utf8mb4'
})
db.connect(function(){
    console.log('Connected to Database')
})
db.query = util.promisify(db.query)

module.exports = db 