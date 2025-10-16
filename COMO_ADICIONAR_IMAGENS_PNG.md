# 🖼️ Como Adicionar Imagens PNG nos Cards - Guia Completo

## 📋 Duas Formas de Adicionar Imagens

---

## ✅ FORMA 1: Pasta `public` (RECOMENDADO - Mais Simples)

### Passo 1: Adicione suas imagens PNG
Coloque seus arquivos PNG na pasta:
```
public/images/trilho/
├── modulo-1.png
├── modulo-2.png
├── modulo-3.png
└── modulo-4.png
```

### Passo 2: Use o caminho relativo no código
No arquivo `src/components/TrilhoImplantacao.jsx`:

```javascript
const etapas = [
  {
    id: 1,
    titulo: 'Acesso ao Servidor',
    descricao: 'Aprenda a acessar o servidor...',
    icone: MonitorPlay,
    tempo: '5 min',
    cor: '#FF6B35',
    topicos: ['Login via navegador', 'Credenciais', 'Atalho desktop'],
    imagem: '/images/trilho/modulo-1.png' // ✅ Caminho com barra inicial
  },
  {
    id: 2,
    titulo: 'Configuração Inicial',
    descricao: 'Configure a interface virtual...',
    icone: Settings,
    tempo: '10 min',
    cor: '#FF8C42',
    topicos: ['Interface virtual', 'Navegação', 'Sistemas'],
    imagem: '/images/trilho/modulo-2.png'
  },
  {
    id: 3,
    titulo: 'Infodrive & Backup',
    descricao: 'Configure a pasta de rede...',
    icone: HardDrive,
    tempo: '8 min',
    cor: '#FFA566',
    topicos: ['Pasta de rede', 'Sincronização', 'Backup automático'],
    imagem: '/images/trilho/modulo-3.png'
  },
  {
    id: 4,
    titulo: 'Suporte & FAQ',
    descricao: 'Saiba quando e como acionar...',
    icone: HeadphonesIcon,
    tempo: '7 min',
    cor: '#FFB787',
    topicos: ['Canais de suporte', 'FAQ', 'Contatos'],
    imagem: '/images/trilho/modulo-4.png'
  }
]
```

### ✅ Vantagens:
- ✨ Mais simples (não precisa importar)
- 🚀 Melhor para imagens estáticas
- 📦 Não aumenta o bundle do JavaScript
- 🔄 Fácil de trocar imagens

---

## 🔄 FORMA 2: Pasta `src/assets` (Com Import)

### Passo 1: Adicione suas imagens PNG
Coloque seus arquivos PNG na pasta:
```
src/assets/images/trilho/
├── modulo-1.png
├── modulo-2.png
├── modulo-3.png
└── modulo-4.png
```

### Passo 2: Importe as imagens no topo do arquivo
No arquivo `src/components/TrilhoImplantacao.jsx`, adicione no início:

```javascript
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  MonitorPlay, 
  Settings, 
  HardDrive, 
  HeadphonesIcon,
  Clock,
  ArrowRight,
  CheckCircle,
  Lock,
  AlertCircle
} from 'lucide-react'
import './TrilhoImplantacao.css'
import { getAllowedModuleId } from '../utils/progress'

// ✅ Importe as imagens aqui
import imgModulo1 from '../assets/images/trilho/modulo-1.png'
import imgModulo2 from '../assets/images/trilho/modulo-2.png'
import imgModulo3 from '../assets/images/trilho/modulo-3.png'
import imgModulo4 from '../assets/images/trilho/modulo-4.png'

const etapas = [
  {
    id: 1,
    titulo: 'Acesso ao Servidor',
    // ...
    imagem: imgModulo1  // ✅ Use a variável importada
  },
  {
    id: 2,
    titulo: 'Configuração Inicial',
    // ...
    imagem: imgModulo2
  },
  {
    id: 3,
    titulo: 'Infodrive & Backup',
    // ...
    imagem: imgModulo3
  },
  {
    id: 4,
    titulo: 'Suporte & FAQ',
    // ...
    imagem: imgModulo4
  }
]
```

### ✅ Vantagens:
- 🔧 Vite otimiza automaticamente
- 📦 Gera hash no nome (cache melhor)
- ✅ Erro em build se imagem não existir
- 🎯 TypeScript friendly

---

## 🎯 QUAL ESCOLHER?

