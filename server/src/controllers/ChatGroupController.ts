import { Request, Response } from "express"; // Import necessary types from Express
import prisma from "../config/db.config.js"; // Import Prisma client for database operations

class ChatGroupController {
  // Method to retrieve all chat groups for a specific user
  static async index(req: Request, res: Response) {
    try {
      const user = req.user; // Get the user from the request
      const groups = await prisma.chatGroup.findMany({
        where: {
          user_id: user?.id, // Filter groups by user ID
        },
        orderBy: {
          created_at: "desc", // Order groups by creation date (most recent first)
        },
      });
      // Return the retrieved chat groups as a JSON response
      return res.json({ data: groups });
    } catch (error) {
      // Handle any errors and respond with a 500 status code
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again!" });
    }
  }

  // Method to retrieve a specific chat group by ID
  static async show(req: Request, res: Response) {
    try {
      const { id } = req.params; // Get the group ID from request parameters
      if (id) {
        // Find the chat group by ID
        const group = await prisma.chatGroup.findUnique({
          where: {
            id: id,
          },
        });
        // Return the found group as a JSON response
        return res.json({ data: group });
      }

      // If no ID is provided, return a 404 status
      return res.status(404).json({ message: "No groups found" });
    } catch (error) {
      // Handle any errors and respond with a 500 status code
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again!" });
    }
  }

  // Method to create a new chat group
  static async store(req: Request, res: Response) {
    try {
      const body = req.body; // Get the request body
      const user = req.user; // Get the user from the request
      // Create a new chat group in the database
      await prisma.chatGroup.create({
        data: {
          title: body?.title, // Use the title from the request body
          passcode: body?.passcode, // Use the passcode from the request body
          user_id: user!.id, // Associate the group with the user ID
        },
      });

      // Return success message
      return res.json({ message: "Chat Group created successfully!" });
    } catch (error) {
      // Handle any errors and respond with a 500 status code
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again!" });
    }
  }

  // Method to update an existing chat group
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params; // Get the group ID from request parameters
      const body = req.body; // Get the request body
      if (id) {
        // Update the chat group in the database
        await prisma.chatGroup.update({
          data: body, // Update with provided data
          where: {
            id: id, // Identify the group to update by ID
          },
        });
        // Return success message
        return res.json({ message: "Group updated successfully!" });
      }

      // If no ID is provided, return a 404 status
      return res.status(404).json({ message: "No groups found" });
    } catch (error) {
      // Handle any errors and respond with a 500 status code
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again!" });
    }
  }

  // Method to delete a chat group
  static async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params; // Get the group ID from request parameters
      // Delete the chat group from the database
      await prisma.chatGroup.delete({
        where: {
          id: id, // Identify the group to delete by ID
        },
      });
      // Return success message
      return res.json({ message: "Chat Deleted successfully!" });
    } catch (error) {
      // Handle any errors and respond with a 500 status code
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again!" });
    }
  }
}

// Export the ChatGroupController class for use in other modules
export default ChatGroupController;
