//* inisialisasi
const express = require("express");
var bodyParser = require("body-parser");
const { PORT } = require("./src/helpers/v1/env");
const cors = require("cors");
const app = express();
// path bawaan node

//* router
const transactionRouter = require("./src/routes/v1/shop");
const productRouter = require("./src/routes/v1/product");
const categoryRouter = require("./src/routes/v1/category");
const historyRouter = require("./src/routes/v1/history");
const usersRouter = require("./src/routes/v1/users");
const adminRouter = require("./src/routes/v1/admin");
//* bawaan framework,ketika di use auto terpakai di app.use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//* gunakan/inisial params & router
// ADMIN
app.use("/api/v1/admin", adminRouter);
// USERS
app.use("/api/v1/shop", transactionRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/history", historyRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/product", productRouter);
//*jalankan
app.listen(PORT, () => {
  console.log(`Server Connect to server ${PORT}`);
});
