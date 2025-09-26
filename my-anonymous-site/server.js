const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// 临时存储数据（内存）
let messages = [];
let votes = { yes: 0, no: 0 };
let dailyWord = "Hello";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // 访问 CSS、HTML

// 首页
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// 提交匿名消息
app.post('/message', (req, res) => {
  const { msg } = req.body;
  if(msg) messages.push({ msg, reply: "" });
  res.redirect('/');
});

// 回复消息（后台用）
app.post('/reply', (req, res) => {
  const { index, reply } = req.body;
  if(messages[index]) messages[index].reply = reply;
  res.redirect('/');
});

// 投票
app.post('/vote', (req, res) => {
  const { vote } = req.body;
  if(vote === 'yes') votes.yes++;
  if(vote === 'no') votes.no++;
  res.redirect('/');
});

// API: 获取消息和投票结果（简单后台查看）
app.get('/admin', (req, res) => {
  res.send({ messages, votes, dailyWord });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));