const amqp = require('amqplib');

let channel = null;

async function connectRabbitMQ() {
  const connection = await amqp.connect('amqp://localhost');
  channel = await connection.createChannel();
  console.log('✅ Connected to RabbitMQ');
  return channel;
}

function sendToQueue(queueName, message) {
  if (!channel) {
    throw new Error('RabbitMQ channel is not initialized');
  }
  channel.assertQueue(queueName, { durable: false });
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
}

module.exports = { connectRabbitMQ, sendToQueue };
