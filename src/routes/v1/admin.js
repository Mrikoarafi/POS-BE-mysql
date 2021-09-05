const express = require("express");
const users = require("../../controllers/v1/users");
const category = require("../../controllers/v1/category");
const history = require("../../controllers/v1/history");
const product = require("../../controllers/v1/product");
const auth = require("../../helpers/v1/auth");
const router = express.Router();

// product
router.post("/product/insert", auth.authen, auth.authenAdmin, auth.author, product.insert);
router.put("/product/update/:id", auth.authen, auth.authenAdmin, auth.author, product.updateData);
router.patch("/product/update_data/:id", auth.authen, auth.authenAdmin, auth.author, product.updateDataOnly1);
router.delete("/product/delete/:id", auth.authen, auth.authenAdmin, auth.author, product.deleteId);

// category
router.get("/category/allcategory", auth.authen, auth.authenAdmin, auth.author, category.getAll);
router.get("/category/detailscategory/:id", auth.authen, auth.authenAdmin, auth.author, category.getDetailsCategory);
router.get("/category/getall", auth.authen, auth.authenAdmin, auth.author, category.getCategory);
router.post("/category/insert", auth.authen, auth.authenAdmin, auth.author, category.insertCategory);
router.put("/category/update/:id_category", auth.authen, auth.authenAdmin, auth.author, category.updateCategory);
router.delete("/category/delete/:id_category", auth.authen, auth.authenAdmin, auth.author, category.deleteCategory);

// history
router.get("/history/getall", auth.authen, auth.authenAdmin, auth.author, history.getHistory);
router.delete("/history/delete/:id_delete", auth.authen, auth.authenAdmin, auth.author, history.deleteId);

// users
router.get("/users/getall", auth.authen, auth.authenAdmin, auth.author, users.getAllusers);
router.delete("/users/delete/:id", auth.authen, auth.authenAdmin, auth.author, users.deleteId);
module.exports = router;
