let express = require('express')
let app = express()

const path = require('path')
let personRoute = require('./routes/person')

app.use((req,res, next)=>{
    console.log(`${new Date().toString()} => ${req.originalUrl}`)
    next()
})

app.use(personRoute)
app.use(express.static('public'))
app.use((req,res)=>{
    res.status(404).send('We think you are lost')
})
app.use((err, req,res, next)=>{
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
})
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>console.info(`Server has started on ${PORT}`))