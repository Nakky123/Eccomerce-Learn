const {
  createCategoryController,
  updateCategoryController,
  getAllCategoriesController,
  deleteCategoryController,
  getSingleCategoryController,
} = require("../controller/categoryController");
const { requireSignIn } = require("../middlewares/authMiddlewares");

const express = require("express");

const router = express.Router();

//routes

// Create category routes
router.post("/create-category", requireSignIn, createCategoryController);

// Update category routes
router.put("/update-category/:slug", requireSignIn, updateCategoryController);

// Get all categories routes
router.get("/get-all-categories", requireSignIn, getAllCategoriesController);

// Delete category routes
router.delete(
  "/delete-category/:slug",
  requireSignIn,
  deleteCategoryController
);

// get single category routes
router.get(
  "/get-single-category/:slug",
  requireSignIn,
  getSingleCategoryController
);



module.exports = router;
