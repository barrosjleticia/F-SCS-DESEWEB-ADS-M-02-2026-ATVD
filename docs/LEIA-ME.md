# Bituca Zero — documentação técnica

## Estrutura
- `index.html`, `problema.html`, `descarte.html`, `sustentabilidade.html`, `objetivos.html`, `impacto.html`, `noticias.html`, `calculadora.html`, `educacao.html`, `participe.html`: as 10 páginas.
- `css/base.css`: só o que é global (variáveis, cabeçalho, menu, rodapé, tipografia e componentes usados por 5 ou mais páginas, além do painel de acessibilidade).
- `css/<página>.css`: tudo o que aquela página usa além do base, direto na pasta `css/` (`css/impacto.css`, `css/calculadora.css`, `css/index.css` para a home, etc.). Componentes usados por 2 a 4 páginas (ex.: `.cartao-info`) são repetidos no CSS de cada uma.
- `js/menu.js` e `js/acessibilidade.js`: menu no celular e painel de acessibilidade (preferências no `localStorage`).
- `js/calculadora.js`: cálculo educativo diário/anual.
- `js/participe.js`: validação do formulário, rascunho e histórico no `localStorage` e abertura do e-mail (`mailto:`).
- `img/`: imagens do projeto. `docs/`: documentação e equipe.

## Funcionalidades
- Navegação entre dez páginas.
- Layout responsivo e link para pular ao conteúdo.
- Calculadora: valor diário × 365.
- Formulário com validação HTML5 (`required`, `email`, `tel` com `pattern`, `date`). O rascunho e os últimos contatos (data, nome e assunto) ficam no `localStorage` do navegador; nada é enviado a servidores.
- `iframe` de vídeos na página Notícias. Pendente: `<video controls poster>` e `<audio controls>` (ainda não existem em nenhuma página).

## Observações de conteúdo
A calculadora fornece estimativas com base exclusivamente no número informado e em 365 dias. Ela não estima toxicidade, massa ou dano ambiental. Dados numéricos regionais não foram adicionados sem referência documental verificável.
