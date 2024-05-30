// middleware/apiKeyMiddleware.js
require('dotenv').config();

const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    const validApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
        return res.status(403).json({ error: 'Forbidden: Invalid API Key' });
    }

    next();
};

module.exports = apiKeyMiddleware;
