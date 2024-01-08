const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partitalsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partitalsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Me'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About this thang',
        name: 'Me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "llooks liek someones got a prwobwme..?",
        name: "Me",
        solution: 'fuck off',
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    const address = req.query.address
    geocode.geocode(address,(error, {lat, lon, location} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        forecast.forecast(lat, lon, (error, data) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                weatherdata: data,
                location,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "you must provide search term"
        })
    }
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 eror fool',
        name: 'Me da goat',
        error: 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 eror fool',
        name: 'Me da goat',
        error: 'page not found'
    })
})



app.listen(port, () => {
    console.log("Server running on PORT 3000")
})