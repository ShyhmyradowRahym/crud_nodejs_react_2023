const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const cookieParser = require("cookie-parser")
const jwt = require('jsonwebtoken')
const db = require('./config/dbConfig')
const app = express()
app.use(express.json())
app.use(cookieParser())
const getUsers = require('./users/index')
const createUsers = require('./users/createUsers')
const editUser = require('./users/editUser')
const deleteUser = require('./users/deleteUser')
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true
}))

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({
            message: 'we need token please provide it.'
        })
    } else {
        jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
            if (err) {
                return res.json({
                    message: 'Authentication error'
                })
            } else {
                req.name = decoded.name;
                next()
            }
        })
    }
}

app.use('/api', getUsers)
app.use('/api', createUsers)
app.use('/api', editUser)
app.use('/api', deleteUser)

app.get('/checkTokens', verifyUser, (req, res) => {
    console.log(req.name);
    return res.json({
        message: 'Success',
        username: req.name,
        status: 200
    })
})

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM user_information WHERE email= ? AND password= ?';
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json({ message: 'Server side error' })
        if (data.length > 0) {
            const name = data[0].username;
            console.log(name);
            const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", { expiresIn: '1d' })
            console.log(token);
            res.cookie('token', token)
            res.status = 200
            res.send({
                "token": token,
                "message": "Success"
            })
        }
        else {
            return res.json({
                message: 'No existed',
                status: 404
            });
        }
    })
})

app.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({
        message: "Success"
    })
})


app.listen(5000, () => {
    console.log('running');
})