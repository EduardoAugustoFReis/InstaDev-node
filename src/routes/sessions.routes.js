const { Router } = require("express");
const routes = Router();

const sessionsController = require("../controllers/sessionsController");

routes.post("/", sessionsController.create);

module.exports = routes;