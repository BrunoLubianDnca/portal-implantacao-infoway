# 🚀 Deploy no Vercel - Guia Passo a Passo

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org) 16+ instalado
- [Git](https://git-scm.com) instalado
- Conta no [GitHub](https://github.com)
- Conta no [Vercel](https://vercel.com)

---

## ✅ Passo 1: Preparar o Projeto Localmente

### 1.1 Verificar se tudo está funcionando
```powershell
# Instalar dependências
npm install

# Testar build local
npm run build

# Verificar se rodou sem erros
npm run preview
```

Se tudo funcionar, siga para o próximo passo.

---

## 📤 Passo 2: Fazer Git Commit e Push

### 2.1 Iniciar repositório Git (se não tiver)
```powershell
cd c:\Users\Lubian\Sci
git init
git add .
git commit -m "Initial commit: Portal de Implantação Infoway"
```

### 2.2 Conectar ao GitHub
1. Acesse [github.com/new](https://github.com/new)
2. Crie um repositório chamado: `portal-implantacao-infoway`
3. Copie o URL (exemplo: `https://github.com/SEU_USER/portal-implantacao-infoway.git`)

### 2.3 Push para GitHub
```powershell
git remote add origin https://github.com/SEU_USER/portal-implantacao-infoway.git
git branch -M main
git push -u origin main
```

---

## 🌐 Passo 3: Deploy no Vercel

### 3.1 Opção A: Via Dashboard Vercel (Mais Fácil)

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"New Project"** (se not logged in, faça login com GitHub)
3. Selecione o repositório **`portal-implantacao-infoway`**
4. Clique em **"Import"**
5. Vercel detectará automaticamente:
   - **Framework**: React
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. Clique em **"Deploy"** ✅

**Pronto!** Seu site estará disponível em: `https://portal-implantacao-infoway.vercel.app`

---

### 3.2 Opção B: Via CLI Vercel (Mais Rápido)

```powershell
# Instalar CLI do Vercel globalmente
npm install -g vercel

# Fazer login
vercel login

# Deploy automático
vercel
```

Responda as perguntas:
- **Project name**: `portal-implantacao-infoway`
- **Which scope**: Seu usuário
- **Link to existing project?**: `No` (primeira vez)
- **In which directory is your code?**: `.`
- **Want to modify these settings?**: `No`

**Pronto!** Seu site estará online em segundos! 🎉

---

## 🔧 Passo 4: Configurar Domínio Customizado (Opcional)

Se quer usar seu próprio domínio (ex: `implantacao.infoway.com.br`):

1. No Dashboard Vercel, vá em **Settings** → **Domains**
2. Clique em **"Add"**
3. Digite seu domínio customizado
4. Siga as instruções para configurar o DNS

---

## 📊 Passo 5: Monitorar Deploy

### Ver status do deploy
```powershell
vercel list
```

### Ver logs em tempo real
```powershell
vercel logs
```

### Acessar dashboard
Acesse [vercel.com/dashboard](https://vercel.com/dashboard)

---

## 🔄 Passo 6: Atualizar Site (Próximas Mudanças)

Sempre que fizer mudanças:

```powershell
# 1. Commit localmente
git add .
git commit -m "Descrição das mudanças"

# 2. Push para GitHub
git push origin main

# 3. Vercel faz deploy AUTOMATICAMENTE! ✅
```

Não precisa fazer nada mais. Vercel detecta mudanças no GitHub e faz redeploy automaticamente.

---

## ⚡ Dicas de Performance

### Otimizações já ativas:
- ✅ Build otimizado com Vite
- ✅ Code splitting automático
- ✅ Minificação CSS/JS
- ✅ Cache automático (vercel.json já configurado)

### Testar performance
```powershell
npm run build
npm run preview
```

Abra DevTools (F12) → Network → verifique tamanho dos arquivos

---

## 🐛 Solucionar Problemas

### Problema: Build falha no Vercel
**Solução**: 
1. Veja os logs no Vercel dashboard
2. Execute `npm run build` localmente para replicar o erro
3. Faça o commit da correção

### Problema: Páginas retornam 404
**Solução**: 
- Já está configurado no `vercel.json`
- Vercel redireciona tudo para `index.html` (SPA)

### Problema: WhatsApp não funciona
**Verificação**:
```javascript
// DevTools Console (F12)
console.log('Número:', whatsappNumber)
console.log('URL:', whatsappUrl)
```

---

## 📞 URLs Importantes

| Recurso | URL |
|---------|-----|
| **Site Ao Vivo** | `https://portal-implantacao-infoway.vercel.app` |
| **Dashboard Vercel** | `https://vercel.com/dashboard` |
| **GitHub Repo** | `https://github.com/SEU_USER/portal-implantacao-infoway` |
| **Documentação Vercel** | `https://vercel.com/docs` |

---

## ✨ Próximos Passos (Após Deploy)

1. ✅ Testar site completo em produção
2. ✅ Verificar WhatsApp funcionando
3. ✅ Testar responsividade (mobile/tablet)
4. ✅ Monitorar analytics (opcional)
5. ✅ Configurar domínio customizado
6. ✅ Ativar HTTPS (automático no Vercel ✅)

---

## 📝 Comandos Rápidos Resumo

```powershell
# Setup local
npm install
npm run build
npm run preview

# Git
git add .
git commit -m "message"
git push origin main

# Vercel
vercel login
vercel
vercel list
vercel logs
```

---

**Status**: 🟢 Pronto para produção!

*Criado: Outubro 2025*
*Projeto: infoway-implantacao@1.0.0*
