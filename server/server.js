const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 5070;

const usersRoute = require("./routes/usersRoute");
const boardRoutes = require("./routes/boardRoutes");

app.use(express.json());
app.use("/api/users", usersRoute);
app.use("/api/board", boardRoutes);

const path = require("path");
const authMiddleWare = require("./middlewares/authMiddleWare");

app.listen(port, () => console.log(`Node server listening on port ${port}!`));
