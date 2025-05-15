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

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async criar({ titulo, nome, email, descricao }) {
        // Validação dos campos
        if (!titulo || typeof titulo !== 'string' || titulo.trim().length === 0) {
            throw new Error('Título é obrigatório');
        }
        if (!nome || typeof nome !== 'string' || nome.trim().length === 0) {
            throw new Error('Nome é obrigatório');
        }
        if (!email || !this.validateEmail(email)) {
            throw new Error('Email inválido');
        }
        if (!descricao || typeof descricao !== 'string' || descricao.trim().length === 0) {
            throw new Error('Descrição é obrigatória');
        }

        const mensagens = await this.carregarMensagens();

        const novaMensagem = {
            id: Date.now().toString(),
            titulo: titulo.trim(),
            nome: nome.trim(),
            email: email.trim(),
            descricao: descricao.trim(),
            status: 'pendente',
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