### Use **Pasta `public`** se:
- ✅ Você quer simplicidade
- ✅ Imagens podem mudar frequentemente
- ✅ Não precisa de otimização extra do Vite
- ✅ Quer caminho direto e simples

### Use **Pasta `src/assets`** se:
- ✅ Quer otimização automática do Vite
- ✅ Quer cache com hash no nome do arquivo
- ✅ Prefere TypeScript/Import
- ✅ Quer erro em build se imagem faltar

---

## 📝 EXEMPLO PRÁTICO - FORMA 1 (Recomendado)

### 1. Estrutura de Pastas:
```
public/
└── images/
    └── trilho/
        ├── modulo-1.png  ← Coloque sua imagem aqui
        ├── modulo-2.png
        ├── modulo-3.png
        └── modulo-4.png
```

### 2. Código Atualizado:
```javascript
const etapas = [
  {
    id: 1,
    titulo: 'Acesso ao Servidor',
    descricao: 'Aprenda a acessar o servidor via navegador, fazer login e configurar o atalho na área de trabalho',
    icone: MonitorPlay,
    tempo: '5 min',
    cor: '#FF6B35',
    topicos: ['Login via navegador', 'Credenciais', 'Atalho desktop'],
    imagem: '/images/trilho/modulo-1.png'  // ✅ Caminho direto
  },
  // ... outros módulos
]
```

### 3. Teste:
1. Adicione as imagens na pasta `public/images/trilho/`
2. Salve o arquivo `TrilhoImplantacao.jsx`
3. Abra `http://localhost:3001`
4. Veja as imagens nos cards! 🎉

---

## 🐛 TROUBLESHOOTING

### ❌ Imagem não aparece?

#### Se usando pasta `public`:
- Verifique se o caminho começa com `/` (barra)
- Correto: `/images/trilho/modulo-1.png`
- Errado: `images/trilho/modulo-1.png`
- Errado: `./images/trilho/modulo-1.png`

#### Se usando `src/assets`:
- Verifique se o import está correto
- Caminho relativo ao arquivo atual
- Exemplo: `'../assets/images/trilho/modulo-1.png'`

### ❌ Console mostra erro 404?
- Verifique o nome do arquivo (case-sensitive no Linux/Mac)
- `modulo-1.png` ≠ `Modulo-1.PNG`
- Verifique se o arquivo realmente existe na pasta

### ❌ Imagem está distorcida?
- Use imagens com proporção 4:3 ou 16:9
- Recomendado: 1200x800px
- O CSS já está configurado para `background-size: cover`

---

## 📐 ESPECIFICAÇÕES DAS IMAGENS

### Tamanho e Formato:
- **Formato**: PNG, JPG ou WebP
- **Resolução**: 
  - Ideal: 1200x800px (4:3)
  - Mínimo: 800x600px
  - Máximo: 1920x1080px
- **Tamanho de Arquivo**: Máximo 300 KB
- **DPI**: 72 dpi (web)

### Otimização:
Use ferramentas para comprimir:
- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **ImageOptim**: https://imageoptim.com/

### Conteúdo Visual:
- **Módulo 1**: Dashboard, login, tela de servidor
- **Módulo 2**: Interface de configuração, settings
- **Módulo 3**: Cloud, pasta de rede, backup
- **Módulo 4**: Suporte, headset, atendimento

---

## 💡 DICA RÁPIDA

Se você já tem as imagens PNG, faça assim:

1. **Crie a pasta** (se não existir):
   ```
   public/images/trilho/
   ```

2. **Copie seus PNGs** para lá com esses nomes:
   - `modulo-1.png`
   - `modulo-2.png`
   - `modulo-3.png`
   - `modulo-4.png`

3. **Edite o arquivo** `TrilhoImplantacao.jsx`:
   ```javascript
   imagem: '/images/trilho/modulo-1.png'
   imagem: '/images/trilho/modulo-2.png'
   imagem: '/images/trilho/modulo-3.png'
   imagem: '/images/trilho/modulo-4.png'
   ```

4. **Pronto!** Recarregue a página.

---

## 🎨 RESULTADO FINAL

Com as imagens PNG adicionadas, cada card terá:
- ✅ Imagem de fundo personalizada
- ✅ Gradiente overlay para legibilidade
- ✅ Zoom suave no hover
- ✅ Filtro grayscale quando bloqueado
- ✅ Visual profissional e moderno

---

**Última atualização**: Outubro 2025  
**Método recomendado**: Pasta `public` (mais simples)
