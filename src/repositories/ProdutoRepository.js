const Produto = require("../model/Produto");

class ProdutoRepository {
    constructor(dataService) {
        this.dataService = dataService;
        this.produtos = this.dataService.data.produtos;
    }

    // Listar todos os produtos
    listarProdutos() {
        return this.produtos;
    }

    // Adicionar um novo produto
    adicionarProduto({nome, preco}) {
        const produto = new Produto(nome, preco);
        this.produtos.push(produto);
        this.dataService.data.produtos = this.produtos;
        this.dataService.salvarDados(this.dataService.data);
    }

    // Remover um produto pelo ID
    removerProduto(id) {
        let produtos = this.produtos.findIndex(produto => produto.id === id);
        if (produtos === -1) {
            throw new Error("Produto não encontrado!");
        } else {
            this.produtos.splice(produtos, 1);
        }        
        this.dataService.salvarDados(this.produtos);
    }

    // Atualizar um produto pelo ID
    atualizarProduto(id, produtoAtualizado) {
        this.produtos = this.produtos.map(produto => {
            if (produto.id === id) {

                return produtoAtualizado;
            }
            return produto;
        });
        this.dataService.salvarDados(this.produtos);
    }

    // Buscar um produto pelo ID
    buscarProduto(id) {
        return this.produtos.find(produto => produto.id === id);
    }
}

module.exports = ProdutoRepository;