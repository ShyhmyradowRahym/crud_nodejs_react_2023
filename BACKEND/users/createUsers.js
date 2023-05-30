
const db = require('../config/dbConfig')

const express = require('express')
const createUsers = express.Router()

createUsers.post('/create-operator', (req, res) => {
    const sql = "INSERT INTO users (`email`, `phone`, `role`, `username`) VALUES (?)"
    const values = [
        req.body.email,
        req.body.phone,
        req.body.role,
        req.body.username,
    ]
    console.log(values);
    db.query(sql, [values], (err) => {
        if (err) return res.json(err);
        return res.json({
            status: 200,
            message: "success"
        })
    })
})


module.exports = createUsers