# Backend – Portal Implantação Infoway

## Visão Geral
API Node.js/Express responsável pelo cadastro de usuários, validação de CNPJ, consulta de empresa e persistência dos dados para o onboarding do portal Infoway.

## Instalação
```bash
npm install
```

## Execução
```bash
node index.js
```

## Endpoints

### 1. Cadastro de Usuário
`POST /api/usuario`
- **Body:** `{ nome, cnpj, empresa }`
- **Valida CNPJ** e salva usuário no banco.
- **Retorno:**
```json
{
  "success": true,
  "message": "Usuário cadastrado com sucesso.",
  "user": {
    "nome": "Leonardo",
    "cnpj": "12345678000195",
    "empresa": "Infoway",
    "data_cadastro": "2025-10-20T14:00:00Z"
  }
}
```

Em caso de erro:
```json
{
  "success": false,
  "message": "CNPJ inválido ou já cadastrado.",
  "user": null
}
```

### 2. Consulta de Empresa por CNPJ
`GET /api/cnpj/:cnpj`
- Consulta dados da empresa via ReceitaWS ou serviço similar.
- **Retorno:**
```json
{
  "success": true,
  "message": "Empresa encontrada.",
  "empresa": {
    "nome": "Infoway",
    "cnpj": "12345678000195"
    // ...outros dados
  }
}
```

Em caso de erro:
```json
{
  "success": false,
  "message": "Empresa não encontrada.",
  "empresa": null
}
```

## Estrutura do Banco
Tabela `usuarios`:
- `id` (INTEGER, PK)
- `nome` (TEXT)
- `cnpj` (TEXT)
- `empresa` (TEXT)
- `data_cadastro` (DATETIME)

## Fluxo de Cadastro
1. Frontend envia dados via `/api/usuario`.
2. Backend valida CNPJ e consulta empresa.
3. Usuário salvo no banco.
4. Retorno estruturado para frontend (status, mensagem, dados, data_cadastro).

## Exemplo de Requisição
```bash
curl -X POST http://localhost:3001/api/usuario \
  -H "Content-Type: application/json" \
  -d '{"nome":"Leonardo","cnpj":"12345678000195","empresa":"Infoway"}'

# Exemplo de resposta:
{
  "success": true,
  "message": "Usuário cadastrado com sucesso.",
  "user": {
    "nome": "Leonardo",
    "cnpj": "12345678000195",
    "empresa": "Infoway",
    "data_cadastro": "2025-10-20T14:00:00Z"
  }
}
```

## Configuração
- Express.js para rotas
- SQLite para persistência
- CORS habilitado

## Observações
- Adapte endpoints conforme regras de negócio.
- Proteja rotas sensíveis se necessário.

---
Desenvolvido para onboarding Infoway – Outubro/2025.
