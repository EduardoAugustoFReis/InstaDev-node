const { Router } = require("express");
const routes = Router();

const userController = require("../controllers/userController");

routes.post("/", userController.create);

module.exports = routes;

