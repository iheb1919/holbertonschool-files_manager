import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.asyncGet = promisify(this.client.get).bind(this.client);
    this.client.on('error', function(error) {
        console.log(`Redis client not connected to the server: ${error}`);
    });
   /*  this.client.on('ready', function()  {
    console.log('Redis client connected to the server');
}); */
 
  }

    isAlive() {
        return this.client.connected;
    }

  async get(key) {
    
    const value = await this.asyncGet(key);
    return value;
  }

  async set(key, value, duration) {
    this.client.set(key, value);
    this.client.expire(key, duration);
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;