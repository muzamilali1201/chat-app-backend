# Chat-App (Backend)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage](#usage)
- [API Documentation](#api-documentation)
  - [REST Routes](#rest-routes)
  - [Socket Events](#socket-events)
- [Scripts](#scripts)

---

## Description

Chat-App (Backend) is a project aimed at providing a platform for real-time chatting. Users can register, login, and engage in individual and group chats. Additionally, users have the ability to create, join, and leave rooms for group discussions.

---

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/muzamilali1201/chat-app-backend.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd chat-app-backend
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the root directory and add the necessary configurations. Refer to `.env.example` for required variables.

---

## Dependencies

The project utilizes the following dependencies:

- bcrypt
- cors
- dotenv
- express
- express-async-errors
- jsonwebtoken
- mongoose
- morgan
- multer
- socket.io

For more information, refer to the `package.json` file.

---

## Usage

To start the server, run the following command:

```bash
npm start
```

This will start the server using Nodemon, allowing for automatic restarts upon file changes.

---

## API Documentation

For detailed API documentation, refer to the following:

### [REST Routes](./docs/rest-routes.md)

Documentation for RESTful routes including authentication, chat functionalities, room management, and file upload.

### [Socket Events](./docs/socket-events.md)

Documentation for Socket.IO events handling real-time communication between clients and the server.

---

## Scripts

The project includes the following script:

- `start`: Starts the server using Nodemon for automatic restarts upon file changes.

---
