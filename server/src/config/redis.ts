import { Redis } from "ioredis"; // Import the Redis class from the ioredis library
let redis: Redis; // Declare a variable redis of type Redis

// Check if the application is running in a production environment
if (process.env.NODE_ENV === "production") {
  // If in production, initialize Redis using the URL from the environment variables
  redis = new Redis(process.env.REDIS_URL!);
} else {
  // If not in production (e.g., development or testing), connect to a local Redis instance
  redis = new Redis({
    host: "localhost", // Set the host to localhost
    port: 6379, // Set the default Redis port
  });
}

// Export the Redis client instance for use in other parts of the application
export default redis;
