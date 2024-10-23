import { Kafka, logLevel } from "kafkajs"; // Import Kafka and logLevel from kafkajs library

// Create a new Kafka instance with configuration options
export const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER!], // Set the Kafka broker URL from environment variables
  ssl: true, // Enable SSL for secure communication
  // sasl: {
  //   // Configure SASL authentication
  //   mechanism: "scram-sha-256", // Use SCRAM-SHA-256 mechanism for authentication
  //   username: process.env.KAFKA_USERNAME!, // Set the username from environment variables
  //   password: process.env.KAFKA_PASSWORD!, // Set the password from environment variables
  // },
  logLevel: logLevel.ERROR, // Set the log level to ERROR to minimize logging output
});

// Create a Kafka producer instance
export const producer = kafka.producer();

// Create a Kafka consumer instance with a specified group ID
export const consumer = kafka.consumer({ groupId: "chats" });

// Function to connect the Kafka producer
export const connectKafkaProducer = async () => {
  await producer.connect(); // Connect the producer to Kafka
  console.log("Kafka Connected Successfully ✔️"); // Log successful connection
};
