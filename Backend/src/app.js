const express = require('express'); //requiring express
const aiRoutes = require('./routes/ai.routes')  //requiring routes

const app = express() //calling express

//Testing 
app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.use(express.json()) //middleware, as we used post method and use .body

app.use('/ai',aiRoutes)


module.exports = app