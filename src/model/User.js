const { randomUUID } = require('crypto');

class User {
    constructor(nome, email, password) {
        this.id = randomUUID();
        this.nome = nome;
        this.email = email;
        this.password = password;
    }
}

module.exports = User;