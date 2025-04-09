const { compare } = require("bcryptjs");
const UserRepository = require("../repositories/UserRepository");
const DataService = require("../services/DataService");
const { generateSessionId } = require("../services/sessionGenerator");

class SessionController {
    constructor() {
        this.dataService = new DataService()
        this.usuarioRepository = new UserRepository(this.dataService)
    }

    async login(req, res) {
        const {email, password} = req.body;
        try {
            const user = this.usuarioRepository.buscarPorEmail(email)

            const passwordMatch = await compare(password, user.password)

            if(!passwordMatch){
                res.status(401).json({message: "Credenciais inválidas"})
            }
            req.session.user = {
                id: user.id,
                nome: user.nome,
                email: user.email,
                sessionId: generateSessionId()
            }
            res.status(200).json({message: "Login bem sucedido!"})
        } catch (error) {
            res.status(400).json(error.message)
        }
    }

    getProfile(req, res) {
        const {user} = req.session
        if(!user) {
            throw new Error("Nenhum usuário logado!")
        }
        return res.status(200).json(user)
    }

    logout(req, res) {
        req.session.destroy(error => {
            if(error) {
                return res.status(500).json({message: "Erro ao encerrar sessão."})
            }
            res.status(200).json({message: "Logout realizado com sucesso!"})
        })
    }
}

module.exports = SessionController