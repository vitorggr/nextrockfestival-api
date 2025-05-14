const fs = require('fs/promises');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/inscricoes.json');

class InscricaoService {
    constructor() {
        this.carregarInscricoes = this.carregarInscricoes.bind(this);
        this.salvarInscricoes = this.salvarInscricoes.bind(this);
    }

    async carregarInscricoes() {
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

    async salvarInscricoes(inscricoes) {
        await fs.writeFile(DATA_PATH, JSON.stringify(inscricoes, null, 2));
    }

    async listarPorUsuario(uid) {
        const inscricoes = await this.carregarInscricoes();
        return inscricoes.filter(i => i.uidUsuario === uid);
    }

    async criar({ uidUsuario, dados }) {
        const inscricoes = await this.carregarInscricoes();

        const novaInscricao = {
            id: Date.now().toString(),
            uidUsuario,
            ...dados,
            ativo: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        inscricoes.push(novaInscricao);
        await this.salvarInscricoes(inscricoes);
        return novaInscricao;
    }

    async atualizar({ id, uidUsuario, dados }) {
        const inscricoes = await this.carregarInscricoes();
        const index = inscricoes.findIndex(i => i.id === id && i.uidUsuario === uidUsuario);

        if (index === -1) return null;

        const atualizada = {
            ...inscricoes[index],
            ...dados,
            updatedAt: new Date().toISOString()
        };

        inscricoes[index] = atualizada;
        await this.salvarInscricoes(inscricoes);
        return atualizada;
    }

    async deletar({ id, uidUsuario }) {
        const inscricoes = await this.carregarInscricoes();
        const index = inscricoes.findIndex(i => i.id === id && i.uidUsuario === uidUsuario);

        if (index === -1) return false;

        inscricoes.splice(index, 1);
        await this.salvarInscricoes(inscricoes);
        return true;
    }

    async alterarStatus({ id, uidUsuario, ativo }) {
        const inscricoes = await this.carregarInscricoes();
        const index = inscricoes.findIndex(i =>
            i.id === id &&
            i.uidUsuario === uidUsuario
        );

        if (index === -1) return null;

        const atualizada = {
            ...inscricoes[index],
            ativo: !!ativo,
            updatedAt: new Date().toISOString()
        };

        inscricoes[index] = atualizada;
        await this.salvarInscricoes(inscricoes);
        return atualizada;
    }
}

module.exports = new InscricaoService();