const database_pos = require("../../configs/v1/db_pos");

const category = {
  getAllModels: () => {
    return new Promise((resolve, reject) => {
      database_pos.query(`SELECT * FROM category`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  getDetailsCategoryModels: (id) => {
    return new Promise((resolve, reject) => {
      database_pos.query(
        `SELECT * FROM category WHERE id_category=${id}`,
        (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  getCategoryModels: (name, sort, typesort, limit, offset) => {
    return new Promise((resolve, reject) => {
      database_pos.query(
        `SELECT *,(SELECT COUNT(*) FROM product WHERE category LIKE '%${name}%')AS count FROM product LEFT JOIN category ON product.category=category.name_category WHERE category LIKE '%${name}%' ORDER BY ${sort} ${typesort} LIMIT ${offset},${limit}`,
        (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  insertCategoryModels: (data) => {
    return new Promise((resolve, reject) => {
      database_pos.query(
        `INSERT INTO category (name_category) VALUES ('${data.name_category}')`,
        (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  updateDataModels: (name_category, id) => {
    return new Promise((resolve, reject) => {
      database_pos.query(
        `UPDATE category SET 
      name_category='${name_category}'
       WHERE id_category='${id}'`,
        (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  deleteModels: (id) => {
    return new Promise((resolve, reject) => {
      database_pos.query(
        `DELETE FROM category WHERE id_category='${id}'`,
        (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  // UNTUK UPDATE NAMA CATEGORY DI PRODUCT
  updateDataProductModels: (data, id) => {
    return new Promise((resolve, reject) => {
      database_pos.query(
        `UPDATE category SET 
      name_category='${data.name_category}'
       WHERE id_category='${id}'`,
        (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
};

module.exports = category;
