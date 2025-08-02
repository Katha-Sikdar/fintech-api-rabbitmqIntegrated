const { connectRabbitMQ } = require('../mq');
const { users } = require('./users');

async function startPayWorker() {
  const channel = await connectRabbitMQ();
  await channel.assertQueue('payQueue');

  channel.consume('payQueue', (msg) => {
    const { userId, amount } = JSON.parse(msg.content.toString());

    if (!users[userId]) {
      console.error(`❌ User ${userId} not found`);
    } else if (users[userId] < amount) {
      console.error(`⚠️ Insufficient balance to pay`);
    } else {
      users[userId] -= amount;
      console.log(`💸 Paid ${amount} from ${userId}. New balance: ${users[userId]}`);
    }

    channel.ack(msg);
  });

  console.log('💸 PayWorker listening on payQueue...');
}

startPayWorker();
