const express = require("express");
const produtoRoutes = require("./produto.routes.js");

const appRoutes = express.Router();

appRoutes.use("/produtos", produtoRoutes)

module.exports = appRoutes;