const express = require("express");
const router = express.Router();
const {
  getCustomers,
  setCustomer,
  deleteCustomer,
} = require("../controllers/customerController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(setCustomer);
router.route("/:id").delete(protect, deleteCustomer).get(protect, getCustomers)

module.exports = router;
