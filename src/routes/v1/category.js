const express = require("express");
const category = require("../../controllers/v1/category");
const auth = require("../../helpers/v1/auth");
const usermiddlware = auth.authen && auth.author;

const router = express.Router();

router.get("/allcategory",usermiddlware, category.getAll);
router.get("/getall",usermiddlware, category.getCategory);
module.exports = router;
