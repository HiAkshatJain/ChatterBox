# API Routes

## Authentication Routes

- **POST** `/auth/login`
  - Description: User login.

## Chat Group Routes

- **GET** `/chat-group`

  - Description: Retrieve all chat groups for the authenticated user.
  - Middleware: `authMiddleware`

- **GET** `/chat-group/:id`

  - Description: Retrieve a specific chat group by ID.

- **POST** `/chat-group`

  - Description: Create a new chat group for the authenticated user.
  - Middleware: `authMiddleware`

- **PUT** `/chat-group/:id`

  - Description: Update an existing chat group by ID.
  - Middleware: `authMiddleware`

- **DELETE** `/chat-group/:id`
  - Description: Delete a chat group by ID.
  - Middleware: `authMiddleware`

## Chat Group User Routes

- **GET** `/chat-group-user`

  - Description: Retrieve all users in a specific chat group.

- **POST** `/chat-group-user`
  - Description: Add a new user to a chat group.

## Chats Routes

- **GET** `/chats/:groupId`
  - Description: Retrieve all chats for a specific group.

## General Route

- **GET** `/`
  - Description: Check server status.
