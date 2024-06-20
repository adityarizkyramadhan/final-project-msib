const amqp = require('amqplib/callback_api');

const RABBITMQ_URL = 'amqp://localhost'; // Ganti dengan URL RabbitMQ Anda

function checkRabbitMQStatus() {
  amqp.connect(RABBITMQ_URL, (err, connection) => {
    if (err) {
      console.error('RabbitMQ is OFF');
      console.error('Error:', err.message);
    } else {
      console.log('RabbitMQ is ON');
      connection.close();
    }
  });
}

checkRabbitMQStatus();
