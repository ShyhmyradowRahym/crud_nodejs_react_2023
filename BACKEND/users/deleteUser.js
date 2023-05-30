
const db = require('../config/dbConfig')

const express = require('express')
const deleteUser = express.Router()

deleteUser.delete('/delete-operator/:id', (req, res) => {
    const sql = 'DELETE FROM users WHERE id=?';
    const id = req.params.id
    console.log(id);
    db.query(sql, id, (err) => {
        if (err) return res.json(err);
        return res.json({
            status: 200,
            message: "success"
        })
    })
})


module.exports = deleteUser