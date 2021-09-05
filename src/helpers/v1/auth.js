const { tokenResult, tokenResultErr, tokenResultExpired } = require("../../helpers/v1/response");
const jwt = require("jsonwebtoken");
const env = require("../../helpers/v1/env");
const middleware = {
  authen: (req, res, next) => {
    const token = req.headers.token;
    if (token === undefined || token === "") {
      tokenResult(res, [], "Token unknown");
    } else {
      next();
    }
  },
  author: (req, res, next) => {
    const token = req.headers.token;
    jwt.verify(token, env.JWTSECRET_USERS, (err, decoded) => {
      if (err && err.name === "TokenExpiredError") {
        tokenResultExpired(res, [], "Token Expired,Authentication failed!");
      } else if (err && err.name === "JsonWebTokenError") {
        tokenResultErr(res, [], "Token wrong,Authentication failed!");
      } else {
        next();
      }
    });
  },
  authenChangePass: (req, res, next) => {
    const tokenChangePass = req.headers.tokenpassword;
    if (tokenChangePass === undefined || tokenChangePass === "") {
      tokenResult(res, [], "Token unknown");
    } else {
      next();
    }
  },
  authorChangePass: (req, res, next) => {
    const token = req.headers.tokenpassword;
    jwt.verify(token, env.JWTSECRET_USERS, (err, decoded) => {
      if (err && err.name === "TokenExpiredError") {
        tokenResultExpired(res, [], "Token Expired,Authentication failed!");
      } else if (err && err.name === "JsonWebTokenError") {
        tokenResultErr(res, [], "Token wrong,Authentication failed!");
      } else {
        next();
      }
    });
  },
  authenAdmin: (req, res, next) => {
    const auth = req.headers.admin;
    if (auth === undefined || auth === "" || auth != "1") {
      tokenResult(res, [], "Restart page");
    } else if (auth === "1") {
      next();
    }
  },
};
module.exports = middleware;
