const { hash } = require('bcryptjs');
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

    //Buscar usuário pelo email
    buscarPorEmail(email) {
        const usuario = this.usuarios.find(u => u.email === email)
        if(!usuario) {
            throw new Error("Usuário não encontrado")
        }
        return usuario
    }

    pesquisarUsuarios(query) {
        const usuario = this.usuarios.filter(u => u.nome.toLowerCase().includes(query.toLowerCase()))
        if(!usuario) {
            throw new Error("Nenhum usuário não encontrado")
        }
        return usuario
    }

    // Adicionar um novo usuário
    async adicionar({nome, email, password}) {
        if(!nome || !email || !password) {
            throw new Error("Nome, email e senha são obrigatórios!");
        }

        const password_hash = await hash(password, 6)

        const usuario = new User(nome, email, password_hash);
        
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
        this.dataService.data.usuarios = this.usuarios;
        this.dataService.salvarDados(this.dataService.data);
    }
}

module.exports = UserRepository;