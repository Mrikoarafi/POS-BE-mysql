const database_pos = require("../../configs/v1/db_pos");

const shopModels = {
  insertProduct: (data) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`INSERT INTO transaction SET ? `, data, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  getDetailsModels: (id) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`SELECT * FROM transaction WHERE id=${id}  `, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  shopTrollyModels: (name_users, limit, offset) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`SELECT *,(SELECT COUNT(*) FROM transaction WHERE name_users = '${name_users}' )AS count FROM transaction WHERE name_users='${name_users}' ORDER BY created_at ASC LIMIT ${offset},${limit}`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  deleteShopModels: (id_users, name_users) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`DELETE FROM transaction WHERE id='${id_users}' OR name_users='${name_users}'`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = shopModels;
