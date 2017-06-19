# Controle de acesso utilizando NodeMCU, RFID, MQTT e Banco de Dados MySQL

![img](https://raw.githubusercontent.com/douglaszuqueto/esp8266-rfid-banco-de-dados/master/files/images/rfid.png)

## Introdução

Este projeto possui como objetivo autenticar/autorizar usuários a partir de Tags RFID utilizando uma **SIMPLES** integração com Banco de Dados.

O projeto visa atender uma pendência que eu já tinha com o tema em questão e também atender uma demanda de usuários da comunidade que buscam por temas do tipo. - Em 1 dia, acho que vi umas 3 pessoas procurando por algo.

Então que comecem os jogos - espero que gostem :)

## Materiais utilizados

* NodeMCU;
* RFID: Rfid Mfrc522 Mifare;
* Jumpers;
* Tags RFID;
* Buzzer;
* Protoboard;

## Tecnologias utilizadas(bibliotecas, frameworks)

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

![img](https://raw.githubusercontent.com/douglaszuqueto/esp8266-rfid-banco-de-dados/master/files/images/rfid.png)

No diagrama acima, pode-se observar qual será o fluxo da aplicação que foi desenvolvida. Parece complicado, mas quando você começa entender como se da a comunicação de redes, você tira de letra uma arquitetura dessas.

Basicamente temos 2 fluxos neste projeto - o **ping** e o **pong**. Ambos serão abordados abaixo.

### Ping

O fluxo referente ao **PING**, é o fluxo inicial da comunicação. É a partir dele que toda comunicação começara. Veja a imagem referente abaixo:

![img](https://raw.githubusercontent.com/douglaszuqueto/esp8266-rfid-banco-de-dados/master/files/images/rfid-ping.png)


Basicamente as etapas abaixo serão feitas:

* 1º - Leitura do ID da tag rfid;
* 2º - Preparação da (payload)mensagem para envio;
* 3º - Envio da payload através do **protocolo MQTT**;
* 3º - O serviço do back-end estará na escuta do tópico referente;
* 4º - Recebida a payload(basicamente é o ID da tag), será efetuada uma consulta em nosso banco de dados;
* 5º - Depois da tag ser consultada, será feito uma verificação(condicional) se a mesma está **ativada** ou **desativada**;

... segue no próximo tópico


### Pong

O **PONG** será responsável pelo retorno, ou seja, se a tag lida está ativa/bloqueada ou simplesmente não existe. O resultado será um simples retorno booleano - **0 ou 1**. Veja como ficou o fluxo na imagem abaixo:

![img](https://raw.githubusercontent.com/douglaszuqueto/esp8266-rfid-banco-de-dados/master/files/images/rfid-pong.png)


Portanto, continuando com o fluxo da aplicação, será dado continuidade de acordo com o **5º passo** abordado no tópico acima.

* 6º - Tendo nosso retorno(resposta da leitura) em 'mãos', a mensagem(0 ou 1) será publicada no tópico referente;
* 7º - O embarcado, por sua vez, estará assinando o tópico. Portanto, logo será recebida a mensagem e tratada no **callback**;
* 8º - ... neste passo fica a liberdade de vocês implementarem a ação/feedback que será tomado. Eu simplesmente printei no monitor serial o status do retorno. Segue abaixo  uma lista de ações e/ou feedbacks que podem ser tomados.
    * Feedbacks
        * Ligar um Led (vermelho/verde) de acordo com status recebido;
        * Mostrar alguma mensagem, bem como o nome da pessoa autenticada em um display;
    * Ações
        * Abrir uma porta;
        * Acionar um rele e realizar alguma ação;
        
## Como utilizar o projeto

* 1º - Não possui conta no Gihub? Então crie já a sua e comece partilhar seus projetos :) (opcional);
* 2º - Não deixe de me seguir no Github :p (opcional)
* 3º - Gostou do projeto? Deixe já seu **Star**;
* 4º - Enfim - clone o projeto ou realize o download neste [link](https://github.com/douglaszuqueto/esp8266-rfid-banco-de-dados/archive/master.zip) :).

## Organização do repositório

O repositório está organizado devido as responsabilidades que o mesmo oferece.

* client - será o front-end da aplicação web;
* database - script com a estrutura das tabelas do mysql;
* esp8266 - firmware para o nodemcu;
* server - referente ao back-end da aplicação. Neste caso terá 2 back-ends(poderá escolher 1 para seu uso);
    * nodejs
    * python *(em desenvolvimento)*

### Firmware NodeMCU

O firmware como dito, está localizado dentro da pasta *esp8266*, portanto, abra-o com a IDE do Arduino.

**OBS:** Lembre-se que você precisa ter 2 bibliotecas instaladas, ambas foram citadas no tópico *Tecnologias utilizadas*

Tendo o firmware já aberto, você terá que efetuar a mudança de algumas variáveis ao seu escopo. Como rede wifi, broker, tópicos.

Portanto se atente as seguintes variáveis:

```
SSID - nome de sua rede wifi
PASSWORD - senha de sua rede wifi
BROKER_MQTT - url do broker mqtt
BROKER_PORT - porta do broker mqtt
TOPIC_PING - topico utilizado para publicar o valor tag rfid
TOPIC_PONG - topico responsavel por receber o status da autenticação rfid
```

**OBS²** Um adendo ao broker utilizado. Este broker eu tenho implementado em minha VPS para uso pessoal. 
Você poderá utilizar, porém não garanto uma estabilidade 100% visto que toda hora estou testando algo novo :P.
A dica é ter seu próprio broker mosquitto em casa ou em alguma VPS.

#### Esquemático de ligação - RFID + NodeMCU

![img](https://raw.githubusercontent.com/douglaszuqueto/esp8266-rfid-banco-de-dados/master/files/images/nodemcu-rfid.png)

Com todo circuito do embarcado pronto, agora é só realizar o upload para placa e ficar de olho no monitor serial. Veja se está tudo Ok. 
Caso estiver, você esta apto a testar suas tags RFID para ver se realmente está tudo certo no que tange o Embarcado. Agora vamos para o próximo tópico.

### Aplicação Web

A aplicação web - localizada na pasta **client**, é 100% html, então não precisa de nada extraordinário para você rodar. Pode até abrir diretamente com o Browser.

Deixo abaixo algumas dicas para ter um ambiente de teste/desenvolvimento mais agradável.

* Uso do Caddy Server(o que venho utilizando até o momento);
* Uso do Nginx;
* Uso do Apache;
* http-server (modulo para nodejs);

Na parte da aplicação web, temos que realizar apenas 2 mudanças. 
Basicamente é a URL da API e também a URL do Broker.

Todas url's estão no arquivo **app.js**, localizado em **assets/js/app.js**.

```
const apiPath = 'http://127.0.0.1:3000/api'; // caso esteja em localhost, pode deixar assim mesmo.

const mqttConfig = {
    broker: 'broker.iot-br.com', // url do broker
    topic: '/empresas/douglaszuqueto/catraca/entrada/ping', // topico ouvinte
    port: 8083 // porta referente ao WebSockets do Broker
};

```

### Banco de Dados

O banco de dados será o MySQL(resolvi escolher ele, pois é um dos mais conhecidos, logo grande parte das pessoas já passaram por ele :P).

O nome que atribui ao banco de dados é **rfid**, caso queira poderá escolher outro nome sem problemas.
 A estrutura do banco, está dentro do arquivo **database/database.sql**.
 
 Basicamente não tem mistério algum, somente crie a estrutura de acordo com o arquivo :).

### Server

Entrando na parte do back-end, como já deve ter percebido, você terá 2 alternativas. Em Python ou em NodeJS.

Até o momento(05/06/2017), foi desenvolvido apenas em nodejs, assim que der, criarei um utilizando python com Flask.

#### NodeJS

Para começar, nada mais justo do que ter o NodeJS instalado, concorda? Para isso, entre no [site oficial](https://nodejs.org) e faça a instalação de acordo com seu Sistema Operacional. 

Num segundo momento, navegue até a pasta referente ao nodejs: **server/nodejs**.

Estando na pasta, você deverá efetuar alguns procedimentos iniciais, como instalar as dependências do projeto bem como configurar o acesso ao banco de dados, dentre outras configurações.

##### Instalando as dependências
 
Como gerenciador de dependências utilizei o [Yarn](https://yarnpkg.com/pt-BR/docs/install), caso ainda não o tenha, no link da citação terá os passos necessários.

Depois de instalado, basta rodar o comando **yarn**.

##### Configurando o arquivo .env

Para centralizar de uma forma bacana as variáveis de nosso ambiente, eu utilizei o **dotenv** para este fim.

Perceberás que na raiz do projeto, possui um arquivo **.env.example**, faça uma cópia dando o nome de **.env**.
Você verá esta estrutura:

```
APP_URL=http://127.0.0.1:3000/ // url base do webservice

DB_HOST=127.0.0.1 // ip/host do Mysql
DB_DATABASE=rfid // nome dado ao banco de dados
DB_USER=rfid // usuário do banco de dados
DB_PASS=rfid // senha do banco de dados

BROKER_HOST=broker.iot-br.com // ip/host do broker
BROKER_PORT=1883 // porta do broker mqtt
```

Depois de configurado, já está tudo pronto para subir nosso webservice.

Para isso, apenas rode o comando **yarn prod**(um alias do comando **node index**)

Se deu tudo certo, você terá acesso ao webservice rodando na url **127.0.0.1:3000/api**. No tópico **Endpoints**, será tratado de caso recurso disponível.

#### Python (em desenvolvimento)

## Endpoints

Para cada tabela de nossa aplicação - users, tags, access_log -, teremos
uma api para efetuar o CRUD(create, read, update, delete) de cada recurso disponível.

Portanto, para cada recurso, você poderá realizar uma requisição no seguinte formato:

```
MÉTODO - URL - RECURSO

GET http://127.0.0.1:3000/api/tags

Neste simples caso, irá retornar todas tags cadastradas no sistema :)
```

### Lista dos endpoints

* **users (/api/users)**
    * GET / - lista de usuários
    * GET /:id - busca de usuário por ID
    * POST / - cadastro de usuário
    * UPDATE /:id - atualização de usuário
    * DELETE /:id - remoção de usuário
* **tags (/api/tags)**
    * GET / - lista de tags
    * GET /:id - busca de tag por ID
    * GET /tag/:tag - busca de tag por nome
    * POST / - cadastro de tag
    * UPDATE /:id - atualização de tag
    * DELETE /:id - remoção de tag
* **access_log (/api/logs)**
    * GET / - lista de logs
    * GET /:id - busca de log por ID
    * POST / - cadastro de log
    * UPDATE /:id - atualização de log
    * DELETE /:id - remoção de log
    
    
## Páginas da aplicação web

### Home

![img](https://raw.githubusercontent.com/douglaszuqueto/esp8266-rfid-banco-de-dados/master/files/images/prints/rfid-home.png)

### Usuários

![img](https://raw.githubusercontent.com/douglaszuqueto/esp8266-rfid-banco-de-dados/master/files/images/prints/rfid-users.png)

### Tags

![img](https://raw.githubusercontent.com/douglaszuqueto/esp8266-rfid-banco-de-dados/master/files/images/prints/rfid-tags.png)

### Logs

![img](https://raw.githubusercontent.com/douglaszuqueto/esp8266-rfid-banco-de-dados/master/files/images/prints/rfid-logs.png)

## Testando o projeto

Com todo ambiente pronto, pode-se começar os testes. Para isto, tenha em mão o ID de suas tags.

Logo em seguida, você deverá cadastrar no sistema, e caso, assim como eu que só tenho duas, eu deixei uma tag ativa e outra desativada. Assim
 simulando um ambiente onde uma tag será autenticada e outra será negada.

## Finalizando

Bueno galera, por enquanto era isso, creio que consegui atingir meu objetivo onde o mesmo era demonstrar
de forma simples como seria uma Autenticação de Tags RFID com banco de dados. Fui um pouco além criando webservice e etc, mas ficou um ecossistema bem bacana.

Como deu para ver, este projeto é o básico do básico. Não possui nenhuma camada de autenticação de usuários, criptografia, ou seja - segurança em geral.

Outro ponto que já me perguntaram era sobre o cadastro automático da tag através do embarcado, leds, lcd e etc - logo de fato foquei no real objetivo.
 
Pretendo fazer um projeto mais completo caso haja um certo interesse por parte da comunidade,
confesso que foi um projeto bem bacana de desenvolver, mesmo com toda 'simplicidade' envolvida.

Vou ficando por aqui, qualquer feedback, dúvida - já sabem onde me encontrar. Então se curtiu realmente o projeto, não deixe de deixar aquele Star no repositório :). É muito importante para avaliar qual foi o grau de contribuição que o mesmo causou.

## Referências

* [Controle de acesso com NodeMCU + RFID](https://jualabs.wordpress.com/2016/09/26/controle-de-acesso-com-nodemcu-rfid/);

**Não esqueça de acompanhar o blog :): https://douglaszuqueto.com**

## Gostou do projeto?

Caso tenha gostado deste e de outros projetos que mantenho, no dia 18/06/2017 abri uma campanha de financiamento recorrente com o objetivo de captar recursos para uma dedicação fulltime em projetos open source.
 
Portanto, caso deseja me ajudar, fica aqui o [link do meu Apoia.se](https://apoia.se/douglaszuqueto). Desde já, muito obrigado :D.
