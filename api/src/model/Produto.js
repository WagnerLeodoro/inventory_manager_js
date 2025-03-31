const { randomUUID } = require('crypto');

class Produto {
    constructor(nome, preco) {
        this.id = randomUUID();
        this.nome = nome;
        this.preco = preco;
    }
}

module.exports = Produto;