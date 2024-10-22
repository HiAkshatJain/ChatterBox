import { Request, Response } from "express"; // Import necessary types from Express
import prisma from "../config/db.config.js"; // Import Prisma client for database operations

class ChatsController {
  // Define a static method to retrieve chats for a specific group
  static async index(req: Request, res: Response) {
    // Extract the groupId from request parameters
    const { groupId } = req.params;

    // Query the database to find chats associated with the specified groupId
    const chats = await prisma.chats.findMany({
      where: {
        group_id: groupId, // Filter chats by group ID
      },
    });

    // Return the retrieved chats as a JSON response
    return res.json({ data: chats });
  }
}

// Export the ChatsController class for use in other modules
export default ChatsController;
