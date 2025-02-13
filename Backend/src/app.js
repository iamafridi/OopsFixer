const express = require('express'); //requiring express
const aiRoutes = require('./routes/ai.routes')  //requiring routes

const cors = require('cors')



const app = express() //calling express

app.use(cors())
//Testing 
app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.use(express.json()) //middleware, as we used post method and use .body

app.use('/ai',aiRoutes)


module.exports = app