const Produto = require("../model/Produto");
const fs = require('node:fs');
const path = require('node:path');

class ProdutoRepository {
    constructor(dataService) {
        this.dataService = dataService;
    }

    // Listar todos os produtos
    listarProdutos() {
        return this.dataService.produtos;
    }

    // Adicionar um novo produto
    adicionarProduto({nome, preco}) {
        const produto = new Produto(nome, preco);
        this.dataService.produtos.push(produto);
        this.dataService.salvarDados(this.dataService.produtos);
    }

    // Remover um produto pelo ID
    removerProduto(id) {
        let produtos = this.dataService.produtos.findIndex(produto => produto.id === id);
        if (produtos === -1) {
            throw new Error("Produto não encontrado!");
        } else {
            this.dataService.produtos.splice(produtos, 1);
        }        
        this.dataService.salvarDados(this.dataService.produtos);
    }

    // Atualizar um produto pelo ID
    atualizarProduto(id, produtoAtualizado) {
        this.dataService.produtos = this.dataService.produtos.map(produto => {
            if (produto.id === id) {

                return produtoAtualizado;
            }
            return produto;
        });
        this.dataService.salvarDados(this.dataService.produtos);
    }

    // Buscar um produto pelo ID
    buscarProduto(id) {
        return this.dataService.produtos.find(produto => produto.id === id);
    }

    // Gerar relatório de produtos
    gerarRelatorio() {
        const produtos = this.dataService.produtos;
        const totalGeral = produtos.reduce((total, produto) => total + produto.preco, 0);
        const totalProdutos = produtos.length;

        let csv = 'Nome,Preço\n';
        produtos.forEach(produto => {
            csv += `${produto.nome},${produto.preco}\n`;
        });
        csv += `Total de produtos: ${totalProdutos}\n`;
        csv += `Total geral: ${totalGeral}\n`;

        const dirPath = path.join(__dirname, '../relatorios');
        const filePath = path.join(dirPath, 'produtos.csv');

        // Verificar se a pasta relatorios existe, se não, criar
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        // Escrever no arquivo CSV
        fs.writeFile(filePath, csv, (err) => {
            if (err) {
                console.error('Erro ao gerar o relatório:', err);
            } else {
                console.log('Relatório gerado com sucesso!');
            }
        });
    }
}

module.exports = ProdutoRepository;