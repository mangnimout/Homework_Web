const express = require("express");
const userRoutes = express.Router();
const {
    getAllUser,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

userRoutes.get("/users", getAllUser);
userRoutes.get("/users/:id", getUserById);
userRoutes.post("/users", createNewUser);
userRoutes.put("/users/:id", updateUser);
userRoutes.delete("/users/:id", deleteUser);
module.exports = userRoutes;
