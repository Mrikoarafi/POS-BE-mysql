const usersModels = require("../../models/v1/users");
const shopModels = require("../../models/v1/shop");
const historyModels = require("../../models/v1/history");
const upload = require("../../helpers/v1/upload");
const { success, failed, successWithMeta, errorServer, tokenResult } = require("../../helpers/v1/response");
// bawaan express
const fs = require("fs");
const gmailRegist = require("../../helpers/v1/sendEmail");
// npm bcrypt
const bcrypt = require("bcrypt");
// npm env
const env = require("../../helpers/v1/env");
// npm jwt
const jwt = require("jsonwebtoken");

const users = {
  getAllusers: (req, res) => {
    try {
      const name = !req.query.name_users ? "%%" : req.query.name_users;
      const email = !req.query.email ? "" : req.query.email;
      const sort = !req.query.sort ? `'%%'` : req.query.sort;
      const typesort = !req.query.typesort ? "" : req.query.typesort;
      //search limit & page
      const limit = !req.query.limit ? 10 : parseInt(req.query.limit);
      const page = !req.query.limit ? 1 : parseInt(req.query.page);
      const offset = page === 1 ? 0 : (page - 1) * limit;
      usersModels
        .getAllModels(name, email, sort, typesort, limit, offset)
        .then((result) => {
          const totalRows = result[0].count; //hitung rows
          const meta = {
            totalRows,
            //math ceil untuk membulatkan ang`ka
            totalPage: Math.ceil(totalRows / limit),
            page,
          };
          successWithMeta(res, result, meta, "Get all users success");
        })
        .catch(() => {
          failed(res, [], "Not Found");
        });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
  getDetails: (req, res) => {
    try {
      // menangkap id di parameter link
      const id = req.params.id;
      usersModels
        .getDetailsModels(id)
        .then((result) => {
          if (result.length > 0) {
            success(res, result, "Success Get Details");
          } else {
            failed(res, [], "User not found");
          }
        })
        .catch((err) => {
          failed(res, [], err.message);
        });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
  updateData: (req, res) => {
    try {
      upload.single("pict_users")(req, res, (err) => {
        if (err) {
          if (err.code === "LIMIT_FILE_SIZE") {
            failed(res, [], "File too large Max 2mb");
          } else {
            failed(res, [], "File must be jpg & jpeg or png ");
          }
        } else if (!err) {
          const id = req.params.id;
          usersModels.getDetailsModels(id).then((dataDetails) => {
            const name_users = !req.body.name_users ? dataDetails[0].name_users : req.body.name_users;
            const pict_users = !req.file ? dataDetails[0].pict_users : req.file.filename;
            const number_users = !req.body.number_users ? dataDetails[0].number_users : req.body.number_users;
            const bio = !req.body.bio ? dataDetails[0].bio : req.body.bio;
            const location = !req.body.location ? dataDetails[0].location : req.body.location;
            const email = !req.body.email ? dataDetails[0].email : req.body.email;
            const dataOld = {
              name_users,
              pict_users,
              number_users,
              bio,
              location,
              email,
            };
            usersModels
              .updateDataModels(dataOld, id)
              .then((dataUpdate) => {
                if (!req.file) {
                  success(res, dataUpdate, "Success update Product no image");
                } else {
                  if (dataDetails[0].pict_users != "default.jpg") {
                    fs.unlink(`src/uploads/v1/${dataDetails[0].pict_users}`, (err) => {
                      if (err) {
                        errorServer(res, [], "Try again");
                      } else {
                        success(res, dataUpdate, "Success update Product with image");
                      }
                    });
                  } else {
                    success(res, dataUpdate, "Success update Product with new image");
                  }
                }
              })
              .catch((err) => {
                if (!req.file) {
                  if (err.message === `Error: Duplicate entry '${name_users}' for key 'users.name_users'`) {
                    failed(res, [], "Name using");
                  } else if (err.message === `Error: Duplicate entry '${number_users}' for key 'users.number_users'`) {
                    failed(res, [], "Number using");
                  } else if (err.message === `Error: Duplicate entry '${email}' for key 'users.email'`) {
                    failed(res, [], "Email using");
                  } else {
                    errorServer(res, [], "Internal server error");
                  }
                } else {
                  fs.unlink(`src/uploads/v1/${req.file.filename}`, (errorMulters) => {
                    if (errorMulters) {
                      errorServer(res, [], "Internal server error");
                    } else {
                      if (err.message === `Error: Duplicate entry '${name_users}' for key 'users.name_users'`) {
                        failed(res, [], "Name using");
                      } else if (err.message === `Error: Duplicate entry '${number_users}' for key 'users.number_users'`) {
                        failed(res, [], "Number using");
                      } else if (err.message === `Error: Duplicate entry '${email}' for key 'users.email'`) {
                        failed(res, [], "Email using");
                      } else {
                        errorServer(res, [], "Internal server error");
                      }
                    }
                  });
                }
              });
          });
        }
      });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
  updateDataOnly1: (req, res) => {
    try {
      const id = req.params.id;
      const details = req.body;
      usersModels
        .getDetailsModels(id)
        .then(async (resultGetDetails) => {
          const passwordUncrypt = await bcrypt.compare(details.password, resultGetDetails[0].password);
          if (passwordUncrypt) {
            details.verify = 2;
            usersModels.updateDataModels(details, id).then(() => {
              const email = details.email;
              gmailRegist.inboxChangeEmail(email);
              success(res, { id: resultGetDetails[0].id }, "Success update no image");
            });
          } else {
            failed(res, [], "Password Wrong");
          }
        })
        .catch(() => {
          errorServer(res, [], "Password wrong");
        });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
  register: (req, res) => {
    try {
      upload.single("pict_users")(req, res, (err) => {
        const body = req.body;
        const name = !body.name_users ? "%%" : body.name_users;
        const email = body.email;
        const sort = `''`;
        const typesort = `''`;
        const limit = 1;
        const offset = 0;
        // bawaan multer & ubah foto
        body.pict_users = !req.file ? "default.jpg" : req.file.filename;
        if (err) {
          if (err.code === "LIMIT_FILE_SIZE") {
            failed(res, [], "File too large Max 2mb");
          } else {
            failed(res, [], "File must be jpg & jpeg or png ");
          }
        } else if (!req.body.name_users) {
          fs.unlink(`src/uploads/v1/${req.file.filename}`, (err) => {
            if (err) {
              errorServer(res, [], "Try again");
            } else {
              failed(res, [], `Name required`);
            }
          });
        } else if (body.password.length < 6 || body.password.length > 20) {
          fs.unlink(`src/uploads/v1/${req.file.filename}`, (err) => {
            if (err) {
              errorServer(res, [], "Try again");
            } else {
              failed(res, [], `Password min 6 character & max 20 character`);
            }
          });
        } else {
          usersModels
            .getAllModels(name, email, sort, typesort, limit, offset)
            .then((result) => {
              if (result[0].name_users === name) {
                if (!req.file) {
                  failed(res, [], `Name using`);
                } else {
                  fs.unlink(`src/uploads/v1/${req.file.filename}`, (err) => {
                    if (err) {
                      errorServer(res, [], "Try again");
                    } else {
                      failed(res, [], `Name using`);
                    }
                  });
                }
              } else if (result[0].verify === 0) {
                fs.unlink(`src/uploads/v1/${req.file.filename}`, (err) => {
                  if (err) {
                    errorServer(res, [], "Try again");
                  } else {
                    failed(res, [], `Email has been register,verify now`);
                  }
                });
              } else if (result[0].email === email) {
                if (!req.file) {
                  failed(res, [], `Email using`);
                } else {
                  fs.unlink(`src/uploads/v1/${req.file.filename}`, (err) => {
                    if (err) {
                      errorServer(res, [], "Try again");
                    } else {
                      failed(res, [], `Email using`);
                    }
                  });
                }
              } else {
                fs.unlink(`src/uploads/v1/${req.file.filename}`, (err) => {
                  if (err) {
                    errorServer(res, [], "Try again");
                  } else {
                    failed(res, [], `Name using`);
                  }
                });
              }
            })
            .catch(async () => {
              try {
                // ubah ke bcrypt passwordnya,10 salt nya(keunikan tingkat 10 bcrypt)
                const hashPass = await bcrypt.hash(body.password, 10);
                // ubah password ke bentuk bcrypt
                body.password = hashPass;
                const codeverify = Math.floor(Math.random() * 8999) + 1000;
                body.codeverify = codeverify;
                usersModels
                  .registerModels(body)
                  .then((result) => {
                    const hashEmail = jwt.sign(email, env.JWTSECRET_USERS);
                    gmailRegist.inboxGmailRegist(email, codeverify);
                    success(res, { id: result.insertId, hashEmail }, `New User Success,please check your email for activation`);
                  })
                  .catch((err) => {
                    errorServer(res, [], err.message);
                  });
              } catch (error) {
                errorServer(res, [], "Server error");
              }
            });
        }
      });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
  verify: (req, res) => {
    try {
      const emailUser = req.params.emailuser;

      jwt.verify(emailUser, env.JWTSECRET_USERS, (err, uncode) => {
        if (err) {
          failed(res, [], "Your account hasn't been registered");
        } else if (!req.body.codeverify) {
          failed(res, [], "Fill code");
        } else {
          // di ambil data yang sudah di uncode
          const email = { email: uncode };
          // minjem models login
          usersModels.login(email).then((result) => {
            if (result.length === 0) {
              failed(res, { email: uncode }, "Pliss registered your account");
            } else if (result[0].verify === 1) {
              failed(res, [], "Your account has been actived");
            } else {
              if (result[0].codeverify != req.body.codeverify) {
                failed(res, [], "Wrong code");
              } else {
                usersModels
                  .verifyModels(email)
                  .then(() => {
                    id = result[0].id;
                    success(res, { id }, "Success verify code");
                  })
                  .catch((err) => {
                    failed(res, [], err.message);
                  });
              }
            }
          });
        }
      });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
  login: async (req, res) => {
    const data = req.body;
    try {
      usersModels.login(data).then(async (result) => {
        if (result.length > 0) {
          const id = result[0].id;
          if (result[0].verify === 1) {
            // merubah password ke bentuk asli,di await untuk menunggu
            const passwordUncrypt = await bcrypt.compare(req.body.password, result[0].password);
            if (passwordUncrypt) {
              // token untuk mengakses API di timer 3600 dan akan expired
              jwt.sign(
                // email di rubah menjadi token
                {
                  email: result[0].email,
                },
                env.JWTSECRET_USERS,
                {
                  expiresIn: 3600,
                },
                (err, token) => {
                  if (err) {
                    failed(res, [], err.message);
                  } else {
                    const refreshToken = jwt.sign({ id }, env.JWTSECRET_USERS);
                    if (result[0].refreshtoken === null) {
                      usersModels
                        .updateRefreshToken(refreshToken, id)
                        .then(() => {
                          const data = {
                            id,
                            token,
                            refreshToken,
                          };

                          tokenResult(res, data, `Success login`);
                        })
                        .catch((err) => {
                          failed(res, [], err.message);
                        });
                    } else {
                      const data = {
                        id,
                        token,
                        level: result[0].level,
                        refreshToken: result[0].refreshtoken,
                      };
                      tokenResult(res, data, `Success login`);
                    }
                  }
                }
              );
            } else {
              failed(res, [], "Password wrong");
            }
          } else {
            failed(res, [], "Email is not verified");
          }
        } else {
          failed(res, [], "Email is not registered");
        }
      });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
  renewToken: (req, res) => {
    try {
      const refreshToken = req.body.refreshToken;
      usersModels
        .renewTokenModels(refreshToken)
        .then((result) => {
          if (result.length >= 0) {
            const user = result[0];
            const newToken = jwt.sign(
              {
                email: user.email,
              },
              env.JWTSECRET_USERS,
              {
                expiresIn: 3600,
              }
            );
            const data = {
              token: newToken,
              refreshToken: refreshToken,
            };
            tokenResult(res, data, "Token berhasil di refresh");
          } else {
            failed(res, [], "Refresh token not found");
          }
        })
        .catch((err) => {
          failed(res, [], err);
        });
    } catch (error) {
      failed(res, [], "Internal Server Error");
    }
  },
  resetPassword: (req, res) => {
    try {
      const email = req.body.email;
      usersModels
        .getDetailsModels(email)
        .then(async (resultEmail) => {
          if (!resultEmail[0]) {
            failed(res, [], `Email invalid`);
          } else if (resultEmail) {
            // untuk codeverify
            const codeverify = Math.floor(Math.random() * 8999) + 1000;
            usersModels
              .resetPasswordModels(codeverify, email)
              .then((result) => {
                gmailRegist.inboxGmailResetPass(email, codeverify);
                const hashEmail = jwt.sign(email, env.JWTSECRET_USERS);
                result.insertId = resultEmail[0].id;
                success(res, { id: result.insertId, hashEmail }, `Success,Please check your email for see code`);
              })
              .catch((err) => {
                failed(res, [], err.message);
              });
          }
        })
        .catch((err) => {
          failed(res, [], err.message);
        });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
  checkCodeChangePassword: (req, res) => {
    try {
      const codeverify = req.body.codeverify;
      const emailUser = req.params.emailuser;
      jwt.verify(emailUser, env.JWTSECRET_USERS, (err, uncode) => {
        if (err) {
          failed(res, [], "Your account hasn't been registered");
        } else {
          const email = { email: uncode };
          usersModels.login(email).then((result) => {
            if (result.length === 0) {
              failed(res, [], "Please refresh");
            }
            //  else if (result[0].codeverify != codeverify) {
            //   failed(res, [], "Wrong code");
            // }
            else {
              usersModels
                .checkCodeChangePasswordModels(email)
                .then(() => {
                  jwt.sign(
                    // email di rubah menjadi token
                    {
                      email: email.email,
                    },
                    env.JWTSECRET_USERS,
                    {
                      expiresIn: 3600,
                    },
                    (err, tokenChangePass) => {
                      if (err) {
                        failed(res, [], err.message);
                      } else {
                        success(
                          res,
                          {
                            id: result[0].id,
                            tokenChangePass,
                            urlAPI: emailUser,
                          },
                          "Change your password"
                        );
                      }
                    }
                  );
                })
                .catch((error) => {
                  failed(res, [], error.message);
                });
            }
          });
        }
      });
    } catch (err) {
      failed(res, [], "Server internal error");
    }
  },
  confirmPassword: (req, res) => {
    try {
      const body = req.body;
      const tokenChangePass = req.headers.tokenpassword;
      const emailUser = req.params.emailuser;
      jwt.verify(emailUser, env.JWTSECRET_USERS, (err, uncode) => {
        if (err) {
          failed(res, [], "Your account hasn't been registered");
        } else {
          const email = { email: uncode };
          usersModels.login(email).then(async (result) => {
            if (result.length === 0) {
              failed(res, { email: uncode }, "Pliss registered your account");
            } else {
              if (body.password !== body.confirmPassword || body.password.length < 6) {
                failed(res, [], "Your password not same & min 6 character");
              } else {
                const hashPass = await bcrypt.hash(body.password, 10);
                body.email = email.email;
                body.password = hashPass;
                usersModels
                  .confirmPasswordModels(body)
                  .then((result) => {
                    success(res, result, `Password has been changed`);
                  })
                  .catch((err) => {
                    errorServer(res, [], err.message);
                  });
              }
            }
          });
        }
      });
    } catch (err) {
      failed(res, [], "Server internal error");
    }
  },
  logoutUsers: (req, res) => {
    const id = req.params.id;
    try {
      usersModels
        .logoutUsersModels(id)
        .then((result) => {
          result.insertId = parseInt(id);
          success(res, result, "Logout success");
        })
        .catch((err) => {
          failed(res, [], err.message);
        });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
  deleteId: async (req, res) => {
    // hapus users,juga hapus history dan transaksi
    try {
      const id_users = req.params.id;
      // const id kosong hanya untuk di mysql
      const id = "";
      usersModels
        .getDetailsModels(id_users)
        .then((resultDetails) => {
          if (resultDetails.length > 0) {
            const name_users = resultDetails[0].name_users;
            shopModels
              .deleteShopModels(id, name_users)
              .then(() => {
                historyModels
                  .deleteHistory(id, name_users)
                  .then(() => {
                    if (resultDetails[0].pict_users === "default.png") {
                      usersModels
                        .deleteModels(id_users)
                        .then(() => {
                          success(res, { idDelete: id_users }, "Success delete Product");
                        })
                        .catch((err) => {
                          failed(res, [], err.message);
                        });
                    } else {
                      // hapus picture di folder
                      fs.unlink(`src/uploads/v1/${resultDetails[0].pict_users}`, (err) => {
                        if (err) {
                          if (err.code === "EPERM") {
                            usersModels
                              .deleteModels(id_users)
                              .then(() => {
                                success(res, { idDelete: id_users }, "Success delete Product");
                              })
                              .catch((err) => {
                                failed(res, [], err.message);
                              });
                          } else {
                            failed(res, [], err.message);
                          }
                        } else {
                          usersModels
                            .deleteModels(id_users)
                            .then(() => {
                              success(res, { idDelete: id_users }, "Success delete Product");
                            })
                            .catch((err) => {
                              failed(res, [], err.message);
                            });
                        }
                      });
                    }
                  })
                  .catch(() => {
                    failed(res, [], err.message);
                  });
              })
              .catch((err) => {
                failed(res, [], err.message);
              });
          } else {
            failed(res, [], "ID tidak ada");
          }
        })
        .catch((err) => {
          failed(res, [], err.message);
        });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
};
module.exports = users;
