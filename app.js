// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiKeyMiddleware = require('./middleware/apiKeyMiddleware');
const app = express();
const port = process.env.PORT || 3000;
const host = 'localhost';


app.use(express.json());
app.use(apiKeyMiddleware);  
app.use(cors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));

const brothRoutes = require('./routes/brothRoute');
const proteinRoutes = require('./routes/proteinRoute')
const orderRoutes = require('./routes/orderRoute');

app.use('/broths', brothRoutes);
app.use('/proteins', proteinRoutes);
app.use('/orders', orderRoutes);

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
