# Controle de acesso utilizando NodeMCU, RFID, MQTT e Banco de Dados MySQL

Projeto com objetivo de autenticar/autorizar usuários a partir de Tags RFID utilizando Banco de Dados

![img](https://raw.githubusercontent.com/douglaszuqueto/esp8266-rfid-banco-de-dados/master/files/images/diagrama.png)

## Introdução

## Materiais utilizados

* NodeMCU;
* RFID: Rfid Mfrc522 Mifare;
* Jumpers;
* Tags RFID;
* Buzzer;
* Protoboar;

## Tecnologias utilizadas

* Firmare NodeMCU
    * Rfid;
    * Pubsubclient
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

## Cadastro de Usuários

## Cadastro de Tags

## Testando aplicação

## Finalizando

## Referências

**Não esqueça de acompanhar o blog :): https://douglaszuqueto.com**

