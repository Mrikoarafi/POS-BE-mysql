const database_pos = require("../../configs/v1/db_pos");

const history = {
  getAllHistory: (name, sort, typesort, limit, offset) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`SELECT *,(SELECT COUNT(*) FROM history )AS count FROM history WHERE created_at LIKE '%${name}%' ORDER BY ${sort} ${typesort} LIMIT ${offset},${limit}`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  getDetailsModels: (name_users) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`SELECT * FROM history WHERE name_users='${name_users}'`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  insertHistoryModels: (data) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`INSERT INTO history SET ? `, data, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  deleteHistory: (id, name_users) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`DELETE FROM history WHERE id='${id}' OR name_users='${name_users}'`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = history;
