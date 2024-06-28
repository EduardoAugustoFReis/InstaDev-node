const { Router } = require("express");
const router = Router();

const userRoutes = require("./user.routes");
const sessionsRoutes = require("./sessions.routes");

router.use("/users", userRoutes);
router.use("/sessions", sessionsRoutes);

module.exports = router; 