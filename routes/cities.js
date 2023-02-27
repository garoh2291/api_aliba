const { Router } = require("express");
const router = Router();
const auth = require("../middlewares/authMiddleware");
const cityController = require("../controllers/cityController");
const { cityValidator } = require("../utils/validators");

router.get("/", auth, cityController.getBash);
router.get("/all", cityController.getBashPublic);
router.post("/", auth, cityValidator, cityController.create);
router.delete("/:_id", auth, cityController.deleteOne);
router.patch("/:_id", auth, cityController.updateOne);

module.exports = router;
