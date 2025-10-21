# 🚀 Portal de Implantação Infoway

Aplicação React moderna para guiar usuários através do processo de implantação do servidor virtualizado Infoway.

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn

## 🛠️ Instalação e Configuração

### 1. Clonar o repositório
```bash
git clone https://github.com/BrunoLubianDnca/portal-implantacao-infoway.git
cd portal-implantacao-infoway
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente

#### Para desenvolvimento local:
```bash
cp .env.example .env.development
# Edite .env.development com suas configurações locais
```

#### Para produção:
```bash
cp .env.example .env.production
# Edite .env.production com suas configurações de produção
```

### 4. Executar em desenvolvimento
```bash
npm run dev
```

### 5. Build para produção
```bash
npm run build
```

## 🌐 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel --prod
```

### Configuração no Vercel
No dashboard do Vercel, adicione a variável de ambiente:
- `VITE_API_URL=https://sua-api.onrender.com`

## 📊 Analytics

O Google Analytics 4 está configurado. Consulte `GOOGLE_ANALYTICS_README.md` para detalhes.

## 🔧 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── styles/        # Estilos globais
├── utils/         # Utilitários
└── assets/        # Imagens e recursos
```

## 📝 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, entre em contato através do WhatsApp configurado na aplicação.