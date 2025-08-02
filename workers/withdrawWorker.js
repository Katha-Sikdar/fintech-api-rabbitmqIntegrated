const { connectRabbitMQ } = require('../mq');
const { users } = require('./users');

async function startWithdrawWorker() {
  const channel = await connectRabbitMQ();
  await channel.assertQueue('withdrawQueue');

  channel.consume('withdrawQueue', (msg) => {
    const { userId, amount } = JSON.parse(msg.content.toString());

    if (!users[userId]) {
      console.error(`❌ User ${userId} not found`);
    } else if (users[userId] < amount) {
      console.error(`⚠️ Not enough balance for ${userId}`);
    } else {
      users[userId] -= amount;
      console.log(`🏧 Withdrew ${amount} from ${userId}. New balance: ${users[userId]}`);
    }

    channel.ack(msg);
  });

  console.log('🏧 WithdrawWorker listening on withdrawQueue...');
}

startWithdrawWorker();
