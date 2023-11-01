const express = require("express");
const app = express();
const formidable = require("express-formidable");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { connectDB } = require("./Config/db.js");
const authRoutes = require("./routes/authRoute.js");
const categoryRoute = require("./routes/categoryRoute.js");
const productRoute = require("./routes/productRoute.js");
const cors = require("cors");
//configure env
require("dotenv").config();

//database configuration
connectDB();

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(formidable());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);

// Rest API
app.get("/", (req, res) => {
  res.send({ message: "Welcome to ecommerce app" });
});

// PORT
const PORT = process.env.PORT;

// Run listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
