const express = require('express');
const mongodb = require('./data/database');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

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
