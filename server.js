const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

let messages = [];
let votes = { yes: 0, no: 0 };
let dailyWord = "Hello";

// 解析表单
app.use(bodyParser.urlencoded({ extended: true }));

// 静态资源
app.use('/static', express.static(path.join(__dirname, 'static')));

// 首页
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 提交匿名消息
app.post('/message', (req, res) => {
  const { msg } = req.body;
  if (msg) messages.push({ msg, reply: "" });
  res.redirect('/');
});

// 投票
app.post('/vote', (req, res) => {
  const { vote } = req.body;
  if (vote === 'yes') votes.yes++;
  if (vote === 'no') votes.no++;
  res.redirect('/');
});

// 管理员查看消息和投票
app.get('/admin', (req, res) => {
  res.send({ messages, votes, dailyWord });
});

// 启动服务器
app.listen(PORT, () => console.log(`Server running on port ${10000}`));
