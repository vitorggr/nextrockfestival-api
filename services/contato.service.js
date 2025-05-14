const fs = require('fs/promises');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/contato.json');

class ContatoService {
    constructor() {
        this.carregarMensagens = this.carregarMensagens.bind(this);
        this.salvarMensagens = this.salvarMensagens.bind(this);
    }

    async carregarMensagens() {
        try {
            const dados = await fs.readFile(DATA_PATH, 'utf-8');
            return dados.trim() ? JSON.parse(dados) : [];
        } catch (err) {
            if (err.code === 'ENOENT') {
                await fs.writeFile(DATA_PATH, '[]');
                return [];
            }
            throw err;
        }
    }

    async salvarMensagens(mensagens) {
        await fs.writeFile(DATA_PATH, JSON.stringify(mensagens, null, 2));
    }

    async criar({ titulo, nome, email, descricao }) {
        const mensagens = await this.carregarMensagens();

        const novaMensagem = {
            id: Date.now().toString(),
            titulo,
            nome,
            email,
            descricao,
            createdAt: new Date().toISOString()
        };

        mensagens.push(novaMensagem);
        await this.salvarMensagens(mensagens);
        return novaMensagem;
    }

    async listar() {
        return await this.carregarMensagens();
    }
}

module.exports = new ContatoService();
