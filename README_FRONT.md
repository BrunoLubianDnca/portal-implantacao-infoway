# Portal de Implantação Infoway — Frontend

## Escopo Atual

### 1. Onboarding e Cadastro
- Tela de autenticação/cadastro exibida ao iniciar o portal.
- Usuário informa nome, CNPJ e empresa.
- Validação automática do CNPJ e preenchimento do nome da empresa.
- Máscara de CNPJ para facilitar o preenchimento.
- Feedback visual, loading e mensagens de erro/sucesso inline.
- Dados salvos no backend e localStorage.

### 2. Experiência de Boas-Vindas
- Após cadastro, usuário é redirecionado para a Home.
- Toast/snackbar animado de sucesso com nome do usuário e botão “Iniciar Módulo 1”.
- Toast some automaticamente após 4 segundos ou ao clicar no botão.

### 3. Controle de Acesso
- Usuário só acessa módulos após cadastro.
- Cadastro não é solicitado novamente enquanto houver dados no localStorage.

### 4. Home/Dashboard
- Mensagem de boas-vindas e resumo do cadastro.
- Componentes principais: Hero, Trilho de Implantação, Suporte.

### 5. Módulos
- Navegação para módulos via botão ou menu.
- Progresso de implantação exibido na sidebar.

### 6. Layout e UX
- Layout split screen no onboarding (logo institucional à esquerda, formulário à direita).
- Inputs modernos, responsivos e sem ícones flutuantes.
- Cores, bordas e animações alinhadas à identidade Infoway.

### 7. Integrações
- Integração com backend Node.js/Express para cadastro e consulta de CNPJ.
- Uso de Framer Motion para animações de feedback.

---

## Como testar
1. Instale dependências: `npm install`
2. Inicie o frontend: `npm run dev`
3. Acesse o portal, realize o cadastro e navegue pelos módulos.

---

## Próximos passos sugeridos
- Personalizar dashboard e módulos conforme jornada do cliente.
- Implementar logout e edição de cadastro.
- Melhorar responsividade e acessibilidade.
- Adicionar notificações e integração com outros sistemas.

---

> Dúvidas ou sugestões? Fale com o time Infoway!
