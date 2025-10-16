# 📁 Imagens dos Cards - Pasta Public

## Como Usar (Método Simples)

1. **Adicione suas imagens PNG aqui** com os nomes:
   - `modulo-1.png` (Acesso ao Servidor)
   - `modulo-2.png` (Configuração Inicial)
   - `modulo-3.png` (Infodrive & Backup)
   - `modulo-4.png` (Suporte & FAQ)

2. **No arquivo `TrilhoImplantacao.jsx`**, use o caminho relativo:
   ```javascript
   imagem: '/images/trilho/modulo-1.png'
   ```

## Exemplo Completo:

```javascript
const etapas = [
  {
    id: 1,
    titulo: 'Acesso ao Servidor',
    // ... outras propriedades
    imagem: '/images/trilho/modulo-1.png'  // ✅ Caminho correto
  },
  {
    id: 2,
    titulo: 'Configuração Inicial',
    imagem: '/images/trilho/modulo-2.png'
  },
  {
    id: 3,
    titulo: 'Infodrive & Backup',
    imagem: '/images/trilho/modulo-3.png'
  },
  {
    id: 4,
    titulo: 'Suporte & FAQ',
    imagem: '/images/trilho/modulo-4.png'
  }
]
```

## ⚠️ Importante:
- A pasta `public` é servida diretamente pelo servidor
- Use `/images/...` (com barra inicial)
- Não precisa importar no código
- Mais simples e direto

## 📐 Especificações:
- **Formato**: PNG, JPG ou WebP
- **Resolução**: 1200x800px (recomendado)
- **Tamanho**: Máximo 300 KB
- **Qualidade**: 80-90%
