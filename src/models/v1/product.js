const database_pos = require("../../configs/v1/db_pos");

const product = {
  getAllModels: (name, sort, typesort, limit, offset) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`SELECT *,(SELECT COUNT(*) FROM product )AS count FROM product WHERE name_product LIKE '${name}' ORDER BY ${sort} ${typesort} LIMIT ${offset},${limit}`, (err, result) => {
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
      database_pos.query(`SELECT * FROM product WHERE id=${id}`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  insertDataModels: (data) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`INSERT INTO product SET ? `, data, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  updateDataModels: (data, id, name_category) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`UPDATE product SET ? WHERE id=? OR category=?`, [data, id, name_category], (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  deleteModels: (id) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`DELETE FROM product WHERE id=${id}`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
};
module.exports = product;
