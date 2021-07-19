const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/weather');

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory  to path
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Taushik Das'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Taushik Das'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Taushik Das',
        purpose: 'This page helps you to find more about the application.'
    })
})

app.get('/user', (req, res) => {
    res.send({
        name: 'Taushik Das',
        age: 29,
        work: 'none',
    })
});
 
app.get('/weather', (req, res) => {
    
    if(!req.query.address) {
        return res.send({ error: 'Must provide an address'})
    }
    const place = req.query.address;
    geocode(place, (error, {latitude, longitude, location} = {}) => {

        if(error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, {temperature, feelslike, weather_descriptions } = {} ) => {
            if(error) return res.send({error});
            res.send({
                location,
                temperature,
                feelslike,
                weather_descriptions,
                place
            })
        });
        
    })
    
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
       return res.send({
            error:'Must provide a search term'
        });
    }
    res.send({
        products: 'No Products'
    })
})

// for 404 page using wild cards
app.get('/help/*', (req, res) => {
    res.render('page_404',{
        title: 'Error 404',
        message: 'Help article not found',
        name: 'Taushik Das'
    });
})

app.get('*', (req, res) => {
    res.render('page_404',{
        title: 'Error 404',
        message: 'Error 404, Page not found ',
        name: 'Taushik Das'
    });
})


app.listen(3000, () => {
    console.log('Server running on port 3000');
});