const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = 4002

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

mongoose.connect("mongodb://127.0.0.1:27017/makemytrip")
    .then((res) => { console.log("connected successfully") })
    .catch((err) => { console.log(err) })

const loginRoutes = require('./routes/login.route')
app.use('/login',loginRoutes)

app.get('/', (req, res) => {
    res.status(200).send("hello page")
})

app.listen(port, () => {
    console.log(`server is listening at port ${port}`)
})