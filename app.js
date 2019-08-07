const express = require('express')
const route = require("./routes/route")
const bodyParser = require('body-parser')
const app = express()

const mongoose = require('mongoose')
mongoose.Promise= global.Promise 
mongoose.connect("mongodb://localhost/muber",{useNewUrlParser:true},(err)=>{
    if (err) throw err
    console.log("connected");
    
})


app.use(bodyParser.json())
route(app)

app.use((err,req,res,next)=>{
    res.status(422).send({error:err.message})
    
})

module.exports=app