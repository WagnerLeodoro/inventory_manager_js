const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const {randomUUID} = require('node:crypto');

// Caminho do arquivo JSON
const FILE_PATH = path.join(__dirname, 'data.json');

// Carregar o arquivo JSON, se não existir, criar um array vazio
function carregarDados() {
    if(!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, '[]');
    }
    return JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
}

// Salvar dados no arquivo JSON
function salvarDados(produtos) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(produtos, null, 2));
}

class Produto {
    constructor(nome, preco) {
        this.id = randomUUID();
        this.nome = nome;
        this.preco = preco;
    }
}

const app = express();
app.use(express.json());

// Listar todos os produtos
app.get("/produtos", (req, res) => {
    const produtos = carregarDados();
    res.status(200).json(produtos);
})

// Listar um produto específico
app.get("/produtos/:id", (req, res) => {
    const produtos = carregarDados();
    const {id} = req.params;
    const produto = produtos.find(produto => produto.id === id);
    if(!produto) {
        return res.status(404).json("Produto não encontrado!");
    } else {
        res.status(200).json(produto);
    }
})

// Criar um novo produto
app.post("/produtos", (req, res) => {
    const produtos = carregarDados();
    const {nome, preco} = req.body;
    const produto = new Produto(nome, preco);
    produtos.push(produto);
    salvarDados(produtos);
    res.status(201).json("Produto cadastrado com sucesso!");
})

// Atualizar um produto
app.put("/produtos/:id", (req, res) => {
    const produtos = carregarDados();
    const {id} = req.params;
    const {nome, preco} = req.body;
    const produto = produtos.find(produto => produto.id === id);    
    if(!produto) {
        return res.status(404).json("Produto não encontrado!");
    } else {
        produto.nome = nome ?? produto.nome; // Se nome for nulo, mantém o nome atual
        produto.preco = preco ?? produto.preco; // Se preco for nulo, mantém o preco atual
        salvarDados(produtos);
        res.status(200).json("Produto atualizado com sucesso!");
    }
})

// Deletar um produto
app.delete("/produtos/:id", (req, res) => {
    const produtos = carregarDados();
    const {id} = req.params;
    const index = produtos.findIndex(produto => produto.id === id);
    if(index === -1) {
        return res.status(404).json("Produto não encontrado!");
    } else {
        produtos.splice(index, 1);
        salvarDados(produtos);
        res.status(204).json("Produto deletado com sucesso!");
    }
})

// Inicializar servidor
app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
})
