const express = require('express');
const { dbConnection } = require('./Database/config');
const cors = require('cors');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 4000;

dbConnection();

app.use( cors() );

app.use( express.json() );

app.use('/api/auth', require('./Routes/AuhtRoute'));
app.use('/api/event', require('./Routes/EventRoute'));

app.get('/', ( req, res ) => {
    res.json({
        "ok": true
    });
});

app.listen( port, () => {
    console.log(`🚀 Server running on port ${port}!`);
});