class ProdutoController {
    constructor(produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    adicionar(req, res) {
        const { nome, preco } = req.body;
        const produto = { nome, preco };
        this.produtoRepository.adicionar(produto);
        return res.status(201).json("Produto cadastrado com sucesso!");
    }

    listar(req, res) {
        const produtos = this.produtoRepository.listar();
        return res.status(200).json(produtos);
    }

    buscarPorId(req, res) {
        const { id } = req.params;
        const produto = this.produtoRepository.buscarPorId(id);
        if (!produto) {
            return res.status(404).json("Produto não encontrado!");
        } else {
        return res.status(200).json(produto)
        };
    }

    remover(req, res) {
        const { id } = req.params;
        this.produtoRepository.remover(id);
        return res.status(200).json("Produto removido com sucesso!");
    }
    atualizar(req, res) {
        const { id } = req.params;
        const { nome, preco } = req.body;
        let produto = this.produtoRepository.buscarPorId(id);
        if (!nome && !preco) {
            return res.status(400).json("É necessário informar o nome e/ou preço do produto!");
        } else {
            produto.nome = nome ?? produto.nome;
            produto.preco = preco ?? produto.preco;
            this.produtoRepository.atualizar(id, produto);
            return res.status(200).json("Produto atualizado com sucesso!");
        }
    }
}

module.exports = ProdutoController;