
class UserController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    // Listar todos os usuários
    listar(req, res) {
        const users = this.userRepository.listar();
        return res.status(200).json(users);
    }

    // Buscar um usuário pelo ID
    buscarPorId(req, res) {
        const { id } = req.params;
        const user = this.userRepository.buscarPorId(id);
        if (!user) {
            return res.status(404).json("Usuário não encontrado!");
        } else {
            return res.status(200).json(user);
        }
    }

    // Pesquisar por um usuário
    pesquisarUsuarios(req, res) {
        const { nome } = req.query;
        const user = this.userRepository.pesquisarUsuarios(nome);
        if (!user) {
            return res.status(404).json("Usuário não encontrado!");
        } else {
            return res.status(200).json(user);
        }
    }

    // Adicionar um novo usuário
    adicionar(req, res) {
        const { nome, email, password } = req.body;
        const user = { nome, email, password };
        this.userRepository.adicionar(user);
        return res.status(201).json("Usuário cadastrado com sucesso!");
    }

    // Atualizar um usuário pelo ID
    atualizar(req, res) {
        const { id } = req.params;
        const { nome, email, password } = req.body;
        try {
            let usuario = this.userRepository.buscarPorId(id);

            if(!nome && !email) {
                return res.status(400).json("É necessário informar o nome e/ou email do usuário!");
            }
    
            usuario.nome = nome ?? usuario.nome;
            usuario.email = email ?? usuario.email;
            usuario.password = password ?? usuario.password;
    
            this.userRepository.atualizar(id, usuario);
            return res.status(200).json("Usuário atualizado com sucesso!");
        } catch (error) {
            return res.status(400).json(error.message);
            
        }
    }


    //Remover um usuário pelo ID
    remover(req, res) {
        const { id } = req.params;
        this.userRepository.remover(id);
        return res.status(200).json({message: "Usuário removido com sucesso!"});
    }
}

module.exports = UserController;