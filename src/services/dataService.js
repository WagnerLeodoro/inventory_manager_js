const path = require('node:path');
const fs = require('node:fs');

class DataService {
    constructor() {
        this.FILE_PATH = path.resolve(__dirname, '..', 'db', 'data.json');
        this.produtos = this.carregarDados();
    }

    // Carregar o arquivo JSON, se não existir, criar um array vazio
    carregarDados() {
        if (!fs.existsSync(this.FILE_PATH)) {
            fs.writeFileSync(this.FILE_PATH, '[]');
        }
        return JSON.parse(fs.readFileSync(this.FILE_PATH, 'utf-8'));
    }

    // Salvar dados no arquivo JSON
    salvarDados(produtos) {
        fs.writeFileSync(this.FILE_PATH, JSON.stringify(produtos, null, 2));
    }
}


module.exports = DataService;