import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'
import fetch from 'node-fetch'

const app = express()

// ✅ Configuração segura de CORS para produção e desenvolvimento
app.use(cors({
  origin: [
    "https://portal-implantacao-infoway.vercel.app",
    "https://portal-implantacao-infoway-673vydj7z-lubians-projects.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}))

app.use(express.json())

// ✅ Inicializa banco SQLite
const db = new Database('sci.db')
db.exec(`CREATE TABLE IF NOT EXISTS usuario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  cnpj TEXT NOT NULL UNIQUE,
  empresa TEXT NOT NULL,
  progresso TEXT
)`)

// ✅ Rota de status
app.get('/', (req, res) => {
  res.send('✅ Backend SCI rodando com SQLite. Use /api/usuario ou /api/cnpj para integração.')
})

// ✅ Salvar/atualizar usuário
app.post('/api/usuario', (req, res) => {
  const { nome, cnpj, documento, empresa } = req.body
  let doc = documento || cnpj
  doc = doc ? doc.replace(/\D/g, '') : ''

  console.log('📥 Recebido:', { nome, doc, empresa })

  let camposFaltando = []
  if (!nome) camposFaltando.push('nome')
  if (!doc) camposFaltando.push('documento/cnpj')

  const isCPF = doc.length === 11
  const isCNPJ = doc.length === 14
  let empresaFinal = ''

  if (isCPF) {
    empresaFinal = 'Pessoa Física'
  } else if (isCNPJ) {
    const empresaValida = empresa && empresa.trim() !== '' ? empresa.trim() : null
    if (!empresaValida) camposFaltando.push('empresa')
    empresaFinal = empresaValida
  } else {
    camposFaltando.push('documento inválido')
  }

  if (camposFaltando.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Dados obrigatórios faltando: ${camposFaltando.join(', ')}`,
      user: null
    })
  }

  const dataCadastro = new Date().toISOString()

  try {
    const stmt = db.prepare(`
      INSERT INTO usuario (nome, cnpj, empresa)
      VALUES (?, ?, ?)
      ON CONFLICT(cnpj) DO UPDATE SET
        nome = excluded.nome,
        empresa = excluded.empresa
    `)
    stmt.run(nome, doc, empresaFinal)

    res.json({
      success: true,
      message: 'Usuário cadastrado com sucesso.',
      user: {
        nome,
        cnpj: doc,
        empresa: empresaFinal,
        data_cadastro: dataCadastro
      }
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, user: null })
  }
})

// ✅ Consultar usuário por CNPJ
app.get('/api/usuario/:cnpj', (req, res) => {
  const stmt = db.prepare('SELECT * FROM usuario WHERE cnpj = ?')
  const usuario = stmt.get(req.params.cnpj)
  if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' })
  res.json(usuario)
})

// ✅ Proxy para ReceitaWS (consulta CNPJ)
app.get('/api/cnpj/:cnpj', async (req, res) => {
  const cnpj = req.params.cnpj.replace(/\D/g, '')

  try {
    const response = await fetch(`https://receitaws.com.br/v1/cnpj/${cnpj}`)
    if (!response.ok) {
      return res.status(404).json({ error: 'Empresa não encontrada.' })
    }

    const data = await response.json()

    // ✅ Força cabeçalhos CORS na resposta final
    res.setHeader("Access-Control-Allow-Origin", "https://portal-implantacao-infoway.vercel.app")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    res.json({ nome: data.nome || '' })
  } catch (err) {
    console.error('❌ Erro ao consultar ReceitaWS:', err.message)
    res.status(500).json({ error: 'Erro ao consultar ReceitaWS.' })
  }
})

// ✅ Inicializa servidor
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
})
