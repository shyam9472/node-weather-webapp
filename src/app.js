const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { get } = require('http')
const e = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine' , 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
      title: 'Weather app',
      name: 'Shyam'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
      title: 'About!!',
      name: 'Shyam'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
      title: 'Help',
      name: 'Shyam'
    })
})
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    text: 'Help article not found!',
    name: 'Shyam'
  })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
      return res.send({
        error: 'No address was provided. Please provide address!'
      })
    }
    else {
      geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
        if (error) {
        return res.send({
          error: error
        })
       }
       if ({latitude, longitude, location }) {
        forecast(longitude, latitude, (error, forecastData) => {
          if (error) {
            return res.send({
              error: error
            })
          }
          res.send({
            forecastData: forecastData,
            location,
            address: req.query.address
          })
        })
      }
     })
    }
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      'error': "You must provide the search term!"
    })
  }
    res.send({
      products: []
    })
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    text: 'Page not found!',
    name: 'Shyam'
  })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})