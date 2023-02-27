const { Router } = require("express");
const router = Router();
const auth = require("../middlewares/authMiddleware");
const fobController = require("../controllers/fobController");
const { fobValidator } = require("../utils/validators");

router.get("/",auth, fobController.getBatch);
router.get("/single/:value", fobController.getFiltered);
router.post("/",auth, fobValidator, fobController.create);
router.delete("/:_id",auth, fobController.deleteOne);
router.patch("/:_id",auth, fobController.updateOne);

module.exports = router;
