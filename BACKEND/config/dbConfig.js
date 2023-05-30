const mysql = require('mysql')
const env = require('dotenv').config()

const db = mysql.createConnection({
    host: 'localhost',
    database: 'userdb',
    user: 'root',
    password: ''
})

db.connect(error => {
    if (error) throw error
    console.log('db connect');
})

module.exports=db