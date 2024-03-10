# API Documentation

This document provides an overview of the API routes available in the application.

## User Routes

### Register

- **URL:** `/register`
- **Method:** POST
- **Description:** Registers a new user.
- **Middleware:** None
- **Controller:** `userController.userRegister`

### Login

- **URL:** `/login`
- **Method:** POST
- **Description:** Logs in an existing user.
- **Middleware:** None
- **Controller:** `userController.userLogin`

## Room Routes

### Create Room

- **URL:** `/`
- **Method:** POST
- **Description:** Creates a new room.
- **Middleware:** `verifyToken`
- **Controller:** `roomController.createRoom`

### Join Room

- **URL:** `/:roomid/join`
- **Method:** POST
- **Description:** Allows a user to join a room.
- **Middleware:** `verifyToken`
- **Controller:** `roomController.joinRoom`

### Leave Room

- **URL:** `/:roomid/leave`
- **Method:** POST
- **Description:** Allows a user to leave a room.
- **Middleware:** `verifyToken`
- **Controller:** `roomController.leaveRoom`

### Delete Room

- **URL:** `/:roomid`
- **Method:** DELETE
- **Description:** Allows a user(who had created the room) to delete a room.
- **Middleware:** `verifyToken`
- **Controller:** `roomController.deleteRoom`

### Get All Joined Rooms

- **URL:** `/`
- **Method:** GET
- **Description:** Retrieves all rooms joined by the user.
- **Middleware:** `verifyToken`
- **Controller:** `roomController.getAllJoinedRooms`

## Chat Routes

### Conversation

- **URL:** `/`
- **Method:** GET
- **Description:** Retrieves conversation details.
- **Middleware:** `tokenverification`
- **Controller:** `chatController.Conversation`

## File Upload Routes

### Upload File

- **URL:** `/`
- **Method:** POST
- **Description:** Uploads a file.
- **Middleware:** `verifyToken`, `upload.single("file")`
- **Controller:** `uploadController.uploadFile`

## Sub-Routes

### User Routes

- **URL:** `/user`
- **Description:** Contains routes related to user management.
- **Middleware:** None
- **Routes:** See `userRoutes` for details.

### Chat Routes

- **URL:** `/chat`
- **Description:** Contains routes related to chat functionalities.
- **Middleware:** None
- **Routes:** See `chatRoutes` for details.

### File Upload Routes

- **URL:** `/file`
- **Description:** Contains routes related to file uploads.
- **Middleware:** None
- **Routes:** See `uploadRoutes` for details.

### Room Routes

- **URL:** `/room`
- **Description:** Contains routes related to room management.
- **Middleware:** None
- **Routes:** See `roomRoutes` for details.
