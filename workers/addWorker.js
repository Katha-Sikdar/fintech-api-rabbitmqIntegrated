const { connectRabbitMQ } = require('../mq');
const { users } = require('./users');

async function startAddWorker() {
  const channel = await connectRabbitMQ();
  await channel.assertQueue('addMoneyQueue');

  channel.consume('addMoneyQueue', (msg) => {
    const { userId, amount } = JSON.parse(msg.content.toString());

    if (!users[userId]) {
      console.error(`❌ User ${userId} not found`);
    } else {
      users[userId] += amount;
      console.log(`💰 Added ${amount} to ${userId}. New balance: ${users[userId]}`);
    }

    channel.ack(msg);
  });

  console.log('💵 AddWorker listening on addMoneyQueue...');
}

startAddWorker();
