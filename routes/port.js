const { Router } = require("express");
const router = Router();
const auth = require("../middlewares/authMiddleware");
const { portValidator } = require("../utils/validators");
const portController = require("../controllers/portController");

router.get("/", auth, portController.getbatch);
router.post("/", auth, portValidator, portController.create);
router.delete("/:_id", auth, portController.deleteOne);
router.patch("/:_id", auth, portController.updateOne);

module.exports = router;
