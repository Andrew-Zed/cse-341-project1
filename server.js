const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-Width, Content-Type, Accept, Z-key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// app.use(bodyParser.json());

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.error('Failed to initialize database:', err);
    } else {
        app.listen(port, () => {
            console.log(`Database connected. Server running on port ${port}`);
        });
    }
});
