# Controle de acesso utilizando NodeMCU, RFID, MQTT e Banco de Dados MySQL

## *-- Documentação em construção --* 
Projeto com objetivo de autenticar/autorizar usuários a partir de Tags RFID utilizando Banco de Dados

![img](https://raw.githubusercontent.com/douglaszuqueto/esp8266-rfid-banco-de-dados/master/files/images/diagrama.png)

## Introdução

## Materiais utilizados

* NodeMCU;
* RFID: Rfid Mfrc522 Mifare;
* Jumpers;
* Tags RFID;
* Buzzer;
* Protoboard;

## Tecnologias utilizadas

* Firmare NodeMCU
    * rfid;
    * pubsubclient
* Back-end Nodejs
    * mqttjs
    * promise
    * request-promise
    * express
    * mysqljs
    * dotenv
* Back-end Python
    * flask
* Front-end
    * bulma
    * axios
    * mqttws31

## Fluxo do projeto

![img](https://raw.githubusercontent.com/douglaszuqueto/esp8266-rfid-banco-de-dados/master/files/images/diagrama.png)


## Como utilizar o projeto

Primeiramente deixe seu **Star** no projeto, é isto mesmo! hehe.
Segundamente, efetue o fork ou um clone do repositório.

### Organização do repositório

O repositório está organizado devido as responsabilidades que o mesmo oferece.

* client - será o front-end da aplicação web;
* database - script com a estrutura das tabelas do mysql;
* esp8266 - firmware para o nodemcu;
* server - referente ao back-end da aplicação. Neste caso terá 2 back-ends(poderá escolher 1 para seu uso);
    * nodejs
    * python

#### Firmware NodeMCU

#### Aplicação Web

#### Banco de Dados

#### Server
* NodeJS
* Python

## Endpoints

Para cada tabela de nossa aplicalção - users, tags, access_log -, teremos
uma api completa para efetuar o CRUD(create, read, update, delete) de cada recurso disponível.

* users (/api/users)
    * GET / - lista de usuários
    * GET /:id - busca de usuário por ID
    * POST / - cadastro de usuário
    * UPDATE /:id - atualização de usuário
    * DELETE /:id - remoção de usuário
* tags (/api/tags)
    * GET / - lista de tags
    * GET /:id - busca de tag por ID
    * GET /tag/:tag - busca de tag por nome
    * POST / - cadastro de tag
    * UPDATE /:id - atualização de tag
    * DELETE /:id - remoção de tag
* access_log (/api/logs)
    * GET / - lista de logs
    * GET /:id - busca de log por ID
    * POST / - cadastro de log
    * UPDATE /:id - atualização de log
    * DELETE /:id - remoção de log
    
## Usuários

## Tags

## Logs

## Testando a aplicação

## Finalizando

## Referências

**Não esqueça de acompanhar o blog :): https://douglaszuqueto.com**

