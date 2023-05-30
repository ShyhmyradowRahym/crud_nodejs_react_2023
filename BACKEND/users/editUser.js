
const db = require('../config/dbConfig')

const express = require('express')
const editUser = express.Router()

editUser.put('/edit-operator', (req, res) => {
    const sql = 'UPDATE users SET `email`=?, `phone`=?, `role`=?, `username`=? WHERE ID=?';
    const id = req.body.id
    db.query(sql, [req.body.email, req.body.phone, req.body.role, req.body.username, id], (err) => {
        if (err) return res.json(err);
        return res.json({
            status: 200,
            message: "success"
        })
    })
})


module.exports = editUser