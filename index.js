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

function tweetsLast10(tweets) {
    let response = [];
    for(let i = tweets.length - 1; i >= 0; i--) {
        if(i >= tweets.length - 10) {
            response.push(tweets[i]);
        }
    }
    return response;
}

app.get('/tweets', (req, res) => {
    res.send(tweetsLast10(tweets));
});

/* ---------------------------------------------------------------- */

app.listen(5000);