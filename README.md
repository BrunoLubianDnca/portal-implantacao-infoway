# Portal de Implantação Infoway 🟠

Aplicação React moderna e responsiva para guiar usuários através do processo de implantação do servidor virtualizado Infoway.

## 🎯 Objetivo

Portal interativo com tutoriais em vídeo e documentação passo a passo para:
- Acesso ao servidor via navegador
- Configuração da interface virtual
- Infodrive e sincronização de arquivos
- Sistema de backup e segurança
- Suporte técnico e FAQ

## 📁 Estrutura do Projeto

```
Sci/
├── index.html                    # Entry point HTML
├── package.json                  # Dependências e scripts
├── vite.config.js               # Configuração Vite
├── src/
│   ├── main.jsx                 # Entry point React
│   ├── App.jsx                  # Componente principal
│   ├── index.css                # Estilos globais
│   ├── components/              # Componentes reutilizáveis
│   │   ├── Navbar.jsx           # Navegação fixa
│   │   ├── Hero.jsx             # Seção hero com animações
│   │   ├── TrilhoImplantacao.jsx # Cards das etapas
│   │   ├── Suporte.jsx          # Seção de suporte
│   │   └── Footer.jsx           # Rodapé
│   └── pages/                   # Páginas
│       ├── Home.jsx             # Página inicial
│       └── ModulePage.jsx       # Página interna de módulos
└── README.md
```

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### 1. Instalar Dependências
```powershell
npm install
```

### 2. Executar em Desenvolvimento
```powershell
npm run dev
```

O site abrirá automaticamente em `http://localhost:3000`

### 3. Build para Produção
```powershell
npm run build
```

Os arquivos otimizados estarão em `dist/`

### 4. Preview do Build
```powershell
npm run preview
```

## 🎨 Personalização

### Cores da Marca
Edite as variáveis CSS em `src/index.css`:
```css
:root {
  --primary-orange: #FF6B35;
  --secondary-orange: #FF8C42;
  --dark-gray: #2E3440;
  /* ... */
}
```

### Conteúdo dos Módulos
Edite o objeto `modulosData` em `src/pages/ModulePage.jsx` para:
- Alterar títulos e descrições
- Modificar conteúdo do tutorial
- Adicionar/remover materiais complementares

### Vídeos do YouTube
Substitua os IDs dos vídeos em `modulosData`:
```javascript
videoId: 'SEU_VIDEO_ID_AQUI'
```

### Logo
Substitua o SVG do logo em:
- `src/components/Navbar.jsx`
- `src/components/Footer.jsx`

## 📦 Tecnologias Utilizadas

- **React 18** - Biblioteca UI
- **Vite** - Build tool ultra-rápido
- **React Router** - Navegação entre páginas
- **Framer Motion** - Animações suaves
- **Lucide React** - Ícones modernos
- **CSS Modules** - Estilos isolados

## 📱 Responsividade

O site é totalmente responsivo e funciona em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## 🔧 Recursos Implementados

### ✅ Navegação
- Menu fixo com destaque na seção ativa
- Menu hambúrguer para mobile
- Scroll suave entre seções

### ✅ Seções
- **Home**: Boas-vindas com apresentação do Bruno
- **Acesso**: Explicação passo a passo do login
- **Funcionamento**: Interface virtual com mockup de navegador
- **Infodrive**: Comparação versão gratuita vs paga
- **Backup**: Timeline do processo de backup
- **Suporte**: Divisão de responsabilidades
- **Contato**: Formulário + informações de contato

### ✅ UI/UX
- Animações suaves ao scroll
- Cards interativos com hover
- Ícones do FontAwesome
- Gradientes modernos
- Timeline interativa
- Mockup de interface

## � Recursos Implementados

### ✅ Navegação
- Navbar fixa (sticky) com menu responsivo
- Busca integrada
- Menu hambúrguer para mobile
- Scroll suave entre seções

### ✅ Página Inicial
- **Hero**: Banner animado com call-to-action
- **Trilho de Implantação**: 4 cards interativos com hover effects
- **Suporte**: Cards circulares com ícones e links

### ✅ Páginas de Módulos
- Player de vídeo responsivo (YouTube embed)
- Tutorial estruturado com títulos numerados
- Boxes de dica 💡 e aviso ⚠️
- Materiais complementares para download
- Navegação entre módulos

### ✅ Animações
- Framer Motion para transições suaves
- Hover effects nos cards
- Floating elements no hero
- Scroll animations

## 🎯 Estrutura de Etapas

1. **Acesso ao Servidor** (~5 min)
2. **Configuração Inicial** (~10 min)
3. **Infodrive & Backup** (~8 min)
4. **Suporte & FAQ** (~7 min)

## 📝 Próximos Passos

1. **Substituir Vídeos**
   - Grave os tutoriais
   - Faça upload no YouTube
   - Atualize os `videoId` em `ModulePage.jsx`

2. **Personalizar Dados**
   - Logo da empresa
   - Telefones e e-mails reais
   - Links de WhatsApp funcionais

3. **Adicionar Materiais**
   - PDFs de guias
   - Checklists
   - Links para downloads

## 🚀 Deploy

### Vercel (Recomendado)
```powershell
npm i -g vercel
vercel
```

### Netlify
```powershell
npm run build
# Arraste a pasta dist/ para netlify.com/drop
```

### Servidor Próprio
```powershell
npm run build
# Copie a pasta dist/ para seu servidor
```

## 📞 Suporte

Para dúvidas sobre o código:
- Bruno - Responsável Técnico
- suporte@infoway.com.br

---

**Desenvolvido com React + Vite para o Portal de Implantação Infoway 🟠**
