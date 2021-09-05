const shopModel = require("../../models/v1/shop");
const productModel = require("../../models/v1/product");
const usersModels = require("../../models/v1/users");
// const upload = require("../../helpers/v1/upload");
// const fs = require("fs");
const history = require("../../models/v1/history");
const { success, failed, successWithMeta, errorServer, tokenResultExpired } = require("../../helpers/v1/response");

const shop = {
  transaction: (req, res) => {
    try {
      // cek di product untuk id barang nya
      const id_users = req.body.id_users;
      const id = req.params.id_buying;
      usersModels
        .getDetailsModels(id_users)
        .then((resultUsers) => {
          productModel
            .getDetailsModels(id)
            .then((resultProduct) => {
              if (resultProduct.length > 0) {
                const shoppingProduct = resultProduct.map((item) => {
                  item.qty = req.body.qty;
                  item.description_users = req.body.description_users;
                  item.name_users = resultUsers[0].name_users;
                  delete item.id;
                  shopModel.insertProduct(item);
                });
                // akan di jalankan setelah semua selesai
                Promise.all(shoppingProduct)
                  .then(() => {
                    success(res, resultProduct, "Success add to trolly");
                  })
                  .catch((err) => {
                    failed(res, [], err.message);
                  });
              } else {
                failed(res, [], "id not available");
              }
            })
            .catch((err) => {
              failed(res, [], err.message);
            });
        })
        .catch(() => {});
    } catch (error) {
      // jika penulisan ada yang eror,berarti di backend
      errorServer(res, [], "Internal server error");
    }
  },
  shopDetails: (req, res) => {
    try {
      const id = req.params.id;
      shopModel
        .getDetailsModels(id)
        .then((result) => {
          if (result.length != 0) {
            success(res, result, "Success Get Details Shopping");
          } else {
            failed(res, [], "id not available");
          }
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
  shopTrollyAll: (req, res) => {
    try {
      const name_users = req.query.name_users;
      const limit = !req.query.limit ? 12 : parseInt(req.query.limit);
      const page = !req.query.limit ? 1 : parseInt(req.query.page);
      const offset = page === 1 ? 0 : (page - 1) * limit;
      shopModel
        .shopTrollyModels(name_users, limit, offset)
        .then((result) => {
          if (result.length === 0) {
            success(res, [], "Haven't made a purchase yet");
          } else {
            const totalProducts = result[0].count; //hitung data
            const meta = {
              totalProducts,
              //math ceil untuk membulatkan angka
              totalPage: Math.ceil(totalProducts / limit),
              page,
            };
            successWithMeta(res, result, meta, "Get all Transaction success");
          }
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
  shopCancel: (req, res) => {
    try {
      const id = req.params.id;
      shopModel
        .deleteShopModels(id)
        .then((result) => {
          success(res, result, "Success delete Trolly");
        })
        .catch((err) => {
          failed(res, [], err.message);
        });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
  shopBuying: (req, res) => {
    try {
      const id = req.params.id;
      shopModel.getDetailsModels(id).then((detailsShop) => {
        const deleteAddHistory = detailsShop.map((item) => {
          delete item.id;
          item.status_buying = 1;
          history.insertHistoryModels(item);
        });
        Promise.all(deleteAddHistory)
          .then(() => {
            shopModel
              .deleteShopModels(id)
              .then((result) => {
                success(res, result, "Success buy");
              })
              .catch((err) => {
                failed(res, [], err.message);
              });
          })
          .catch((err) => {
            failed(res, [], err.message);
          });
      });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
};

module.exports = shop;
