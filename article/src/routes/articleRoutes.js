const express = require("express");
const articleRoutes = express.Router();
const { 
    createNewArticle,
    getAllArticle,
    getArticleById, 
    updateArticle, 
    deleteArticle
} = require("../controllers/articleController");

articleRoutes.post("/articles", createNewArticle);
articleRoutes.get("/articles", getAllArticle);
articleRoutes.get("/articles/:id", getArticleById);
articleRoutes.put("/articles/:id",updateArticle);
articleRoutes.delete("/articles/:id", deleteArticle);

module.exports = articleRoutes;