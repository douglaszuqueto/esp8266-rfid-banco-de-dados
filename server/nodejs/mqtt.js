const mqtt = require('mqtt')
    , request = require('request-promise')
    , config = require('./config/config');

const client = mqtt.connect(`mqtt://${config.broker.host}`);

const rfidPingTopic = '/empresas/douglaszuqueto/catraca/entrada/ping';
const rfidPongTopic = '/empresas/douglaszuqueto/catraca/entrada/pong';

client.on('connect', () => {
    console.log(`Connection successfully to ${config.broker.host}`);
    client.subscribe(rfidPingTopic);
});

client.on('message', (topic, message) => {
    const tag = message.toString();

    authorizeRfid(topic, tag);
});

const authorizeRfid = (topic, tag) => {
    if (rfidPingTopic !== topic) return;

    request(`${config.api.endpoints.tags}tag/${tag}`)
        .then((data) => JSON.parse(data))
        .then((result) => {
            if (!result.tag)   return sendPong(0);

            return sendPong(1);
        })
        .catch((err) => {
            console.log(err);
        });

};
const sendPong = (payload) => {
    client.publish(rfidPongTopic, payload.toString());
};