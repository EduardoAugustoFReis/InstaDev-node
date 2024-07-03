const { Router } = require("express");
const routes = Router();

const postsController = require("../app/controllers/postsController");
const authMiddleware = require("../app/middlewares/auth");

routes.use(authMiddleware);
routes.post("/", postsController.create);

module.exports = routes;