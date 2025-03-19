const express = require('express');
const appRoutes = require('./src/routes');

const app = express();

app.use(express.json());
app.use(appRoutes);


// Inicializar servidor
app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
})
