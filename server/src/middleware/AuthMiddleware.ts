// Import necessary modules
import jwt from "jsonwebtoken"; // For handling JSON Web Tokens
import { Request, Response, NextFunction } from "express"; // Types for Express.js

// Middleware function to authenticate requests
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Retrieve the authorization header from the request
  const authHeader = req.headers.authorization;

  // Check if the authorization header is missing
  if (authHeader === null || authHeader === undefined) {
    return res.status(401).json({ status: 401, message: "UnAuthorized" }); // Respond with 401 Unauthorized
  }

  // Extract the token from the authorization header (Bearer <token>)
  const token = authHeader.split(" ")[1];

  // Verify the token using the JWT secret from environment variables
  jwt.verify(token, process.env.JWT_SECRET!, (error, user) => {
    // If verification fails, respond with 401 Unauthorized
    if (error) {
      return res.status(401).json({ status: 401, message: "UnAuthorized" });
    }

    // If verification is successful, attach the user information to the request object
    req.user = user as AuthUser; // Cast user to AuthUser type for TypeScript

    // Call the next middleware or route handler
    next();
  });
};

// Export the authMiddleware for use in other parts of the application
export default authMiddleware;
