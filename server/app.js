const express = require('express');
var cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

const { createClient } = require('redis');
let redisClient;

const setUpRedis = async () => {
    redisClient = await createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
}

setUpRedis();

app.get('/', async (req, res) => {
    const userId = req.headers.userid;
    console.log(userId)
    const key = `user-${userId}`;

    let layout = await redisClient.get(key);
    if (!layout) {
        await redisClient.set(key, 1)
    } else {
        layout = (layout % 3) + 1;
        await redisClient.set(key, layout);
    }

    console.log(layout)

    res.json({
        layout
    })
});

app.listen(3000, () => {
    console.log(`Example app listening on port ${port}`)
})