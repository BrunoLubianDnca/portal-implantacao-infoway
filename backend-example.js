// Consulta usuário por CPF ou CNPJ
app.get('/api/usuario/:documento', (req, res) => {
  let documento = req.params.documento.replace(/\D/g, '');
  const isCpf = /^\d{11}$/.test(documento);
  const isCnpj = /^\d{14}$/.test(documento);
  if (!(isCpf || isCnpj)) {
    return res.json({ success: false, message: 'Documento inválido.', data: null });
  }
  db.get('SELECT nome, documento, empresa, data_cadastro FROM usuarios WHERE documento = ?', [documento], (err, row) => {
    if (err) {
      return res.json({ success: false, message: 'Erro na consulta.', data: null });
    }
    if (!row) {
      return res.json({ success: false, message: 'Usuário não encontrado.', data: null });
    }
    return res.json({ success: true, message: 'Usuário encontrado.', data: row });
  });
});
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://implantacao.infoway.com.br'
}));

// Banco SQLite
const db = new sqlite3.Database('./usuarios.db');
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  documento TEXT UNIQUE,
  empresa TEXT,
  data_cadastro DATETIME
)`);

// Simulação de consulta ReceitaWS
async function consultaEmpresaCNPJ(cnpj) {
  // Modo demo funcional: aceita qualquer CNPJ válido (14 dígitos)
  cnpj = cnpj.replace(/\D/g, '');
  if (/^\d{14}$/.test(cnpj)) {
    return { nome: cnpj, cnpj };
  }
  return null;
}

// Cadastro de usuário
const limparNumero = (valor) => (typeof valor === 'string' ? valor.replace(/\D/g, '') : '');
const isCNPJ = (valor) => limparNumero(valor).length === 14;
const isCPF = (valor) => limparNumero(valor).length === 11;

app.post('/api/usuario', async (req, res) => {
  try {
    const documento = limparNumero(req.body.documento);
    const nome = req.body.nome?.trim();
    if (!nome || !(isCPF(documento) || isCNPJ(documento))) {
      return res.json({ success: false, message: 'Documento inválido ou nome ausente.', data: null });
    }
    // Verifica se já existe
    db.get('SELECT * FROM usuarios WHERE documento = ?', [documento], async (err, existente) => {
      if (existente) {
        return res.json({ success: true, existing: true, data: existente });
      }
      let empresa = 'Pessoa Física';
      if (isCNPJ(documento)) {
        // Consulta ReceitaWS
        const resp = await fetch(`https://receitaws.com.br/v1/cnpj/${documento}`);
        const data = await resp.json();
        if (data.status === 'ERROR') {
          return res.status(400).json({ success: false, message: 'CNPJ inválido ou não encontrado.' });
        }
        empresa = data.fantasia || data.nome || 'Empresa não identificada';
      }
      const data_cadastro = new Date().toISOString();
      db.run('INSERT INTO usuarios (nome, documento, empresa, data_cadastro) VALUES (?, ?, ?, ?)',
        [nome, documento, empresa, data_cadastro],
        function (err) {
          if (err) {
            return res.json({ success: false, message: 'Erro ao salvar usuário.', data: null });
          }
          db.get('SELECT * FROM usuarios WHERE documento = ?', [documento], (err, novoUsuario) => {
            return res.json({
              success: true,
              message: 'Usuário cadastrado com sucesso.',
              data: novoUsuario,
            });
          });
        }
      );
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erro ao salvar cadastro.' });
  }
});

// Consulta empresa por CNPJ
app.get('/api/cnpj/:cnpj', async (req, res) => {
  let { cnpj } = req.params;
  cnpj = typeof cnpj === 'string' ? cnpj.replace(/\D/g, '') : '';
  const empresa = await consultaEmpresaCNPJ(cnpj);
  if (empresa) {
    return res.json({ success: true, message: 'Empresa encontrada.', data: empresa });
  }
  return res.json({ success: false, message: 'Empresa não encontrada.', data: null });
});

app.listen(3001, () => {
  console.log('Backend rodando na porta 3001');
});
