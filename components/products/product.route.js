const express = require("express");
const router = express.Router();
const { validate, validateList } = require("../../middlewares/joi.middleware");
const {
  addProductSchema,
  productSchema,
  productDataSchema,
} = require("./product.validation");
const { uploadFile, getJsonData } = require("../../utils/upload");

const {
  addProduct,
  listProducts,
  deleteProductsList,
  getProductById,
  deleteProductById,
  editProductById,
  searchProducts,
  uploadProducts,
  exportProducts,
} = require("./product.controller");

// add, list products
router.post("/add", validate(addProductSchema), addProduct);
router.get("/list", listProducts);
router.delete("/list", deleteProductsList);

// search products
router.get("/search", searchProducts);
router.post(
  "/bulk-upload",
  uploadFile.single("data"),
  getJsonData,
  validateList(productDataSchema),
  uploadProducts
);
router.get("/export-data", exportProducts);

// get product by id
router.get("/details/:id", getProductById);
router.put("/details/:id", validate(productSchema), editProductById);
router.delete("/details/:id", deleteProductById);

module.exports = router;
