const { Router } = require("express");
const routes = Router();

const userController = require("../app/controllers/userController");
const authMiddleware = require("../app/middlewares/auth");

routes.post("/", userController.create);

routes.use(authMiddleware);
routes.put("/", userController.update);

module.exports = routes;

