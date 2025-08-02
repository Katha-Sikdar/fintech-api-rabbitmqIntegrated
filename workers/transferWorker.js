const { connectRabbitMQ } = require('../mq');
const { users } = require('./users');

async function startTransferWorker() {
  const channel = await connectRabbitMQ();
  await channel.assertQueue('transferQueue');

  channel.consume('transferQueue', (msg) => {
    const { fromUserId, toUserId, amount } = JSON.parse(msg.content.toString());

    if (!users[fromUserId]) {
      console.error(`❌ Sender ${fromUserId} not found`);
    } else if (!users[toUserId]) {
      console.error(`❌ Receiver ${toUserId} not found`);
    } else if (users[fromUserId] < amount) {
      console.error(`⚠️ Insufficient funds in ${fromUserId}'s account`);
    } else {
      users[fromUserId] -= amount;
      users[toUserId] += amount;
      console.log(`🔄 Transferred ${amount} from ${fromUserId} to ${toUserId}`);
    }

    channel.ack(msg);
  });

  console.log('🔄 TransferWorker listening on transferQueue...');
}

startTransferWorker();
