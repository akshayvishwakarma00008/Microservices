const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes} = require('crypto')
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
})
app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
        id,
        title
    }

    await axios.post('http://event-bus-srv:4005/events',{
        type:'PostCreated',
        data:{
            id,
            title
        }
    }).catch(err => console.error("something went wrong: ", err.message));

    res.status(201).send(posts[id]);
})

app.post('/events', (req, res) => {
    res.status(200).send({})
})

app.listen(4000,()=>{
    console.log("version test - 0.0.60");
    console.log("listening on port 4000");
});