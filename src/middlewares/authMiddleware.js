function authMiddleware(req, res, next) {
    if(!req.session.user) {
        return res.status(401).json({message: 'Acesso negado. Faça o login primeiro.'})
    }
    next();
}

module.exports = {authMiddleware}