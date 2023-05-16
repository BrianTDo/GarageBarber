const asyncHandler = require("express-async-handler");

// database
const db = require("../config/db");

// @desc Get customers by shop id
// @route GET /api/customers/:id
// @access Private
const getCustomers = asyncHandler(async (req, res) => {
  const [appointmentQuery] = await db.query(
    "SELECT * FROM ShopAppointments WHERE shopID = ?",
    [req.params.id]
  );
  const appointmentArray = await Promise.all(
    appointmentQuery.map(async (appointment) => {
      const [customerQuery] = await db.query(
        "SELECT * FROM Customer WHERE customerID = ?",
        [appointment.customerID]
      );
      return {
        id: appointment.appointmentID,
        date: appointment.date,
        time: appointment.time,
        shop: appointment.shopID,
        customer: customerQuery[0],
      };
    })
  );

  res.status(200).json(appointmentArray);
});

// @desc Set customer
// @route POST /api/customer/
// @access Public
const setCustomer = asyncHandler(async (req, res) => {
  if (!req.body.shop) {
    res.status(404);
    throw new Error("Shop not found");
  }

  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.phone ||
    !req.body.date
  ) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }

  // Check if customer already exists
  const [customerExistsQuery] = await db.query(
    "SELECT * FROM Customer WHERE firstName = ? AND lastName = ? AND phone",
    [req.body.firstName, req.body.lastName, req.body.phone]
  );
  const customer = customerExistsQuery[0];
  var customerID = null;
  if (customer) {
    console.log("Customer exists in database");
    customerID = customer.customerID;
  } else {
    console.log("Customer does not exist in database");
    const [customerQuery] = await db.query(
      "INSERT INTO Customer (firstName, lastName, phone) VALUES (?, ?, ?)",
      [req.body.firstName, req.body.lastName, req.body.phone]
    );
    customerID = customerQuery.insertId;
  }

  // Split into date time
  // Create a new Date object from the UTC timestamp
  const date = new Date(req.body.date);

  // Get the date component in yyyy-mm-dd format
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const dateStr = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;


  // Get the time component in hh:mm:ss format
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const timeStr = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  

  const [appointmentQuery] = await db.query(
    "INSERT INTO ShopAppointments (date, time, shopID, customerID) VALUES (?, ?, ?, ?)",
    [dateStr, timeStr, req.body.shop.shopID, customerID]
  );

  res.status(200).json(appointmentQuery);
});

// @desc Delete appointment
// @route DELETE /api/customer/:id
// @access Private
const deleteCustomer = asyncHandler(async (req, res) => {
  // const customer = await Customer.findById(req.params.id);
  // const shop = await Shop.findById(customer.shop);

  // if (!customer) {
  //   res.status(404);
  //   throw new Error("Customer not found");
  // }

  const [appointmentQuery] = await db.query(
    "DELETE FROM ShopAppointments WHERE appointmentID = ?",
    [req.params.id]
  );

  // User check
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check if logged in user is shop user
  if (shop.userID !== req.user.userID) {
    res.status(401);
    throw new Error("User not authorized");
  }

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getCustomers,
  setCustomer,
  deleteCustomer,
};
