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
        return this.produtos.find(produto => produto.id === id);
    }

    // Adicionar um novo produto
    adicionar({nome, preco}) {
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
        this.dataService.salvarDados(this.produtos);
    }

    // Atualizar um produto pelo ID
    atualizar(id, produtoAtualizado) {
        this.produtos = this.produtos.map(produto => {
            if (produto.id === id) {

                return produtoAtualizado;
            }
            return produto;
        });
        this.dataService.data.produtos = this.produtos;
        this.dataService.salvarDados(this.dataService.data);
    }
}

module.exports = ProdutoRepository;