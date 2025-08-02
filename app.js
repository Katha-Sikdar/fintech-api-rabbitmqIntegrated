const express = require('express');
const app = express();
const PORT = 3000;

const { connectRabbitMQ, sendToQueue } = require('./mq');
const { users, getUser, createUser } = require('./workers/users');

connectRabbitMQ();

app.use(express.json());

// Create user
app.post('/create-user', (req, res) => {
  const { userId, initialBalance } = req.body;
  if (!userId) return res.status(400).json({ error: 'User ID is required' });

  const created = createUser(userId, initialBalance || 0);
  if (!created) return res.status(400).json({ error: 'User already exists' });

  res.json({ message: 'User created', userId, balance: users[userId] });
});

// Get balance
app.get('/balance/:userId', (req, res) => {
  const balance = getUser(req.params.userId);
  if (balance === undefined) return res.status(404).json({ error: 'User not found' });

  res.json({ userId: req.params.userId, balance });
});

// Queue operations
app.post('/add', (req, res) => {
  sendToQueue('addMoneyQueue', req.body);
  res.json({ message: 'Add request queued' });
});

app.post('/withdraw', (req, res) => {
  sendToQueue('withdrawQueue', req.body);
  res.json({ message: 'Withdraw request queued' });
});

app.post('/transfer', (req, res) => {
  sendToQueue('transferQueue', req.body);
  res.json({ message: 'Transfer request queued' });
});

app.post('/pay', (req, res) => {
  sendToQueue('payQueue', req.body);
  res.json({ message: 'Pay request queued' });
});

app.listen(PORT, () => {
  console.log(`🚀 FinTech API running at http://localhost:${PORT}`);
});
