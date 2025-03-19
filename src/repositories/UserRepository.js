const User = require('../model/User');

class UserRepository {
    constructor(dataService) {
        this.dataService = dataService;
        this.usuarios = this.dataService.data.usuarios;
    }

    // Listar todos os usuários
    listar() {
        return this.usuarios;
    }

    // Buscar um usuário pelo ID
    buscarPorId(id) {
        const usuario = this.usuarios.find(u => u.id === id);
        if (!usuario) {
            throw new Error("Usuário não encontrado!");
        }
        return usuario;
    }

    // Adicionar um novo usuário
    adicionar({nome, email, password}) {
        if(!nome || !email || !password) {
            throw new Error("Nome, email e senha são obrigatórios!");
        }
        const usuario = new User(nome, email, password);
        this.usuarios.push(usuario);
        
        this.dataService.data.usuarios = this.usuarios;
        this.dataService.salvarDados(this.dataService.data);
    }

    //Atualizar um usuário pelo ID
    atualizar(id, usuarioAtualizado) {
        this.usuarios = this.usuarios.map(u => {
            if (u.id === id) {

                return usuarioAtualizado;
            }
            return u;
        });
        this.dataService.data.usuarios = this.usuarios;
        this.dataService.salvarDados(this.dataService.data);
    }

    // Remover um usuário pelo ID
    remover(id) {
        let usuario = this.usuarios.findIndex(u => u.id === id);
        if (usuario === -1) {
            throw new Error("Usuário não encontrado!");
        } else {
            this.usuarios.splice(usuario, 1);
        }
    }
}

module.exports = UserRepository;