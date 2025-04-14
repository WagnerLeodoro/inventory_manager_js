const Produto = require("../model/Produto");

class ProdutoRepository {
    constructor(dataService) {
        this.dataService = dataService;
        this.produtos = this.dataService.data.produtos;
    }

    // Listar todos os produtos
    listar() {
        return this.produtos;
    }

    // Buscar um produto pelo ID
    buscarPorId(id) {
        const produto = this.produtos.find(produto => produto.id === id);
        if (!produto) {
            throw new Error("Produto não encontrado!");
        }
        return produto;
    }

    buscarPorNome(nome) {
        if (nome) {
            return this.produtos.filter(produto => produto.nome.toLowerCase().includes(nome.toLowerCase()));
        } else {
            return this.produtos;
        }
    }

    // Adicionar um novo produto
    adicionar({ nome, preco }) {
        const produto = new Produto(nome, preco);
        this.produtos.push(produto);
        this.dataService.data.produtos = this.produtos;
        this.dataService.salvarDados(this.dataService.data);
    }

    // Remover um produto pelo ID
    remover(id) {
        let produtos = this.produtos.findIndex(produto => produto.id === id);
        if (produtos === -1) {
            throw new Error("Produto não encontrado!");
        } else {
            this.produtos.splice(produtos, 1);
        }
        this.dataService.data.produtos = this.produtos;
        this.dataService.salvarDados(this.dataService.data);
    }

    // Atualizar um produto pelo ID
    atualizarProduto(id, produtoAtualizado) {
            const index = this.produtos.findIndex(produto => produto.id === id);
            if (index === -1) {
                throw new Error("Produto não encontrado!");
            }
            this.produtos[index] = produtoAtualizado;
            this.dataService.data.produtos = this.produtos;
            this.dataService.salvarDados(this.dataService.data);
    }
}

module.exports = ProdutoRepository;