// app.js
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const host = 'localhost';


app.use(express.json());

const brothRoutes = require('./routes/brothRoute');
const proteinRoutes = require('./routes/proteinRoute')

app.use('/broths', brothRoutes);
app.use('/proteins', proteinRoutes);

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
