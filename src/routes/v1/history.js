const express = require("express");
const history = require("../../controllers/v1/history");
const router = express.Router();
const auth = require("../../helpers/v1/auth");
const usermiddlware = auth.authen && auth.author;

router.get("/getall", usermiddlware, history.getHistory);
router.get("/getdetails", usermiddlware, history.getDetailsHistory);
router.delete("/delete/:id_delete", usermiddlware, history.deleteId);
module.exports = router;
