const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");
const { userValidator } = require("../utils/validators");

router.get("/", (req, res) => {
  res.json({ name: "Garnik" });
});
router.post("/signup", userValidator, userController.signUp);
router.post("/signin", userController.signin);

module.exports = router;
