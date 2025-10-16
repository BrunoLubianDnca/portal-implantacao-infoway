# 📁 Pasta de Imagens dos Cards

## Instruções

Esta pasta foi criada para você adicionar suas imagens personalizadas dos módulos.

### Como usar:

1. **Adicione suas imagens aqui** com os seguintes nomes:
   - `modulo-1-acesso.jpg` (ou .png, .webp)
   - `modulo-2-config.jpg`
   - `modulo-3-infodrive.jpg`
   - `modulo-4-suporte.jpg`

2. **Importe no componente** `TrilhoImplantacao.jsx`:
   ```javascript
   import img1 from '../assets/images/trilho/modulo-1-acesso.jpg'
   import img2 from '../assets/images/trilho/modulo-2-config.jpg'
   import img3 from '../assets/images/trilho/modulo-3-infodrive.jpg'
   import img4 from '../assets/images/trilho/modulo-4-suporte.jpg'
   ```

3. **Substitua as URLs** pelas variáveis importadas:
   ```javascript
   imagem: img1  // ao invés de URL
   ```

### Especificações:
- **Resolução**: 1200x800px (recomendado)
- **Formato**: JPG, PNG ou WebP
- **Tamanho**: Máximo 300 KB por imagem
- **Qualidade**: 80-90%

Veja o arquivo `IMAGENS_CARDS.md` na raiz do projeto para mais detalhes.
