// app.js
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const host = 'localhost';


app.use(express.json());



app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
