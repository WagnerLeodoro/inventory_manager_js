require('dotenv').config();
const express = require('express');
const session = require('express-session')
const appRoutes = require('./src/routes');

const app = express();

app.use(express.json());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized:  false,
    cookie: {secure: false}
}))

app.use(appRoutes);

const PORT = process.env.SERVER_PORT || 3000

// Inicializar servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
})
