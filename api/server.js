require('dotenv').config();
const express = require('express');
const session = require('express-session')
const cors = require('cors')
const appRoutes = require('./src/routes');

const app = express();


app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    }
}))

app.use(appRoutes);

const PORT = process.env.SERVER_PORT || 3000

// Inicializar servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
})
