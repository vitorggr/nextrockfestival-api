# Next Rock Festival API

API REST desenvolvida com Node.js e Express.js para gerenciar inscrições e contatos do app Next Rock Festival também hospedado nessa conta do github (https://github.com/vitorggr/nextrockfestival). 

A api e o app estão hospedados respectivamente nas URLs abaixo:

- https://nextrockfestival-api.onrender.com/
- https://nextrockfestival.vercel.app/

## 🔨 Objetivos do Projeto

- Implementar uma **API REST** completa utilizando **Node.js** e **Express.js**
- Criar sistema de gerenciamento de inscrições para o festival
- Implementar sistema de contato para comunicação com os organizadores
- Utilizar middleware de autenticação para proteger rotas específicas
- Persistir dados utilizando sistema de arquivos com **fs/promises**
- Implementar logging de requisições para monitoramento
- Utilizar arquitetura em camadas (Controllers, Services, Routes)

## 🚀 Como Executar

Siga os passos abaixo para executar o projeto localmente:

1. **Clone o repositório:**

   ```shell
   git clone https://github.com/vitorggr/nextrockfestival-api.git
   cd nextrockfestival-api
   ```

2. **Instale as dependências:**

   ```shell
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto:
   ```
   PORT=3001
   NODE_ENV=development
   ```

4. **Inicie o servidor:**
   
   ```shell
   npm run dev
   ```

O servidor estará disponível em http://localhost:3001

## 📚 Endpoints da API

### Inscrições
- `GET /api/inscricoes` - Lista todas as inscrições
- `POST /api/inscricoes` - Cria uma nova inscrição
- `GET /api/inscricoes/:id` - Obtém uma inscrição específica
- `PUT /api/inscricoes/:id` - Atualiza uma inscrição
- `PATCH /api/inscricoes/:id` - Atualiza o status de uma inscrição
- `DELETE /api/inscricoes/:id` - Remove uma inscrição

### Contato
- `POST /api/contato` - Envia uma mensagem de contato

## 🔧 Estrutura do Projeto

```
├── controllers/          # Controladores da aplicação
├── data/                # Arquivos JSON para persistência
├── middlewares/         # Middlewares customizados
├── routes/              # Definição das rotas da API
├── services/           # Camada de serviços
├── app.js              # Arquivo principal da aplicação
└── package.json        # Dependências e scripts
```

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express.js
- Middleware de autenticação personalizado
- Sistema de logging
- File System para persistência de dados

## 📝 Logs e Monitoramento

O sistema possui um middleware de logging que registra todas as requisições em `data/logs.json`, incluindo:
- Timestamp da requisição
- Método HTTP
- URL acessada
- Status da resposta







