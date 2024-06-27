const { Router } = require("express");
const routes = Router();

routes.get("/health", (req, res) => {
  return res.send({ message: "Connect with success" });
});

module.exports = routes;

