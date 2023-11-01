const express = require("express");
const { requireSignIn } = require("../middlewares/authMiddlewares");
const {
  createProductController,
  getProductController,
  getAllProductsController,
  getPhotoController,
  deleteProductController,
  updateProductController,
} = require("../controller/productController");
const formidable = require("express-formidable");
const router = express.Router();

//routes

// Create product router
router.post(
  "/create-product",
  requireSignIn,
  formidable(),
  createProductController
);

// get product route
router.get(
  "/get-product/:slug",
  requireSignIn,
  formidable(),
  getProductController
);

// get product route
router.get("/get-all-products", getAllProductsController);

// get photo
router.get("/get-photo/:id", getPhotoController);

// delete product
router.delete("/delete-product/:id", requireSignIn, deleteProductController);

// update product
router.put("/update-product/:id", requireSignIn, updateProductController);

module.exports = router;
