class ProdutoController {
    constructor(produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    adicionar(req, res) {
        const { nome, preco } = req.body;
        const produto = { nome, preco };
        this.produtoRepository.adicionarProduto(produto);
        return res.status(201).json("Produto cadastrado com sucesso!");
    }

    listar(req, res) {
        const produtos = this.produtoRepository.listarProdutos();
        return res.status(200).json(produtos);
    }

    buscarPorId(req, res) {
        const { id } = req.params;
        const produto = this.produtoRepository.buscarProduto(id);
        if (!produto) {
            return res.status(404).json("Produto não encontrado!");
        } else {
        return res.status(200).json(produto)
        };
    }

    remover(req, res) {
        const { id } = req.params;
        this.produtoRepository.removerProduto(id);
        return res.status(200).json("Produto removido com sucesso!");
    }
    atualizar(req, res) {
        const { id } = req.params;
        const { nome, preco } = req.body;
        const produto = this.produtoRepository.buscarProduto(id);
        if (!nome && !preco) {
            return res.status(400).json("É necessário informar o nome e/ou preço do produto!");
        } else {
            produto.nome = nome ?? produto.nome;
            produto.preco = preco ?? produto.preco;
            produto = { nome, preco };
            this.produtoRepository.atualizarProduto(id, produto);
            return res.status(200).json("Produto atualizado com sucesso!");
        }
    }
    gerarRelatorio(req, res) {
        const relatorio = this.produtoRepository.gerarRelatorio();
        return res.status(200).json(relatorio);
    }
}

module.exports = ProdutoController;