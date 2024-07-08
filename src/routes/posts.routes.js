const { Router } = require("express");
const routes = Router();

const postsController = require("../app/controllers/postsController");
const authMiddleware = require("../app/middlewares/auth");

routes.use(authMiddleware);
routes.post("/", postsController.create);
routes.delete("/:id", postsController.delete);
routes.put("/:id", postsController.update);
routes.patch("/:id", postsController.addLike);
routes.get("/", postsController.listMyPosts);
routes.get("/all", postsController.listAllPosts);

module.exports = routes;