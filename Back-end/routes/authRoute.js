const express = require("express");
const {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  getAllUsersController,
} = require("../controller/authController");
const {
  requireSignIn,
  requireAdmin,
} = require("../middlewares/authMiddlewares");

// router object
const router = express.Router();

// Getting all user
router.get("/users", getAllUsersController);
//Forgot Passwords
router.post("/forgot-passwords", forgotPasswordController);
// REGISTER METHOD POST
router.post("/register", registerController);
// LOGIN METHOD POST
router.post("/login", loginController);
// TEST ROUTES
router.get("/test", requireSignIn, requireAdmin, testController);
// protected routes
router.get("/protected", requireSignIn, (req, res) => {
  res.status(200).json({ ok: true });
});
// admin routes
router.get("/admin-auth", requireSignIn, requireAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});

module.exports = router;
