import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())

/* ---------------------- SIGN-UP COM BÔNUS ----------------------- */

function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)/.test(url);
}

function checkLogin(login) {
    return login.username.length !== 0 && isImage(login.avatar);
}

let logins = [];

app.post('/sign-up', (req, res) => {
    const login = req.body;
    if (checkLogin(login)) {
        logins.push(login);
        res.status(201).send("OK");
    } else {
        res.status(400).send("Todos os campos são obrigatórios!");
    }
});

/* ------------------------- TWEETS (POST) ------------------------ */

function checkTweet(tweet) {
    return tweet.username.length !== 0 && tweet.tweet.length !== 0;
}

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
    if (checkTweet(tweet)) {
        tweets.push(tweetComplete(tweet));
        res.status(201).send("OK");
    } else {
        res.status(400).send("Todos os campos são obrigatórios!");
    }
});

/* ------------------------- TWEETS (GET) ------------------------- */

function tweetsLast10(tweets) {
    let response = [];
    for (let i = tweets.length - 1; i >= 0; i--) {
        if (i >= tweets.length - 10) {
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