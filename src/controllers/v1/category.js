const categoryModel = require("../../models/v1/category");
const productModels = require("../../models/v1/product");
const { success, failed, successWithMeta, errorServer } = require("../../helpers/v1/response");

const category = {
  getAll: (req, res) => {
    try {
      categoryModel
        .getAllModels()
        .then((result) => {
          success(res, result, "Success");
        })
        .catch((err) => {
          failed(res, [], err.message);
        });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
  getDetailsCategory: (req, res) => {
    const id = req.params.id;
    categoryModel
      .getDetailsCategoryModels(id)
      .then((resultDetails) => {
        success(res, resultDetails, `Success get details ${resultDetails[0].name_category}`);
      })
      .catch((err) => {
        failed(res, [], err.message);
      });
  },
  getCategory: (req, res) => {
    try {
      // pakai ternari operator,karna parameter yang dikirim kosong = undefined
      const name = !req.query.name_category ? "" : req.query.name_category;
      const sort = !req.query.sort ? `'%%'` : req.query.sort;
      const typesort = !req.query.typesort ? "" : req.query.typesort;
      //search limit & page
      const limit = !req.query.limit ? 12 : parseInt(req.query.limit);
      const page = !req.query.limit ? 1 : parseInt(req.query.page);
      const offset = page === 1 ? 0 : (page - 1) * limit;
      categoryModel
        .getCategoryModels(name, sort, typesort, limit, offset)
        .then((result) => {
          const totalProducts = result[0].count; //hitung rows
          const meta = {
            totalProducts,
            //math ceil untuk membulatkan angka
            totalPage: Math.ceil(totalProducts / limit),
            limit,
            page,
          };
          successWithMeta(res, result, meta, "Get all Category");
        })
        .catch((err) => {
          try {
            success(res, [], `${req.query.name_category} is 0`);
          } catch (err) {
            failed(res, [], err.message);
          }
        });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
  insertCategory: (req, res) => {
    try {
      // menangkan id di parameter link
      const body = req.body;
      categoryModel
        .insertCategoryModels(body)
        .then((result) => {
          //   muncul di console nya result
          success(res, result, "Success Insert New Category");
        })
        .catch((err) => {
          const error = { message: err.message };
          res.json(error);
        });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
  updateCategory: (req, res) => {
    try {
      // menangkap id di parameter link
      const id = req.params.id_category;
      const body = req.body;
      categoryModel
        .getDetailsCategoryModels(id)
        .then((resultDetails) => {
          const id_fake = "";
          const oldNameCategory = resultDetails[0].name_category;
          productModels
            .updateDataModels(body, id_fake, oldNameCategory)
            .then(() => {
              const name_category = body.category;
              categoryModel
                .updateDataModels(name_category, id)
                .then(() => {
                  success(res, { id: id }, `Success update category`);
                })
                .catch((err) => {
                  failed(res, [], err.message);
                });
            })
            .catch((error) => {
              failed(res, [], error.message);
            });
        })
        .catch((err) => {
          failed(res, [], err.message);
        });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
  deleteCategory: (req, res) => {
    try {
      const id = req.params.id_category;
      categoryModel
        .deleteModels(id)
        .then((result) => {
          success(res, result, "Success Delete Category");
        })
        .catch((err) => {
          failed(res, [], err.message);
        });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
};
module.exports = category;
