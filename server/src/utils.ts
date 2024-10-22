// Import Prisma instance for database operations
import prisma from "./config/db.config.js";
// Import producer and consumer for Kafka messaging
import { producer, consumer } from "./config/kafka.config.js";

/**
 * Produces a message to a specified Kafka topic.
 *
 * @param {string} topic - The Kafka topic to send the message to.
 * @param {any} message - The message data to send.
 */
export const produceMessage = async (topic: string, message: any) => {
  await producer.send({
    topic, // Specify the topic
    messages: [{ value: JSON.stringify(message) }], // Serialize the message to JSON
  });
};

/**
 * Consumes messages from a specified Kafka topic and processes them.
 *
 * @param {string} topic - The Kafka topic to consume messages from.
 */
export const consumeMessages = async (topic: string) => {
  // Connect the consumer to Kafka
  await consumer.connect();

  // Subscribe to the specified topic
  await consumer.subscribe({ topic });

  // Run the consumer to handle incoming messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // Deserialize the message value from a buffer to a JSON object
      const data = message.value ? JSON.parse(message.value.toString()) : null;

      // Log message details for debugging
      console.log({
        partition,
        offset: message.offset,
        value: data,
      });

      // Store the message data in the database
      await prisma.chats.create({
        data, // Use the parsed message data for creating a new chat entry
      });
    },
  });
};
