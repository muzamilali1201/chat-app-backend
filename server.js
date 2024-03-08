const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
require("express-async-errors");
const router = require("./routes/router");
const express = require("express");
const dbConnection = require("./config/dbConnection");
const errorHandler = require("./middlewares/error-handler");
const listener = require("./Listener/listener");
const socketVerification = require("./middlewares/socket-verification");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/public", express.static("public"));
app.use("/api/v1", router);
app.use(errorHandler);
io.use(socketVerification);
io.on("connection", listener);

server.listen(process.env.PORT || 3000, () => {
  dbConnection();
  console.log(`Server is listening at ${process.env.PORT}`);
});

module.exports = { io };
