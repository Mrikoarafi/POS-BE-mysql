const productModel = require("../../models/v1/product");
const upload = require("../../helpers/v1/upload");
const fs = require("fs");
const { success, failed, successWithMeta, errorServer, tokenResultExpired } = require("../../helpers/v1/response");

const product = {
  getAll: (req, res) => {
    try {
      // pakai ternari operator,karna parameter yang dikirim kosong = undefined
      const name = !req.query.name_product ? "%%" : req.query.name_product;
      const sort = !req.query.sort ? `'%%'` : req.query.sort;
      const typesort = !req.query.typesort ? "" : req.query.typesort;
      //search limit & page
      const limit = !req.query.limit ? 12 : parseInt(req.query.limit);
      const page = !req.query.limit ? 1 : parseInt(req.query.page);
      const offset = page === 1 ? 0 : (page - 1) * limit;
      productModel
        .getAllModels(name, sort, typesort, limit, offset)
        .then((result) => {
          // redisClient.set('produk', JSON.stringify(result)) // kirim dan tampilin ke teks dulu karna redis berupa teks
          const totalProducts = result[0].count; //hitung rows
          const meta = {
            totalProducts,
            //math ceil untuk membulatkan ang`ka
            totalPage: Math.ceil(totalProducts / limit),
            page,
          };
          successWithMeta(res, result, meta, "Get all books success,from Database");
        })
        .catch((err) => {
          failed(res, [], err.message);
        });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
  getDetails: (req, res) => {
    try {
      const id = req.params.id;
      productModel
        .getDetailsModels(id)
        .then((result) => {
          success(res, result, "Success Get Details Product");
        })
        .catch((err) => {
          failed(res, [], err.message);
        });
    } catch (error) {
      // jika penulisan ada yang eror,berarti di backend
      errorServer(res, [], "Internal server error");
    }
    // menangkap id di parameter link
  },
  insert: (req, res) => {
    try {
      upload.single("picture")(req, res, (err) => {
        const body = req.body;
        const name = body.name_product;
        const sort = `''`;
        const typesort = `''`;
        const limit = 1;
        const offset = 0;
        // bawaan multer & ubah foto
        body.picture = !req.file ? "default.jpg" : req.file.filename;
        if (err) {
          if (err.code === "LIMIT_FILE_SIZE") {
            failed(res, [], "File too large Max 2mb");
          } else {
            failed(res, [], "File must be jpg & jpeg or png ");
          }
        } else if (!req.body.name_product) {
          failed(res, [], `Name required `);
        } else {
          productModel
            .getAllModels(name, sort, typesort, limit, offset)
            .then((result) => {
              if (result[0].name_product === name) {
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
            .catch(() => {
              try {
                productModel
                  .insertDataModels(body)
                  .then((result) => {
                    success(res, result, "New User Success");
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
  updateData: (req, res) => {
    try {
      const name_category = "";
      upload.single("picture")(req, res, (err) => {
        // check error
        if (err) {
          if (err.code === "LIMIT_FILE_SIZE") {
            failed(res, [], "File too large Max 2mb");
          } else {
            failed(res, [], "File must be jpg & jpeg or png ");
          }
          // tidak error
        } else if (!req.body.name_product) {
          if (!req.file) {
            failed(res, [], `Name required (no pict)`);
          } else {
            fs.unlink(`src/uploads/v1/${req.file.filename}`, (err) => {
              if (err) {
                errorServer(res, [], "Try again");
              } else {
                failed(res, [], `Name required (with pict)`);
              }
            });
          }
        } else if (!err) {
          // inisial
          const name = req.body.name_product;
          const sort = `''`;
          const typesort = `''`;
          const limit = 1;
          const offset = 0;
          productModel
            .getAllModels(name, sort, typesort, limit, offset)
            .then((result) => {
              if (result[0].name_product === name) {
                if (!req.file) {
                  failed(res, [], `Name ${name} already used (no pict)`);
                } else {
                  fs.unlink(`src/uploads/v1/${req.file.filename}`, (err) => {
                    if (err) {
                      errorServer(res, [], "Try again");
                    } else {
                      failed(res, [], `Name ${name} already used (with pict)`);
                    }
                  });
                }
              }
            })
            .catch(() => {
              try {
                const id = req.params.id;
                productModel.getDetailsModels(id).then((dataDetails) => {
                  const name_product = !req.body.name_product ? dataDetails[0].name_product : req.body.name_product;
                  const price = !req.body.price ? dataDetails[0].price : req.body.price;
                  const description_product = !req.body.description_product ? dataDetails[0].description_product : req.body.description_product;
                  const category = !req.body.category ? dataDetails[0].category : req.body.category;
                  const picture = !req.file ? dataDetails[0].picture : req.file.filename;
                  const dataOld = {
                    name_product,
                    price,
                    description_product,
                    category,
                    picture,
                  };

                  productModel
                    .updateDataModels(dataOld, id, name_category)
                    .then((dataUpdate) => {
                      if (!req.file) {
                        success(res, dataUpdate, "Success update Product no image");
                      } else {
                        if (dataDetails[0].picture != "default.jpg") {
                          fs.unlink(`src/uploads/v1/${dataDetails[0].picture}`, (err) => {
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
                      errorServer(res, [], err.message);
                    });
                });
              } catch (error) {
                errorServer(res, [], "Internal server error");
              }
            });
        }
      });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
  updateDataOnly1: (req, res) => {
    try {
      upload.single("picture")(req, res, (err) => {
        const id = req.params.id;
        const details = req.body;
        // name category untuk update category di controllers category
        const name_category = "";
        if (err) {
          if (err.code === "LIMIT_FILE_SIZE") {
            failed(res, [], "File too large Max 2mb");
          } else {
            failed(res, [], "File must be jpg & jpeg or png ");
          }
        } else {
          productModel
            .getDetailsModels(id)
            .then((resultGetDetails) => {
              if (!req.file) {
                productModel.updateDataModels(details, id, name_category).then((resultPatch) => {
                  success(res, resultPatch, "Success update no image");
                });
              } else {
                fs.unlink(`src/uploads/v1/${resultGetDetails[0].picture}`, (err) => {
                  if (err) {
                    errorServer(res, [], "Try again 1");
                  } else {
                    details.picture = req.file.filename;
                    productModel.updateDataModels(details, id, name_category).then((resultPatch) => {
                      success(res, resultPatch, "Success update image");
                    });
                  }
                });
              }
            })
            .catch(() => {
              errorServer(res, [], "Try again 2");
            });
        }
      });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
  deleteId: (req, res) => {
    try {
      const id = req.params.id;
      productModel
        .getDetailsModels(id)
        .then((result) => {
          // jika default / tidak tersimpan di storage
          if (result[0].picture === "default.png") {
            productModel
              .deleteModels(id)
              .then((result) => {
                success(res, result, "Success delete Product");
              })
              .catch((err) => {
                failed(res, [], err.message);
              });
          } else {
            // hapus picture di folder
            fs.unlink(`src/uploads/v1/${result[0].picture}`, (err) => {
              if (err) {
                failed(res, [], err.message);
              } else {
                productModel
                  .deleteModels(id)
                  .then((result) => {
                    success(res, result, "Success delete Product");
                  })
                  .catch((err) => {
                    failed(res, [], err.message);
                  });
              }
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
};
module.exports = product;
