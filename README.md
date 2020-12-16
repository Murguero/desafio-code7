## Sobre o desafio 
O desafio proposto tem como finalidade desenvolver um pequeno cadastro de dívidas onde é possível incluir, editar e excluir uma dívida. Além disso, para seleção de usuários foi utilizada a API Fake https://jsonplaceholder.typicode.com/users.

#### Executando
Após realizar o clone ou o fork do projeto você deve navegar até a pasta criada e executar o comando ``` yarn ``` no seu terminal para instalar todas as dependências. Após, abra no Visual Studio Code para verificar o código fonte.

Para iniciar o aplicativo execute o comando ``` yarn start ``` dentro da pasta criada.

#### TDD
Para executar o cenário de teste você deve navegar até a pasta criada e executar o comando ``` yarn test ```.

#### Utilizando uma fake API
Para que você tenha os dados para exibir em tela e possa realizar as funcionalidades da aplicação, foi criado um arquivo que você poderá utilizar como fake API.

Foi instalado no seu package.json uma dependência chamada json-server, e um arquivo chamado server.json que contém os dados para uma rota **/bill**. Para executar esse servidor e disponibilizar os dados você pode executar o seguinte comando:
``` yarn json-server server.json -p 3333 ```

#### Funcionalidades da aplicação
A seguir é relatado um pouco sobre o funcionamento de cada rota.

- Listar as dívidas da API: Para isto é disponibilizada uma rota da seguinte maneira **GET /bill**.

- Adicionar dívida a API: Para adicionar uma nova dívida, deve-se seguir a seguinte rota **POST /bill ** com o seguinte JSON body:

```
  "id": 1,
  "id_user": 7,
  "name_user": "Kurtis Weissnat",
  "motivo": "Divida cartão de credito",
  "valor": "R$500,00",
  "data": "11/12/2020"
```

- Editar dívidas da sua API: Para editar uma dívida pode-se utilizar a seguinte rota **PUT /bill/:id** juntamente com o JSON body conforme exemplo apresentado anteriormente.

- Remover dívidas da sua API: Para remover a dívida pode-se utilizar a seguinte rota **DELETE /bill/:id**.
    
## Tecnologias

#### Frontend
- reactjs
- typeScript
- axios
- react-router-dom
- react-select
- styled-components
- axios-mockadapter
- jest
- eslint
- prettier
- jest-environment-jsdom-sixteen

## Meta
Ronaldo Tadeu Murguero Junior - murguero.ronaldo@gmail.com
