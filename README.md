# API-Products-Orders
# Passos para instalar a aplicação

# Requesitos
1 - Ter o Docker instalado
2 - No diretorio raiz acompanha um arquivo JSON do Insomnia para importa com as rotas da API

# No diretorio raiz
1 - docker-compose up
* Para subir o banco MySql

# Dentro do diretorio BACKEND
1 - npm install 

2 - Se necessario rodar o comando : npx knex migrate:latest
* Para executar as migrations do banco de dados

3 - npm run dev 


# Dentro do diretorio FRONTEND

1 - Npm install

2 - npm start

# O que não tive tempo de terminar

1 - Paginação dos Pedidos

# O que deveria fazer mas não tive tempo

1 - Login com JWT (token) esta fixo o ID de cliente 1, sendo passado nos Headers das requisições

2 - Tabela de Estoque. Não estou deduzindo se há ou não quantidade de produtos para cadastro

3 - Validaçoe dos campos de Edicao e Exclusao dos produtos

4 - Insira o preço do produto no seguinte formato, Ex: 10.00. Não tive tempo de validar, usar mascaras etc

5 - Um layout decente e revisar a responsividade 



