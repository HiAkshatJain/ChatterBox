import { Router } from "express"; // Import the Router from Express to define routes
import AuthController from "../controllers/AuthController.js"; // Import the authentication controller
import ChatGroupController from "../controllers/ChatGroupController.js"; // Import the chat group controller
import authMiddleware from "../middleware/AuthMiddleware.js"; // Import the authentication middleware
import ChatGroupUserController from "../controllers/ChatGroupUserController.js"; // Import the chat group user controller
import ChatsController from "../controllers/ChatsController.js"; // Import the chats controller

const router = Router(); // Create a new router instance

// Auth Routes
router.post("/auth/login", AuthController.login); // Route for user login

// Chat Group Routes
router.get("/chat-group", authMiddleware, ChatGroupController.index); // Retrieve all chat groups for the authenticated user
router.get("/chat-group/:id", ChatGroupController.show); // Retrieve a specific chat group by ID
router.post("/chat-group", authMiddleware, ChatGroupController.store); // Create a new chat group for the authenticated user
router.put("/chat-group/:id", authMiddleware, ChatGroupController.update); // Update an existing chat group by ID
router.delete("/chat-group/:id", authMiddleware, ChatGroupController.destroy); // Delete a chat group by ID

// Chat Group User Routes
router.get("/chat-group-user", ChatGroupUserController.index); // Retrieve all users in a specific chat group
router.post("/chat-group-user", ChatGroupUserController.store); // Add a new user to a chat group

// Chats Routes
router.get("/chats/:groupId", ChatsController.index); // Retrieve all chats for a specific group

export default router; // Export the router for use in the main application
