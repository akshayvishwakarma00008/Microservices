const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {

    try {
        const event = req.body; // for now whatever is in body is our event
        events.push(event);

        axios.post('http://post-clusterip-srv:4000/events', event).catch(err => console.error("something went wrong :", err.message));
        axios.post('http://comments-srv:4001/events', event).catch(err => console.error("something went wrong :", err.message));
        axios.post('http://query-srv:4002/events', event).catch(err => console.error("something went wrong :", err.message));
        axios.post('http://moderation-srv:4003/events', event).catch(err => console.error("something went wrong :", err.message));

        res.send({ status: 'ok' })

    } catch (error) {
        console.log("something went wrong :", error);
    }

})

app.get('/events', (req, res) =>{
    res.status(200).send(events)
})

app.listen(4005, () => {
    console.log("port listening on 4005");
})