const redis = require('redis');

const initializeRedisClient = async () => {
    try {
        const client = redis.createClient({
            url: 'redis://redis:6379',
            legacyMode: true
        });
        client.on('error', (err) => {
            console.error('Could not establish a connection with redis. ' + err);
        });
        client.on('connect', () => {
            console.log('Connected to redis successfully');
        });
        await client.connect();

        return client;
    } catch (error) {
        console.error('Failed to initialize Redis client:', error);
    }
};

module.exports = { initializeRedisClient };
