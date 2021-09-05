const express = require("express");
const auth = require("../../helpers/v1/auth");
const usermiddlware = auth.authen && auth.author;

const { getAll, getDetails } = require("../../controllers/v1/product");
const router = express.Router();

router.get("/getall", usermiddlware, getAll);
router.get("/getdetails/:id", usermiddlware, getDetails);
module.exports = router;
