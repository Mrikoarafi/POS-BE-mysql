const express = require("express");
const shop = require("../../controllers/v1/shop");
const router = express.Router();
const auth = require("../../helpers/v1/auth");
const usermiddlware = auth.authen && auth.author;

router.post("/transaction/:id_buying", usermiddlware, shop.transaction);
router.get("/shopusers", usermiddlware, shop.shopTrollyAll);
router.get("/shopdetail/:id", usermiddlware, shop.shopDetails);
router.put("/update/:id", usermiddlware, shop.transaction);
router.delete("/shopcancel/:id", usermiddlware, shop.shopCancel);
router.post("/shopbuying/:id", usermiddlware, shop.shopBuying);
module.exports = router;
