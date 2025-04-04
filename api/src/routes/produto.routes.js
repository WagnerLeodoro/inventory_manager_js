const express = require("express");

const DataService = require("../services/DataService.js");
const ProdutoController = require("../controllers/ProdutoController.js");
const ProdutoRepository = require("../repositories/ProdutoRepository.js");

const dataService = new DataService();
const produtoRepository = new ProdutoRepository(dataService);
const produtoController = new ProdutoController(produtoRepository);

const produtoRoutes = express.Router();

produtoRoutes.get("/", (req, res) => produtoController.buscarPorNome(req, res));
produtoRoutes.get("/:id", (req, res) => produtoController.buscarPorId(req, res));
produtoRoutes.post("/", (req, res) => produtoController.adicionar(req, res));
produtoRoutes.put("/:id", (req, res) => produtoController.atualizar(req, res));
produtoRoutes.delete("/:id", (req, res) => produtoController.remover(req, res));

module.exports = produtoRoutes;


