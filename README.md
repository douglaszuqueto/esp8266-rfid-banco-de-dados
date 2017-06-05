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
    * [rfid](https://github.com/miguelbalboa/rfid/);
    * [pubsubclient](https://github.com/knolleary/pubsubclient);
* Back-end Nodejs
    * [mqttjs](https://github.com/mqttjs/MQTT.js);
    * [promise](https://github.com/then/promise);
    * [request-promise](https://github.com/request/request-promise);
    * [express](https://github.com/expressjs/express);
    * [mysqljs](https://github.com/mysqljs/mysql);
    * [dotenv](https://github.com/motdotla/dotenv);
* Back-end Python
    * [flask](https://github.com/pallets/flask);
* Front-end
    * [bulma](https://github.com/jgthms/bulma);
    * [axios](https://github.com/mzabriskie/axios);
    * [mqttws31](https://github.com/eclipse/paho.mqtt.javascript);

## Fluxo do projeto

![img](https://raw.githubusercontent.com/douglaszuqueto/esp8266-rfid-banco-de-dados/master/files/images/diagrama.png)


## Como utilizar o projeto

* 1º - Não possui conta no Gihub? Então crie já a sua e começe partilhar seus projetos :) (opcional);
* 2º - Não deixe de me seguir no Github :p (opcional)
* 3º - Gostou do projeto? Deixe já seu **Star**;
* 4º - Enfim - clone o projeto ou realize o download neste [link](https://github.com/douglaszuqueto/esp8266-rfid-banco-de-dados/archive/master.zip) :).

### Organização do repositório

O repositório está organizado devido as responsabilidades que o mesmo oferece.

* client - será o front-end da aplicação web;
* database - script com a estrutura das tabelas do mysql;
* esp8266 - firmware para o nodemcu;
* server - referente ao back-end da aplicação. Neste caso terá 2 back-ends(poderá escolher 1 para seu uso);
    * nodejs
    * python *(em desenvolvimento)*

#### Firmware NodeMCU

#### Aplicação Web

#### Banco de Dados

#### Server

* NodeJS
* Python (em desenvolvimento)

## Endpoints

Para cada tabela de nossa aplicalção - users, tags, access_log -, teremos
uma api para efetuar o CRUD(create, read, update, delete) de cada recurso disponível.

Portanto, para cada recurso, você poderá realizar uma requisição no seguinte formato:

```
MÉTODO - URL - RECURSO

GET http://127.0.0.1/api/tags

Neste simples caso, irá retornar todas tags cadastradas no sistema :)
```

### Lista dos endpoints

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

