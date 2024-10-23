import express, { Application, Request, Response } from "express"; // Import Express and types for application, request, and response
import "dotenv/config"; // Load environment variables from .env file
import cors from "cors"; // Import CORS middleware for handling cross-origin requests

const app: Application = express(); // Create an Express application
const PORT = process.env.PORT || 7000; // Set the port from environment variables or default to 7000

import Routes from "./routes/index.js"; // Import application routes
import { Server } from "socket.io"; // Import Socket.io server
import { createServer } from "http"; // Import HTTP server creation
import { setupSocket } from "./socket.js"; // Import function to setup socket.io
import { createAdapter } from "@socket.io/redis-streams-adapter"; // Import Redis adapter for socket.io
import redis from "./config/redis.js"; // Import Redis configuration
import { instrument } from "@socket.io/admin-ui"; // Import admin UI for Socket.io
import { connectKafkaProducer } from "./config/kafka.config.js"; // Import Kafka producer connection
import { consumeMessages } from "./utils.js"; // Import message consumption utility

const server = createServer(app); // Create an HTTP server using the Express application
const io = new Server(server, {
  // Create a new Socket.io server
  cors: {
    origin: [process.env.CLIENT_APP_URL!, "https://admin.socket.io"], // Allow specific origins for CORS
  },
  adapter: createAdapter(redis), // Use Redis as the adapter for Socket.io
});

// Setup the admin UI for Socket.io in development mode
instrument(io, {
  auth: false, // Disable authentication for the admin UI
  mode: "development", // Set the mode to development
});

export { io }; // Export the Socket.io server instance
setupSocket(io); // Setup socket functionality

// Middleware
app.use(cors()); // Use CORS middleware to handle cross-origin requests
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded requests

// Root route for checking server status
app.get("/", (req: Request, res: Response) => {
  return res.send("It's working Guys 🙌"); // Send a simple response
});

// Connect Kafka Producer
connectKafkaProducer().catch((err) => console.log("Kafka Consumer error")); // Handle any errors when connecting to Kafka

// Start consuming messages from Kafka
consumeMessages(process.env.KAFKA_TOPIC!).catch(
  (err) => console.log("The Kafka Consume error", err) // Handle any errors while consuming messages
);

// Routes
app.use("/api", Routes); // Use the routes defined in the imported Routes

// Start the server and listen on the specified port
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`)); // Log the server status
