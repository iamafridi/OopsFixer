const express = require('express'); //requiring express

const app = express() //calling express

//Testing 
app.get('/',(req,res)=>{
    res.send('Hello World')
})

module.exports = app