// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');

// Get our API routes
// const api = require('./server/routes/api');

const app = express();

// Parsers for POST data

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/propairWeb')));

// Set our api routes
// app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/propairWeb/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3214';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Server running on http://localhost:${port}`));
