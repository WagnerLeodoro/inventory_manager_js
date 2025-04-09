const {Router} = require('express')
const SessionController = require("../controllers/SessionController")
const { authMiddleware } = require('../middlewares/authMiddleware')

const sessionController = new SessionController()

const sessionRouter = Router()

sessionRouter.post("/login", (req, res) => sessionController.login(req, res))

sessionRouter.get("/profile", (req, res) => sessionController.getProfile(req, res))

sessionRouter.post("/logout",authMiddleware, (req, res) => sessionController.logout(req, res))

module.exports = sessionRouter
