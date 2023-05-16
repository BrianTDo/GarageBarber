const express = require("express");
const router = express.Router();
const {
  getShops,
  setShop,
  updateShop,
  deleteShop,
  getShopById,
} = require("../controllers/shopController");
const {protect} = require('../middleware/authMiddleware')

router.route("/").get(protect, getShops).post(protect, setShop);
router.route("/:id").delete(protect, deleteShop).put(protect, updateShop).get(getShopById);

module.exports = router;
