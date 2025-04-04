class ProdutoController {
    constructor(produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    adicionar(req, res) {
        const { nome, preco } = req.body;
        const produto = { nome, preco };
        try {
            this.produtoRepository.adicionar(produto);
            return res.status(201).json("Produto cadastrado com sucesso!");
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }

    listar(req, res) {
        try {
            const produtos = this.produtoRepository.listar();
            return res.status(200).json(produtos);
        } catch (error) {
            return res.status(400).json(error.message)   
        }
    }

    buscarPorId(req, res) {
        const { id } = req.params;
        try {
            const produto = this.produtoRepository.buscarPorId(id);
            return res.status(200).json(produto)
        } catch (error) {
            return res.status(404).json(error.message);
        }
    }

    buscarPorNome(req, res) {
        const { nome } = req.query;
        try {
            const produto = this.produtoRepository.buscarPorNome(nome);
            return res.status(200).json(produto);
        } catch (error) {
            return res.status(404).json(error.message);
        }
    }

    remover(req, res) {
        const { id } = req.params;
        try {
            this.produtoRepository.remover(id);
            return res.status(200).json("Produto removido com sucesso!");
        } catch (error) {
            return res.status(404).json(error.message);
        }
    }

    atualizar(req, res) {
        const { id } = req.params;
        const { nome, preco } = req.body;
        try {
            let produto = this.produtoRepository.buscarPorId(id);
            produto.nome = nome ?? produto.nome;
            produto.preco = preco ?? produto.preco;
            this.produtoRepository.atualizar(id, produto);
            return res.status(200).json("Produto atualizado com sucesso!");
        } catch (error) {
            return res.status(404).json(error.message);            
        }
    }
}

module.exports = ProdutoController;