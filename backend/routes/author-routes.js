const router = require("express").Router();
const {
  login,
  register,
  forgetPassword,
  newPassword,
  logout,
} = require("../controller/author-controller");

router.get("/logout", logout);
router.post("/signup", register);
router.post("/login", login);
router.post("/forget", forgetPassword);
router.post("/reset", newPassword);

module.exports = router;
