// Import the PrismaClient from the Prisma client library
import { PrismaClient } from "@prisma/client";

// Create an instance of PrismaClient
// The log option is set to only log errors
const prisma = new PrismaClient({
  log: ["error"],
});

// Export the prisma instance for use in other modules
export default prisma;
