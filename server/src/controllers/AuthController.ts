import { Request, Response } from "express"; // Import necessary types from Express
import jwt from "jsonwebtoken"; // Import JWT library for token generation
import prisma from "../config/db.config.js"; // Import Prisma client for database operations

// Define the shape of the login payload
interface LoginPayloadType {
  name: string; // User's name
  email: string; // User's email
  oauth_id: string; // Unique ID from OAuth provider
  provider: string; // Name of the OAuth provider
  image: string; // URL of the user's image
}

class AuthController {
  // Define a static method for user login
  static async login(req: Request, res: Response) {
    try {
      // Get the request body and type it to LoginPayloadType
      const body: LoginPayloadType = req.body;

      // Attempt to find the user by email
      let findUser = await prisma.user.findUnique({
        where: {
          email: body.email, // Search for user with this email
        },
      });

      // If user is not found, create a new user
      if (!findUser) {
        findUser = await prisma.user.create({
          data: body, // Use the provided data to create the user
        });
      }

      // Prepare the payload for JWT
      let JWTPayload = {
        name: body.name, // Include user's name
        email: body.email, // Include user's email
        id: findUser.id, // Include user's ID from the database
      };

      // Generate a JWT token with the payload and set expiration
      const token = jwt.sign(JWTPayload, process.env.JWT_SECRET!, {
        expiresIn: "90d", // Token valid for 90 days
      });

      // Send response with success message and user details
      return res.json({
        message: "Logged in successfully!",
        user: {
          ...findUser, // Include all user details
          token: `Bearer ${token}`, // Include the generated token
        },
      });
    } catch (error) {
      // Handle any errors that occur during the process
      return res
        .status(500) // Set response status to 500 (Internal Server Error)
        .json({ message: "Something went wrong. Please try again!" });
    }
  }
}

// Export the AuthController class for use in other modules
export default AuthController;
