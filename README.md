# Sistema de Estacionamento 🅿️

Este é um projeto de sistema de estacionamento desenvolvido utilizando HTML, Bootstrap, JavaScript e Node.js. O sistema permite o cadastro, consulta e remoção de veículos estacionados, utilizando arquivos JSON para armazenamento dos dados.

## Funcionalidades ⚙️

- Cadastro de veículos
- CheckOut de Veículos
- Base dos clientes cadastrados
- Comprovantes
- Edição de preços do estacionamento
- Interface responsiva utilizando Bootstrap
- Backend em Node.js com armazenamento em arquivos JSON

## Tecnologias Utilizadas

- **HTML**: Estruturação das páginas web.
- **Bootstrap**: Estilização e responsividade das páginas.
- **JavaScript**: Lógica de front-end e manipulação do DOM.
- **Node.js**: Servidor backend.
- **JSON**: Armazenamento dos dados dos veículos.

## Classes

### Cadastro de Veículos 📜
Esta classe permite cadastrar os veículos no sistema. Informações como nome do proprietário, telefone, modelo do veículo, tipo de veículo e placa serão coletados nesta etapa. Logo após, os dados serão tratados e formatados para objeto JSON que é passado ao servidor que realiza o salvamento no arquivo `cadastros.json`.

### CheckOut de Veículos ✔️
Esta classe permite realizar o check out dos veículos. Assim que a página é aberta, os dados são carregados via servidor Node.js do arquivo JSON contendo os dados. Nesta etapa serão coletados somente hora de entrada e hora de saída para calcular o tempo que o veículo permaneceu no estacionamento. Os dados serão salvos em um JSON chamado `comprovantes.json`.

### Clientes Cadastrados 🧑‍🦱
Esta funcionalidade permite listar e excluir cadastros dos clientes.

### Comprovantes 📜
Após gerar o check out do cliente, as informações podem ser acessadas através desta funcionalidade que também permite gerar um PDF das informações.

### Edição de Preços do Estacionamento 💰
Esta funcionalidade tem métodos para alterar `Preços por hora` e `Preço fixo` do estacionamento.

### Home 🏠
Representa a página inicial do sistema com informações sobre disponibilidade de vagas, preços do estacionamento e quantidade de clientes.
