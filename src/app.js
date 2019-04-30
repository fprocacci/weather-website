const path = require('path');  // core module, no need to install it
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//console.log(__dirname);

//console.log(path.join(__dirname, '../public'));

const app = express();

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const views_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location.
app.set('view engine', 'hbs');  // setting up handlebars
app.set('views', views_path);
hbs.registerPartials(partials_path);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {             // default directory is /views
    res.render('index.hbs' , {
        title: 'Weather App',
        name: 'Felix the Cat'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',
    {title: 'About',
     name: 'Lily' }
    );
});

app.get('/help', (req, res) => {
    res.render('help.hbs',
    {title: 'HELP',
     name: 'Stripes',
     helptext: 'This is the help text'}
    );
})

// tells server what to do when someone tries to get resource at a particular url.
app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({ error: 'Provide an address'});
    }
    else
    {
        // res.send({
        //     forecast: 'Snow',
        //     location: 'New York',
        //     address: req.query.address
        // });
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={} ) => {
        if (error) {
            return res.send({error});
        }

        forecast (latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address 
            });


        })

    })
    
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({ error: 'Provide a search term'});
    }


    console.log(req.query.search);

    res.send({
        products: []
    })
});

app.get('publicDirectory/help', (req, res) => {
    res.send({
        name: 'Andrew',
        age: 27
    });
});

// app.get(path.join(__dirname, 'about.html'), (req, res) => {
//     res.send('<h1>About page</h1>');
// });

// app.get(path.join(__dirname, 'help.html'), (req, res) => {
//     res.send('<h1>Help page</h1>');
// });
app.get('/help/*', (req, res) => {
    res.render('error.hbs',
    {error_msg: 'Help Topic Not found!!!',
    title: 'HELP TOPIC ERROR'}
    );
});


// This must be last ROUTE!!!, * matches everything else
app.get('*', (req, res) => {
    res.render('error.hbs',
    {error_msg: 'Page Not found!!!',
     title: '404 ERROR'
    }
    );
});


// Starts up the server.
app.listen(3000, ()=> {
    console.log('Server Started');
});

// app.com/help