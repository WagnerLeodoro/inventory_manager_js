const express = require("express");

const DataService = require("../services/DataService.js");
const UserController = require("../controllers/UserController.js");
const UserRepository = require("../repositories/UserRepository.js");

const dataService = new DataService();
const userRepository = new UserRepository(dataService);
const userController = new UserController(userRepository);

const userRoutes = express.Router();

userRoutes.get("/", (req, res) => userController.listar(req, res));
userRoutes.get("/:id", (req, res) => userController.buscarPorId(req, res));
userRoutes.post("/", (req, res) => userController.adicionar(req, res));
userRoutes.put("/:id", (req, res) => userController.atualizar(req, res));
userRoutes.delete("/:id", (req, res) => userController.remover(req, res));

module.exports = userRoutes;


