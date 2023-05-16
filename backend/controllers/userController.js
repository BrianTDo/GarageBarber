const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

// database
const db = require("../config/db");

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please complete all fields");
  }

  const [userExistsQuery] = await db.query(
    "SELECT email FROM UserAccount where email = ?",
    [email]
  );
  const userExists = userExistsQuery[0];

  // check if email already used
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create UserAccount
  const [user] = await db.query(
    "INSERT INTO User (firstName, lastName) VALUES (?, ?)",
    [firstName, lastName]
  );

  const [userAccount] = await db.query(
    "INSERT INTO UserAccount (email, password, userID) VALUES (?, ?, ?)",
    [email, hashedPassword, user.insertId]
  );

  if (user) {
    res.status(201).json({
      _id: user.insertId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      token: generateToken(user.insertId),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Authenticate user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Email check
  const [accountQuery] = await db.query(
    "SELECT * FROM userAccount WHERE email = ?",
    [email]
  );

  const account = accountQuery[0];

  if (account && (await bcrypt.compare(password, account.password))) {
    const [userQuery] = await db.query("SELECT * FROM user WHERE userID = ?", [
      account.userID,
    ]);
    const user = userQuery[0];
    res.status(201).json({
      _id: user.userID,
      firstName: user.firstName,
      lastName: user.lastName,
      email: account.email,
      token: generateToken(user.userID),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
