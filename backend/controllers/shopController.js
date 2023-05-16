const asyncHandler = require("express-async-handler");

// database
const db = require("../config/db");

// @desc Get shops
// @route GET /api/shops
// @access Private
const getShops = asyncHandler(async (req, res) => {
  const [shopQuery] = await db.query(
    "SELECT * FROM Shop JOIN Location ON Shop.locationID = Location.locationID WHERE Shop.userID = ?",
    [req.user.userID]
  );
  const shop = shopQuery[0];
  res.status(200).json(shop);
});

// @desc Get shop by id
// @route GET /api/shops/:id
// @access Public
const getShopById = asyncHandler(async (req, res) => {
  const [shopQuery] = await db.query("SELECT * FROM Shop JOIN Location ON Shop.locationID = Location.locationID WHERE Shop.shopID = ?", [
    req.params.id,
  ]);
  const shop = shopQuery[0];
  res.status(200).json(shop);
});

// @desc Set shop
// @route POST /api/shops
// @access Private
const setShop = asyncHandler(async (req, res) => {
  if (
    !req.body.name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.state ||
    !req.body.zipcode ||
    !req.body.phone
  ) {
    res.status(400);
    throw new Error("Please complete all text fields");
  }

  try {
    const [locationExistsQuery] = await db.query(
      "SELECT locationID FROM Location WHERE Address = ? AND City = ? AND State = ? AND Zipcode = ?",
      [req.body.address, req.body.city, req.body.state, req.body.zipcode]
    );
    var location = locationExistsQuery[0];

    var locationID = null;
    if (location) {
      console.log("Location exists in database");
      locationID = location.locationID;
    } else {
      console.log("Location does not exist in database");
      const [locationQuery] = await db.query(
        "INSERT INTO Location (Address, City, State, Zipcode) VALUES (?, ?, ?, ?)",
        [req.body.address, req.body.city, req.body.state, req.body.zipcode]
      );
      locationID = locationQuery.insertId;
      location = {
        locationID: locationID,
        Address: req.body.address,
        City: req.body.city,
        State: req.body.state,
        Zipcode: req.body.zipcode,
      };
    }

    var active = 0;
    if (req.body.active == true) {
      active = 1;
    }

    const [shopCreateQuery] = await db.query(
      "INSERT INTO Shop (Name, Phone, Active, Description, UserID, LocationId) VALUES (?, ?, ?, ?, ?, ?)",
      [
        req.body.name,
        req.body.phone,
        active,
        req.body.description,
        req.user.userID,
        locationID,
      ]
    );
    const [shopQuery] = await db.query(
      "SELECT * FROM Shop JOIN Location ON Shop.locationID = Location.locationID WHERE Shop.shopID = ?",
      [shopCreateQuery.insertId]
    );
    const shop = shopQuery[0];

    res.status(200).json(shop);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Server error");
  }
});

// @desc Update shop
// @route PUT /api/shops/:id
// @access Private
const updateShop = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const [shopQuery] = await db.query("SELECT * FROM Shop where shopID = ?", [
    req.params.id,
  ]);

  const shop = shopQuery[0];

  if (!shop) {
    res.status(400);
    throw new Error("Shop not found");
  }

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

  // Check if location already exists
  const [locationExistsQuery] = await db.query(
    "SELECT locationID FROM Location WHERE Address = ? AND City = ? AND State = ? AND Zipcode = ?",
    [req.body.address, req.body.city, req.body.state, req.body.zipcode]
  );
  const location = locationExistsQuery[0];
  var locationID = null;
  if (location) {
    console.log("Location exists in database");
    locationID = location.locationID;
  } else {
    console.log("Location does not exist in database");
    const [locationQuery] = await db.query(
      "INSERT INTO Location (Address, City, State, Zipcode) VALUES (?, ?, ?, ?)",
      [req.body.address, req.body.city, req.body.state, req.body.zipcode]
    );
    locationID = locationQuery.insertId;
  }

  const [updateShopQuery] = await db.query(
    "UPDATE Shop SET name = ?, phone = ?, active = ?, description = ?, locationID = ? WHERE shopID = ?",
    [
      req.body.name,
      req.body.phone,
      req.body.active,
      req.body.description,
      locationID,
      shop.shopID,
    ]
  );

  res.status(200).json(updateShopQuery);
});

// @desc Delete shops
// @route DELETE /api/shops/:id
// @access Private
const deleteShop = asyncHandler(async (req, res) => {
  const [shopQuery] = await db.query("SELECT * FROM Shop where shopID = ?", [
    req.params.id,
  ]);
  const shop = shopQuery[0];

  if (!shop) {
    res.status(400);
    throw new Error("Shop not found");
  }

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

  // delete
  const [deleteAppointmentQuery] = await db.query(
    "DELETE FROM ShopAppointments WHERE shopID = ?",
    [shop.shopID]
  );
  const [deleteShopQuery] = await db.query(
    "DELETE FROM Shop WHERE shopID = ?",
    [shop.shopID]
  );
  res.status(200).json({ id: shop.shopID });
});

module.exports = {
  getShops,
  setShop,
  updateShop,
  deleteShop,
  getShopById,
};
