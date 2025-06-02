const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware.js");
const controller = require("../controllers/chargeContollers.js");

router.use(authMiddleware); 

router.post("/", controller.createCharge);

router.get("/", controller.getAllCharges);

router.get("/:id", controller.getChargeById);

router.put("/:id", controller.updateCharge);
router.delete("/:id", controller.deleteCharge);

module.exports = router;
