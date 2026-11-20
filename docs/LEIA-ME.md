# Bituca Zero — documentação técnica

## Estrutura
- `index.html`, `problema.html`, `descarte.html`, `sustentabilidade.html`, `objetivos.html`, `impacto.html`, `noticias.html`, `calculadora.html`, `educacao.html`, `participe.html`: as 10 páginas.
- `css/base.css`: só o que é global (variáveis, cabeçalho, menu, rodapé, tipografia e componentes usados por 5 ou mais páginas, além do painel de acessibilidade).
- `css/<página>.css`: tudo o que aquela página usa além do base, direto na pasta `css/` (`css/impacto.css`, `css/calculadora.css`, `css/index.css` para a home, etc.). Componentes usados por 2 a 4 páginas (ex.: `.cartao-info`) são repetidos no CSS de cada uma.
- `js/menu.js` e `js/acessibilidade.js`: menu no celular e painel de acessibilidade (preferências no `localStorage`).
- `js/calculadora.js`: cálculo educativo diário/anual.
- `js/participe.js`: validação do formulário, rascunho e histórico no `localStorage` e abertura do e-mail (`mailto:`).
- `img/`: imagens do projeto. `docs/`: documentação e equipe.

## Como executar
Abra `index.html` (na raiz) em um navegador. Para testes locais mais próximos de uma hospedagem, use a extensão Live Server do Visual Studio Code.

## Funcionalidades
- Navegação entre dez páginas.
- Layout responsivo e link para pular ao conteúdo.
- Calculadora: valor diário × 365.
- Formulário com validação HTML5 (`required`, `email`, `tel` com `pattern`, `date`). O rascunho e os últimos contatos (data, nome e assunto) ficam no `localStorage` do navegador; nada é enviado a servidores.
- `iframe` de vídeos na página Notícias. Pendente: `<video controls poster>` e `<audio controls>` (ainda não existem em nenhuma página).

## Antes de publicar
1. Trocar o vídeo e o áudio de demonstração por materiais ambientais originais ou licenciados.
2. Revisar links e atualizar a página Notícias com reportagens reais, data, veículo e link direto.
3. Verificar se os pontos de coleta citados existem e estão ativos; não há ponto de coleta confirmado nesta versão.
4. Configurar serviço de backend caso o formulário precise enviar mensagens. Publicar uma política de privacidade e informar finalidade, base legal e retenção antes de coletar dados.
5. Validar as páginas no W3C Nu HTML Checker e testar teclado, leitor de tela e dispositivos móveis.
6. Configurar o projeto no Railway e verificar custos/limites vigentes diretamente na plataforma.

## Observações de conteúdo
A calculadora fornece estimativas com base exclusivamente no número informado e em 365 dias. Ela não estima toxicidade, massa ou dano ambiental. Dados numéricos regionais não foram adicionados sem referência documental verificável.
