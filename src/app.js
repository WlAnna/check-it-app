const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const topArtists2 = require('./utils/topArtists2')

const app = express()
const port = process.env.PORT || 3000


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anna Wl',
        hide: "hide",
  
        dark: "nav-main-color",
        basic: "nav-main-dark"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Anna Wl',
        hide: "hide",
        dark: "nav-main-color",
        basic: "nav-main-color"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'For mode information contact AnnaWl.',
        title: 'Help',
        hide: "hide",
        name: 'Anna Wl',
        dark: "nav-main-color",
        basic: "nav-main-color"
    })
})

app.get('/topArtist', (req, res) => { 
    res.render('topArtist', {
        title: 'Top Artist',
        name: 'Anna Wl',
        cat1: 'Filter by Country',
        cat2: 'Filter by Music Type',
        active: "active",
        active2: "basic",
        dark: "nav-main-dark",
        basic: "nav-main-color"
    })
})

app.get('/topArtist-filter', (req, res) => { 
    res.render('topArtist-filter', {
        title: 'Top Artist',
        name: 'Anna Wl',
        cat1: 'Filter by Country',
        cat2: 'Filter by Music Type',
        active: "basic",
        active2: "active",
        dark: "nav-main-dark",
        basic: "nav-main-color"
      
    })
})

app.get('/topArtist2', (req, res) => { 
    if(!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }     

    console.log(req.query)

    topArtists2(req.query.address, (error,data) => {
        if(error) {
            return res.send({ error })
        } else {
            res.send({
               
               topArt: data.topArtista
            })
        }
    })

})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }     
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
          return res.send({ error })
        } else {
          forecast(req.query.unit, latitude, longitude, (error, forecastData, forecastDataIcon) => {
            if(error) {
              return res.send({ error })
            }
             res.send({
                 forecast: forecastData,
                 location,
                 latitude,
                 longitude,
                 address: req.query.address, 
                 unit: req.query.unit,
                 image: forecastDataIcon      
             })
        })
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
 res.render('404', {
     title: '404',
     name: 'Anna Wl',
     errorMessage: 'Help article not found'
 })
})

app.get('*', (req, res)=> {
    res.render('404', {
        title: '404',
        name: 'Anna Wl',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})
