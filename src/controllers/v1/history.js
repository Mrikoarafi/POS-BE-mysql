const historyModel = require("../../models/v1/history");
const { success, failed, successWithMeta, errorServer } = require("../../helpers/v1/response");

const history = {
  getHistory: (req, res) => {
    try {
      const name = !req.query.date ? "" : req.query.date;
      const sort = !req.query.sort ? `'%%'` : req.query.sort;
      const typesort = !req.query.typesort ? "" : req.query.typesort;
      //search limit & page
      const limit = !req.query.limit ? 20 : parseInt(req.query.limit);
      const page = !req.query.limit ? 1 : parseInt(req.query.page);
      const offset = page === 1 ? 0 : (page - 1) * limit;
      historyModel
        .getAllHistory(name, sort, typesort, limit, offset)
        .then((result) => {
          const totalProducts = result[0].count; //hitung rows
          const meta = {
            totalProducts,
            //math ceil untuk membulatkan angka
            totalPage: Math.ceil(totalProducts / limit),
            limit,
            page,
          };
          successWithMeta(res, result, meta, "Get all History");
        })
        .catch((err) => {
          failed(res, [], err.message);
        });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
  getDetailsHistory: (req, res) => {
    try {
      const name = req.query.name_users;
      historyModel
        .getDetailsModels(name)
        .then((result) => {
          if (result.length > 0) {
            success(res, result, "Success Get Details History");
          } else {
            failed(res, [], "Unregistered user");
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

  deleteId: (req, res) => {
    try {
      const id = req.params.id_delete;
      historyModel
        .deleteHistory(id)
        .then((result) => {
          success(res, result, "Success Delete History");
        })
        .catch((err) => {
          failed(res, [], err.message);
        });
    } catch (error) {
      errorServer(res, [], "Internal server error");
    }
  },
};
module.exports = history;
