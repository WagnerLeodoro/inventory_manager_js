const express = require("express");
const produtoRoutes = require("./produto.routes.js");
const userRoutes = require("./users.routes.js");

const appRoutes = express.Router();

appRoutes.use("/produtos", produtoRoutes)
appRoutes.use("/users", userRoutes)

module.exports = appRoutes;