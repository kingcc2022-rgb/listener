const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

let messages = [];
let votes = { yes: 0, no: 0 };
let dailyWord = "Hello";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/message', (req, res) => {
  const { msg } = req.body;
  if(msg) messages.push({ msg, reply: "" });
  res.redirect('/');
});

app.post('/vote', (req, res) => {
  const { vote } = req.body;
  if(vote === 'yes') votes.yes++;
  if(vote === 'no') votes.no++;
  res.redirect('/');
});

app.get('/admin', (req, res) => {
  res.send({ messages, votes, dailyWord });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));