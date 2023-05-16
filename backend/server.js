const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;

const app = express();

const indexRouter = require("./routes/index");
const shopRouter = require("./routes/shopRoutes");
const loginRouter = require("./routes/userRoutes");
const customerRouter = require("./routes/customerRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", indexRouter);
app.use("/api/shops", shopRouter);
app.use("/api/users", loginRouter);
app.use("/api/customer", customerRouter);

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
}
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
