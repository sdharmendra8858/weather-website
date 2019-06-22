const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebar engines and view locations
app.set('views',viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Ghost'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Ghost'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        message: 'It is a Help message!',
        name: 'Ghost'
    })
})

app.get('/weather',(req, res)=>{

    if(!req.query.address){
        return res.send({
            error: 'You must provide an Address!'
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                forecast : forecastData,
                location,
                address:req.query.address
            })

        })
    })
})

app.get('/product',(req, res)=>{

    if(!req.query.search){
        return res.send({
            error: 'You must provide a Search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title: 'Error-404',
        name: 'Ghost',
        errorMessage: 'Help article not found.'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title: 'Error-404',
        name: 'Ghost',
        errorMessage: 'Error 404 page not found.'
    })
})

app.listen(port,()=>{
    console.log('server is running on port port')
})