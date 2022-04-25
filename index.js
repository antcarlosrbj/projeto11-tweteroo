import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())

/* --------------------------- SIGN-UP --------------------------- */

let logins = [];

app.post('/sign-up', (req, res) => {
    const login = req.body;
    logins.push(login);
    res.send("OK");
});

/* ------------------------- TWEETS (POST) ------------------------ */

let tweets = [];

function tweetComplete(tweet) {
    return ({
        username: tweet.username,
        avatar: logins.find(e => e.username === tweet.username).avatar,
        tweet: tweet.tweet
    });
}

app.post('/tweets', (req, res) => {
    const tweet = req.body;
    tweets.push(tweetComplete(tweet));
    res.send("OK");
});

/* ------------------------- TWEETS (GET) ------------------------- */

/* ---------------------------------------------------------------- */

app.listen(5000);