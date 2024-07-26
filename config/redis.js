const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();

const client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

client.on('connect', () => {
  console.log('Redis client connected');
});

module.exports = client;
