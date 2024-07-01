const { Router } = require("express");
const multer = require("multer");
const { upload } = require("../configs/upload"); 

const routes = Router();
const uploadConfig = multer(upload); 

const userController = require("../app/controllers/userController");
const authMiddleware = require("../app/middlewares/auth");

routes.post("/", uploadConfig.single("image"), userController.create);

routes.use(authMiddleware);
routes.put("/", userController.update);
routes.delete("/", userController.delete);
routes.get("/", userController.show);

module.exports = routes;
