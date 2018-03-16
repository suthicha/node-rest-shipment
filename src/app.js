const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const bookingRouters = require('./api/routes/bookings');
const jobRouters = require('./api/routes/jobs');
const userRouters = require('./api/routes/user');
const companyRouters = require('./api/routes/company');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Handler cors accept.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

// Routes handler request.
app.use('/user', userRouters);
app.use('/bookings', bookingRouters);
app.use('/jobs', jobRouters);
app.use('/company', companyRouters);


// Handler error catching.
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

module.exports = app;