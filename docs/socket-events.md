# Socket.io Event Handlers

This document provides an overview of the socket.io event handlers used within the socket.io listener function.

## Overview

The socket.io event handlers are responsible for handling various events emitted by clients and performing corresponding actions such as individual chats, joining rooms, and group chats. They interact with the database models to fetch necessary data and update records accordingly. Error handling is implemented to handle exceptions and emit error messages back to the clients.

## Events

### `disconnect`

- **Description:** Handles disconnection of a socket.
- **Action:** Updates user's online status and clears socket ID upon disconnection.

### `chat`

- **Description:** Handles individual chat messages.
- **Action:**
  - Parses incoming message data.
  - Retrieves recipient user's details.
  - Creates a new chat message object.
  - Saves the message to the database if the recipient user is offline.
  - Emits the message to the recipient user if online.

### `join-room`

- **Description:** Handles user's joining of a room.
- **Action:**
  - Parses room details.
  - Validates room existence and user membership.
  - Adds the user to the room.
  - Emits a notification to the room indicating user's joining.

### `group-chat`

- **Description:** Handles group chat messages within a room.
- **Action:**
  - Parses message details.
  - Validates room existence and user membership.
  - Updates the room's message history with the new message.
  - Emits the message to all users in the room.

## Error Handling

- Error handling is implemented within each event handler to catch and handle exceptions.
- Error messages are emitted back to the clients using the `error` event.
