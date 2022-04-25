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

    const tweet = {
        username: req.headers.user,
        tweet: req.body.tweet
    };

    if (checkTweet(tweet)) {
        tweets.push(tweetComplete(tweet));
        res.status(201).send("OK");
    } else {
        res.status(400).send("Todos os campos são obrigatórios!");
    }
});

/* ------------------------- TWEETS (GET) ------------------------- */

function tweetsLast10(tweets, page) {

    if (page > 0 && (page <= Math.ceil(tweets.length / 10) || tweets.length == 0)) {
        let response = [];
        for (let i = tweets.length - (1+(page-1)*10); i >= tweets.length - (page * 10); i--) {
            if (i >= 0) {
                response.push(tweets[i]);
            }
        }
        return response;
    } else {
        return "BAD REQUEST";
    }

}

app.get('/tweets', (req, res) => {
    const { page } = req.query;
    
    if (tweetsLast10(tweets, page) === "BAD REQUEST") {
        res.status(400).send("Informe uma página válida!");
    } else {
        res.send(tweetsLast10(tweets, page));
    }
});

/* ---------------------- TWEETS (USERNAME) ----------------------- */

function tweetsUsername(username) {
    return tweets.filter(tweet => tweet.username === username);
}

app.get('/tweets/:requestedUsername', (req, res) => {
    const { requestedUsername } = req.params;
    res.send(tweetsUsername(requestedUsername));
});

/* ---------------------------------------------------------------- */

app.listen(5000);