const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//  IMPORTING ROUTES
const authRoute = require('./routes/authRoute')
const profileRoute = require('./routes/profileRoutes')
const postRoute = require('./routes/postRoute')
const commentRoute = require('./routes/commentRoute')

//GENERETED VARIABLES 
const app = express()
const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb://localhost:27017/MRH_BLOG'

//USING MIDDLEWARES
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('uploads'))

// USING ROUTES
app.use('/auth', authRoute);
app.use('/profile', profileRoute)
app.use('/post', postRoute)
app.use('/comment', commentRoute)
app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})

app.listen(PORT, () => {
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('MONGODB CONNECTED')
    })
    console.log('LISTING TO THE PORT', PORT)
})