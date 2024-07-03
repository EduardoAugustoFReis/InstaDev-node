const { Router } = require("express");
const router = Router();

const userRoutes = require("./user.routes");
const sessionsRoutes = require("./sessions.routes");
const postsRoutes = require("./posts.routes");

router.use("/users", userRoutes);
router.use("/sessions", sessionsRoutes);
router.use("/posts", postsRoutes);

module.exports = router; 