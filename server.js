const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const session = require('express-session')
const path = require('path')
const MongoStore = require('connect-mongo');

// CONTROLLER + MIDDLEWARE IMPORTS
const isSignedIn = require('./middleware/is-signed-in.js')
const passUserToView = require('./middleware/pass-user-to-view.js')
const authController = require('./controllers/auth.js')
const restaurantsController = require('./controllers/restaurants.js')

const port = process.env.PORT ? process.env.PORT : '3000'

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

app.use(passUserToView)

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  })
})

app.get('/owner-area', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the owner area ${req.session.user.username}.`)
  } else {
    res.send('Sorry, no guests allowed.')
  }
})

app.use('/auth', authController)
app.use('/restaurants', isSignedIn, restaurantsController)

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`)
})