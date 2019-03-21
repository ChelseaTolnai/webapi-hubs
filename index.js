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

server.delete('/hubs/:id', (req, res) => {
    const hubId = req.params.id;

    db.hubs
    .remove(hubId)
    .then(deleted => {
        res.status(204).end();
    })
    .catch(({ code, message }) => {
        res.status(code).json({ success: false, message });
    });
});

server.put('/hubs/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.hubs
    .update(id, changes)
    .then(updated => {
        if(updated) {
            res.status(200).json({ success: true, updated });
        } else {
            res.status(404).json({ 
                sucess: false, 
                message: 'I cannot find the hub you are looking for',
            });
        }
    })
    .catch(({ code, message }) => {
        res.status(code).json({ success: false, message });
    });
});

server.listen(4000, () => {
    console.log(`\n *** Running on port 4000 ***\n`)
});