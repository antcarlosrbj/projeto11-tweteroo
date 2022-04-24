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
/* ------------------------- TWEETS (GET) ------------------------- */

/* ---------------------------------------------------------------- */

app.listen(5000);