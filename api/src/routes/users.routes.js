const express = require("express");
const {authMiddleware} = require('../middlewares/authMiddleware.js')

const DataService = require("../services/DataService.js");
const UserController = require("../controllers/UserController.js");
const UserRepository = require("../repositories/UserRepository.js");

const dataService = new DataService();
const userRepository = new UserRepository(dataService);
const userController = new UserController(userRepository);

const userRoutes = express.Router();

userRoutes.post("/", (req, res) => userController.adicionar(req, res));

userRoutes.get("/", authMiddleware, (req, res) => userController.listar(req, res));

userRoutes.get("/:id", authMiddleware, (req, res) => userController.buscarPorId(req, res));

userRoutes.put("/:id", authMiddleware, (req, res) => userController.atualizar(req, res));

userRoutes.delete("/:id", authMiddleware, (req, res) => userController.remover(req, res));

module.exports = userRoutes;


