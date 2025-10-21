# 📥 Materiais para Download

Esta pasta contém os materiais complementares disponíveis para download no portal.

## Estrutura de Arquivos

```
downloads/
├── modulo-1/
│   ├── guia-acesso.pdf
│   └── checklist-configuracao.pdf
├── modulo-2/
│   ├── mapa-interface.pdf
│   └── lista-sistemas.pdf
├── modulo-3/
│   ├── guia-infodrive.pdf
│   └── solucao-problemas.pdf
└── modulo-4/
    ├── guia-suporte.pdf
    └── contatos-infoway.pdf
```

## Como Adicionar Novos Materiais

1. Coloque o PDF na pasta do módulo correspondente
2. Atualize o array `materiais` em `ModulePage.jsx`
3. Adicione os metadados: nome, descrição, tamanho, tipo

## Convenções

- **Nome do arquivo**: lowercase com hífen (ex: `guia-acesso.pdf`)
- **Tamanho**: Sempre informar em KB ou MB
- **Tipos**: `pdf`, `doc`, `xls`, `zip`
