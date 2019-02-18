const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.get('/now', (req, res) => {
    const now = new Date().toISOString();
    res.send(now)
});

server.get('/hubs', (req, res) => {
    db.hubs
    .find()
    .then(hubs => {
        res.status(200).json({ success: true, hubs });
    })
    .catch(err => {
        res.status(err.code).json({ success: false, message: err.message });
    });
});

server.post('/hubs', (req, res) => {
    const hub = req.body;

    db.hubs
    .add(hub)
    .then(hub => {
        res.status(201).json({succes: true, hub });
    })
    .catch(({code, message}) => {
        res.status(code).json({ success: false, message });
    });
});

server.listen(4000, () => {
    console.log(`\n *** Running on port 4000 ***\n`)
});