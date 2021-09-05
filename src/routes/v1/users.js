const express = require("express");
const usersmysql = require("../../controllers/v1/users");
const router = express.Router();
const auth = require("../../helpers/v1/auth");
const usermiddlware = auth.authen && auth.author;
// PUT update banyak
// POST insert
// PATCH update hanya 1
router.post("/register", usersmysql.register);
router.patch("/verify/:emailuser", usersmysql.verify);
router.post("/login", usersmysql.login);
router.get("/getdetails/:id", usermiddlware, usersmysql.getDetails);
router.put("/update/:id", usermiddlware, usersmysql.updateData);
router.patch("/update_data/:id", usermiddlware, usersmysql.updateDataOnly1);
router.get("/refresh-token", usermiddlware, usersmysql.renewToken);
router.post("/reset-password", usersmysql.resetPassword);
router.post("/confirm-password/:emailuser", auth.authenChangePass, auth.authorChangePass, usersmysql.confirmPassword);
router.patch("/check_code/:emailuser", usersmysql.checkCodeChangePassword);
router.patch("/logout/:id", usersmysql.logoutUsers);

module.exports = router;
