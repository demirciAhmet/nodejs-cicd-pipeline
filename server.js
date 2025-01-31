require('dotenv').config();
const express = require('express');
const basicAuth = require('basic-auth');
const app = express();
const port = 3000;

// Basic Auth middleware
const auth = (req, res, next) => {
    const credentials = basicAuth(req);

    if (!credentials || 
        credentials.name !== process.env.USERNAME || 
        credentials.pass !== process.env.PASSWORD) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        return res.status(401).send('Authentication required.');
    }
    next();
};

// Root route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Protected secret route
app.get('/secret', auth, (req, res) => {
    res.send(process.env.SECRET_MESSAGE);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 