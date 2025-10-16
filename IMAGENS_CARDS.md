# 🖼️ Guia de Imagens dos Cards - Trilho de Implantação

## 📋 Como Substituir as Imagens

As imagens dos cards estão configuradas no arquivo:
```
src/components/TrilhoImplantacao.jsx
```

## 🎨 Imagens Atuais (Placeholder)

### Módulo 1: Acesso ao Servidor
- **URL Atual**: `https://prnt.sc/VMyJstPVaXYb`
- **Tema**: Dashboard/Login/Monitor
- **Sugestão**: Imagem de tela de login ou dashboard de servidor

### Módulo 2: Configuração Inicial
- **URL Atual**: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80`
- **Tema**: Settings/Configuração/Engrenagens
- **Sugestão**: Interface de configuração ou painel de controle

### Módulo 3: Infodrive & Backup
- **URL Atual**: `https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80`
- **Tema**: Cloud/Storage/Backup
- **Sugestão**: Nuvem, pasta de rede ou armazenamento

### Módulo 4: Suporte & FAQ
- **URL Atual**: `https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&q=80`
- **Tema**: Support/Headset/Atendimento
- **Sugestão**: Pessoa com headset ou suporte técnico

---

## 📐 Especificações Técnicas

### Dimensões Recomendadas
- **Largura**: Mínimo 800px (recomendado 1200px)
- **Altura**: Mínimo 600px (recomendado 800px)
- **Aspect Ratio**: 4:3 ou 16:9
- **Formato**: JPG, PNG ou WebP

### Otimização
- **Qualidade**: 80-90% (balanço entre qualidade e tamanho)
- **Tamanho máximo**: 200-300 KB por imagem
- **Compressão**: Usar TinyPNG, ImageOptim ou similar

### Estilo Visual
- **Tom**: Profissional, tecnológico, clean
- **Cores**: Preferencialmente tons neutros ou que harmonizem com o laranja (#FF6B35)
- **Contraste**: Alto contraste para garantir legibilidade do texto sobre a imagem

---

## 🔧 Como Substituir as Imagens

### Opção 1: URLs Externas (Atual)
Edite o arquivo `src/components/TrilhoImplantacao.jsx`:

```javascript
const etapas = [
  {
    id: 1,
    titulo: 'Acesso ao Servidor',
    // ... outras propriedades
    imagem: 'SUA_URL_AQUI' // Substitua aqui
  },
  // ... outros módulos
]
```

### Opção 2: Imagens Locais (Recomendado para Produção)

1. **Criar pasta de imagens**:
```
src/assets/images/trilho/
```

2. **Adicionar suas imagens**:
```
src/assets/images/trilho/modulo-1-acesso.jpg
src/assets/images/trilho/modulo-2-config.jpg
src/assets/images/trilho/modulo-3-infodrive.jpg
src/assets/images/trilho/modulo-4-suporte.jpg
```

3. **Importar no componente**:
```javascript
// No topo do arquivo TrilhoImplantacao.jsx
import imgModulo1 from '../assets/images/trilho/modulo-1-acesso.jpg'
import imgModulo2 from '../assets/images/trilho/modulo-2-config.jpg'
import imgModulo3 from '../assets/images/trilho/modulo-3-infodrive.jpg'
import imgModulo4 from '../assets/images/trilho/modulo-4-suporte.jpg'

// Nas configurações das etapas
const etapas = [
  {
    id: 1,
    titulo: 'Acesso ao Servidor',
    // ...
    imagem: imgModulo1
  },
  // ...
]
```

### Opção 3: Servidor Próprio
Se hospedar imagens no seu servidor:

```javascript
imagem: 'https://seu-servidor.com.br/images/trilho/modulo-1.jpg'
```

---

## 🎨 Efeitos Visuais Aplicados

### Gradiente Overlay
As imagens têm um gradiente automático aplicado:
- **Início**: Preto transparente (15% opacity) no topo
- **Meio**: Branco semi-transparente (80% opacity)
- **Fim**: Branco sólido (100% opacity) no fundo

Isso garante que o texto sempre seja legível.

### Hover Effect
- **Zoom**: Imagem aumenta 5% ao passar o mouse
- **Transição**: Suave (0.5s ease)

### Estado Bloqueado
- **Filtro**: Grayscale (70%) + Brightness (90%)
- Deixa a imagem desbotada para indicar que está bloqueada

---

## 🌐 Fontes de Imagens Gratuitas

Se precisar buscar outras imagens:

### Sites Recomendados
1. **Unsplash** (https://unsplash.com)
   - Licença: Gratuita para uso comercial
   - Qualidade: Alta
   - Buscar: "dashboard", "server", "cloud storage", "support"

2. **Pexels** (https://pexels.com)
   - Licença: Gratuita
   - Qualidade: Alta
   - Buscar: "technology", "computer", "data center"

3. **Freepik** (https://freepik.com)
   - Licença: Gratuita com atribuição (Premium sem atribuição)
   - Qualidade: Média-Alta
   - Buscar: "server illustration", "cloud computing"

### Termos de Busca Recomendados
- **Módulo 1**: "login screen", "dashboard interface", "server access"
- **Módulo 2**: "settings interface", "configuration panel", "control panel"
- **Módulo 3**: "cloud storage", "backup system", "network drive", "data sync"
- **Módulo 4**: "customer support", "help desk", "technical support", "headset"

---

## 🎯 Boas Práticas

### ✅ Fazer
- Usar imagens de alta qualidade
- Comprimir antes de usar
- Manter consistência visual entre os cards
- Testar em diferentes dispositivos

### ❌ Evitar
- Imagens muito escuras (dificulta leitura)
- Imagens muito ocupadas (distrai do conteúdo)
- Tamanhos muito grandes (impacta performance)
- Misturar estilos muito diferentes

---

## 📱 Responsividade

As imagens se adaptam automaticamente:
- **Desktop**: 180px de altura
- **Mobile**: Mesma altura, mas redimensiona proporcionalmente

O gradiente overlay garante legibilidade em todos os tamanhos.

---

## 🐛 Troubleshooting

### Imagem não aparece?
1. Verifique se a URL está correta
2. Teste a URL no navegador
3. Verifique o console do navegador (F12) para erros CORS

### Imagem carrega devagar?
1. Comprima a imagem (use TinyPNG)
2. Considere usar WebP ao invés de JPG/PNG
3. Implemente lazy loading se necessário

### Texto não está legível?
1. Ajuste o gradiente overlay em `TrilhoImplantacao.css`
2. Considere usar imagem mais clara
3. Aumente a opacidade do overlay

---

## 💡 Dica Final

Para uma experiência premium, considere:
- Criar imagens personalizadas com a identidade visual da Infoway
- Usar screenshots reais dos sistemas
- Adicionar o logo da Infoway de forma sutil nas imagens
- Usar a paleta de cores da marca (#FF6B35)

---

**Última atualização**: Outubro 2025  
**Arquivo relacionado**: `src/components/TrilhoImplantacao.jsx`
