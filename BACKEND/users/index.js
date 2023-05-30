
const db=require('../config/dbConfig')

const express=require('express')
const get_users=express.Router()

get_users.get('/users', (req,res)=>{
    const sql="SELECT * FROM USERS"
    db.query(sql, (err, data)=>{
        if (err) return res.json({
            message:"Error inside server"
        })
        return res.json(data)
    })
})


module.exports=get_users