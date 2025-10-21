# Google Analytics 4 - Configuração

## ✅ **Status: CONFIGURADO**

O Google Analytics 4 já está **totalmente configurado** com sua tag `G-YVKZVJ6MQW`!

### **Como Foi Configurado**

#### **1. Tag do Google Adicionada**
A tag foi inserida no `index.html` conforme recomendado pelo Google:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YVKZVJ6MQW"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-YVKZVJ6MQW');
</script>
```

#### **2. Eventos Customizados Implementados**
- **Visualização de módulo**: Quando entra em `/modulo/:id`
- **Conclusão de módulo**: Quando completa via checklist
- **Conclusão via botão**: Botão "Concluir e Avançar"
- **Navegação automática**: Page views rastreadas pelo GA4

### **Eventos Rastreáveis**

#### Eventos Automáticos (GA4 Padrão)
- **Visualização de página**: Todas as navegações
- **Tempo de engajamento**: Quanto tempo passa em cada página
- **Bounce rate**: Taxa de abandono

#### Eventos Customizados
```javascript
// Quando entra em um módulo
gtag('event', 'visualizar_modulo', {
  modulo_id: '1',
  page_title: 'Módulo 1'
})

// Quando conclui um módulo
gtag('event', 'concluir_modulo', {
  modulo_id: '1',
  metodo: 'checklist'
})

// Quando usa o botão rápido
gtag('event', 'concluir_modulo_via_botao', {
  modulo_id: '1'
})
```

### **Como Visualizar os Dados**

1. **Acesse** [Google Analytics](https://analytics.google.com/)
2. **Selecione sua propriedade** com ID `G-YVKZVJ6MQW`
3. **Vá para Reports**:
   - **Realtime** → Veja visitantes ativos agora
   - **Engagement** → **Events** → Veja eventos customizados
   - **Engagement** → **Pages and screens** → Veja navegação

### **Dados Disponíveis Agora**

- ✅ **Visualizações por módulo**
- ✅ **Tempo médio de engajamento**
- ✅ **Taxa de conclusão** (através de funis)
- ✅ **Abandono por página**
- ✅ **Dispositivos e navegadores**
- ✅ **Origem do tráfego**
- ✅ **Eventos de interação**

## 🎯 **Próximos Passos**

1. **Teste a aplicação** - navegue pelos módulos
2. **Verifique no GA4** se os dados estão chegando
3. **Crie dashboards customizados** para acompanhar métricas importantes
4. **Configure alertas** para acompanhar engajamento

## 📊 **Métricas-Chave para Acompanhar**

- **Sessões por módulo**: Popularidade de cada módulo
- **Tempo médio por módulo**: Dificuldade/engajamento
- **Taxa de conclusão**: Efetividade do conteúdo
- **Eventos de conclusão**: Como os usuários completam

---

**Configuração concluída com sucesso!** 🎉

---

## 🔧 **Configuração de Ambiente**

### **Variáveis de Ambiente**

Para o correto funcionamento da API, configure as seguintes variáveis:

#### **Arquivo `.env.development`** (Desenvolvimento Local)
```bash
VITE_API_URL=http://localhost:3001
```

#### **Arquivo `.env.production`** (Produção)
```bash
VITE_API_URL=https://portal-implantacao-infoway.onrender.com
```

#### **No Vercel** (Dashboard)
1. Vá em **Project Settings** → **Environment Variables**
2. Adicione: `VITE_API_URL=https://portal-implantacao-infoway.onrender.com`

### **Arquivos de Configuração**
- `.env.example` - Template das variáveis necessárias
- `.env.development` - Configuração para desenvolvimento
- `.env.production` - Configuração para produção