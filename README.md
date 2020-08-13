## 1.Link do projeto
 :pushpin:  Clique [___ F A Z E R ___](https:) para acessar o webapp.


## 2. Resumo do Projeto

O objetivo do projeto foi criar uma aplicação sob demanda para um restaurante de hambúrgueres. Esse estabelecimento está em expansão e necessita de uma interface que será usada para atendimento dos clientes e gerenciamento dos pedidos. Para isso a aplicação será utilizada tanto pelos funcionários que trabalham fazendo e entregando pedidos aos clientes como por funcionários que prepararam os pedidos na cozinha. Os funcionários trabalharão utilizando um tablet, e deve haver um fluxo ordenado e eficiente entre pedidos realizados, preparados e entregues ao cliente. 

A lógica do projeto foi implementada em Javascript usando a biblioteca React e o framework Aphrodite para CCS-in-JS. Trata-se de um aplicativo web executado para ser rodado especificamente em tablets, mas que se adapta bem a dispositivos de outros tamanhos. 

Abaixo segue algumas informações importantes sobre o restaurante e que foram levadas em consideração durante o planejamento e execução do projeto:

### Ambientes do estabelecimento: 
Dois ambientes com funções diferentes:

1.Salão: funcionários recebem os clientes, anotam e entregam os seus pedidos.</br>
2.Cozinha: funcionários preparam os pedidos e sinalizam quando eles estão prontos. Os cozinheiros também desejam ter acesso a um histórico de todos os pedidos para eventuais consultas. 

### Menu do restaurante:
O restaurante possui dois menus: um com itens de ___café-da-manhã___ e outro com itens para o ___restante do dia___. 
Apesar de serem categorias diferentes, o cliente pode escolher itens das duas categorias em um mesmo pedido. Uma informação importante repassada pelo restaurante é que os clientes são bastante indecisos, sendo comum mudarem o pedido várias vezes antes de finalizar. Isso foi levado em consideração durante o desenvolvimento. 


## 3. Desenho do Produto

A interface do app foi planejada para atender as seguintes necessidades de usuário:

### 3.1 Histórias de Usuário

**Histórias de Usuário 1:** Eu como funcionário do restaurante quero entrar na plataforma e ver apenas a tela importante para o meu trabalho.</br>
**Solução:** o usuário deve se registrar no aplicativo usando e-mail e senha e especificar qual é seu local de trabalho (salão ou cozinha). A partir daí cada vez que o usuário loga ele é direcionado para o seu ambiente de trabalho. Abaixo segue uma imagem da tela de registro (esquerda) e login (direita) da versão tablet:

![Tela de registro e login](src/assets/reg-login.jpeg)


A partir do login, cada ambiente fornece acesso a páginas diferentes:
* ___Salão:___ acesso às páginas _"Salão"_ (registro dos pedidos dos clientes na comanda e envio para a cozinha) e _"Pedidos Prontos"_ (lista de pedidos já preparadas e na fila de espera para entrega). 

* ___Cozinha___ : acesso às páginas _"Cozinha"_ (lista de pedidos a serem preparados) e _"Histórico"_ (lista para consulta de todos os pedidos preparados)


**Histórias de Usuário 2:** Eu como garçom/garçonete quero poder anotar o pedido dos clientes e enviar para o preparo na cozinha.</br>
**Solução:** página "Salão" dá acesso à comanda de pedidos, onde o funcionário deve adicionar as informações do cliente (nome e mesa), dos itens e da quantidade dos itens escolhidos pelos clientes. Também pode visualizar o preço total do pedido. O pedido pronto é enviado para a cozinha quando finalizado. 


**Histórias de Usuário 3:** Eu como chefe de cozinha quero ver os pedidos dos clientes, marcar os pedidos prontos e notificar o salão para a entrega.</br>
**Solução**:  página "Cozinha" recebe de forma síncrona os novos pedidos realizados no salão, com o horário do pedido registrado. É possível ter maior controle sobre quais itens de cada pedido já foram preparados checando cada um deles. É possível também sinalizar quais pedidos da lista já estão em preparação, a fim de evitar a execução do mesmo pedido por cozinheiros diferentes, caso haja mais de um no estabelecimento. Após a finalização do preparo o cozinheiro pode marcar o pedido como __"Pedido Pronto"__, e ele será excluído da lista de pedidos pendentes para preparo que está visível na tela. Já a página "Histórico" dá acesso ao cozinheiro a todos os pedidos já finalizados, incluindo o tempo de preparo de cada um deles.


**Histórias de Usuário 4:** Eu como garçom/garçonete quero ver os pedidos que estão prontos para entregá-los rapidamente aos clientes.</br>
**Solução**:  página "Pedidos Prontos" recebe de forma síncrona os novos pedidos já preparados na cozinha. O funcionário pode marcar cada pedido como __"Pedido Entregue"__, e ele será excluído da lista de pedidos pendente para entrega visível na tela. 

### 3.2 Prototipação

Durante o planejamento do projeto nós realizamos protótipos de baixa e alta fidelidade (imagem abaixo). Ajustes em relação à concepção inicial da interface foram implementados a partir de consultas a potenciais usuários e de acordo com a nossa própria percepção, sempre com o objetivo de melhorar a usabilidade e a experiência do usuário.

![Protótipo de alta fidelidade](src/assets/prototipo-high-quality.png)

## 4. Ferramentas utilizadas
* [React](https://pt-br.reactjs.org/) - biblioteca Javascript para criar interfaces de usuário
* [Aphrodite](https://github.com/Khan/aphrodite) - framework CSS-in-JS
* [Node.js](https://nodejs.org/en/) - plataforma de desenvolvimento.
* [VSCode](https://code.visualstudio.com/) - editor de texto
* [NPM](https://www.npmjs.com/) - gerenciador de pacotes
* [Figma](https://www.figma.com/) - plataforma de prototipagem
* [Trello](https://trello.com/pt-BR) - gerenciador de projeto

## 5. Autoras
Trabalho desenvolvido durante o bootcamp de programação front-end da Laboratória (SAP004) por:
* Luana Arêdes
* Nathalia Monalisa Francisco

## 6. Créditos
* Ícones: [FlatIcon](https://www.flaticon.com/)
