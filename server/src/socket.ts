// Import necessary modules from socket.io and utility functions
import { Server, Socket } from "socket.io";
import { produceMessage } from "./utils.js";

// Define a custom socket interface to extend the default Socket with a room property
interface CustomSocket extends Socket {
  room?: string; // Optional room property to track the room the socket belongs to
}

/**
 * Sets up the Socket.io server with middleware and event handlers.
 *
 * @param {Server} io - The Socket.io server instance.
 */
export function setupSocket(io: Server) {
  // Middleware to authenticate the socket connection and assign a room
  io.use((socket: CustomSocket, next) => {
    // Retrieve room information from handshake authentication or headers
    const room = socket.handshake.auth.room || socket.handshake.headers.room;

    // If no room is provided, return an error
    if (!room) return next(new Error("Invalid Room Bruhh.."));

    // Assign the room to the socket for later use
    socket.room = room;
    next(); // Proceed to the next middleware or event handler
  });

  // Handle new socket connections
  io.on("connection", (socket: CustomSocket) => {
    // Join the socket to the specified room
    if (socket.room) {
      socket.join(socket.room);
    } else {
      console.error("Socket room is undefined for socket:", socket.id);
    }

    // Listen for incoming messages from the socket
    socket.on("message", async (data) => {
      try {
        // Produce the message to the Kafka topic "chats"
        await produceMessage("chats", data);
      } catch (error) {
        // Log any errors encountered during message production
        console.log("The Kafka produce error is", error);
      }

      // Emit the message to other sockets in the same room
      if (socket.room) {
        socket.to(socket.room).emit("message", data);
      } else {
        console.error("Socket room is undefined for socket:", socket.id);
      }
    });

    // Listen for socket disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
}
