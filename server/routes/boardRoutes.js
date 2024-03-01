const express = require("express");
const router = express.Router();
const boardController = require("../controllers/boardControllers");
const authMiddleware = require("../middlewares/authMiddleWare");

router.post("/task", authMiddleware, boardController.createTask);
router.put("/task/:taskId", authMiddleware, boardController.editTask);

router.delete("/task/:taskId", authMiddleware,boardController.deleteTask);
router.get("/task/:taskId",boardController.getTask);
router.get("/task", authMiddleware,boardController.getAllTasks);




module.exports = router;
