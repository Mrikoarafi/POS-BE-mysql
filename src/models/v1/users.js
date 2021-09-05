const database_pos = require("../../configs/v1/db_pos");

const users = {
  registerModels: (data) => {
    return new Promise((resolve, reject) => {
      // MYSQL 2
      database_pos.query(`INSERT INTO users SET ?`, data, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  login: (data) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`SELECT * FROM users WHERE email ='${data.email}'`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  getAllModels: (name, email, sort, typesort, limit, offset) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`SELECT *,(SELECT COUNT(*) FROM users )AS count FROM users WHERE name_users LIKE '${name}' OR email LIKE '${email}'  ORDER BY ${sort} ${typesort} LIMIT ${offset},${limit}`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  getDetailsModels: (data) => {
    return new Promise((resolve, reject) => {
      // mysql2
      database_pos.query(`SELECT * FROM users WHERE id='${data}' OR email='${data}'`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  updateDataModels: (data, id) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`UPDATE users SET ? WHERE id=?`, [data, id], (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  verifyModels: (email) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`UPDATE users SET verify=1,codeverify=null WHERE email='${email.email}'`, (err, success) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(success);
        }
      });
    });
  },
  updateRefreshToken: (token, id) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`UPDATE users SET refreshtoken='${token}' WHERE id=${id}`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  renewTokenModels: (refreshToken) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`SELECT * FROM users WHERE refreshtoken='${refreshToken}'`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },

  resetPasswordModels: (codeverify, email) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`UPDATE users SET codeverify='${codeverify}' WHERE email='${email}'`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  checkCodeChangePasswordModels: (email) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`UPDATE users SET codeverify=null WHERE email='${email.email}'`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  confirmPasswordModels: (data) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`UPDATE users SET password='${data.password}' WHERE email='${data.email}'`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  logoutUsersModels: (id) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`UPDATE users SET refreshtoken=null WHERE id='${id}'`, (err, result) => {
        err ? reject(new Error(err.message)) : resolve(result);
      });
    });
  },
  deleteModels: (id) => {
    return new Promise((resolve, reject) => {
      database_pos.query(`DELETE FROM users WHERE id=${id} `, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = users;
