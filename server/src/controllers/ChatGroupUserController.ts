import { Request, Response } from "express"; // Import necessary types from Express
import prisma from "../config/db.config.js"; // Import Prisma client for database operations

// Define the shape of a GroupUser object
interface GroupUserType {
  name: string; // Name of the user
  group_id: string; // ID of the associated chat group
}

class ChatGroupUserController {
  // Method to retrieve all users in a specific chat group
  static async index(req: Request, res: Response) {
    try {
      // Get the group_id from query parameters
      const { group_id } = req.query;

      // Query the database to find all users associated with the specified group_id
      const users = await prisma.groupUsers.findMany({
        where: {
          group_id: group_id as string, // Filter users by group ID
        },
      });

      // Return the retrieved users as a JSON response
      return res.json({ message: "Data fetched successfully!", data: users });
    } catch (error) {
      // Handle any errors and respond with a 500 status code
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again!" });
    }
  }

  // Method to add a new user to a chat group
  static async store(req: Request, res: Response) {
    try {
      const body: GroupUserType = req.body; // Get the request body and type it to GroupUserType

      // Create a new user in the database
      const user = await prisma.groupUsers.create({
        data: body, // Use the provided data to create the user
      });

      // Return success message and created user as a JSON response
      return res.json({ message: "User created successfully!", data: user });
    } catch (error) {
      // Handle any errors and respond with a 500 status code
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again!" });
    }
  }
}

// Export the ChatGroupUserController class for use in other modules
export default ChatGroupUserController;
