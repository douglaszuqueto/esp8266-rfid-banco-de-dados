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
    if (rfidPingTopic !== topic) return;

    const tag = message.toString();

    authorizeRfid(topic, tag);
});

const authorizeRfid = (topic, tag) => {
    request(`${config.api.endpoints.tags}tag/${tag}`)
        .then((data) => JSON.parse(data))
        .then((result) => formatPayload(result))
        .then((payload) => createLog(payload))
        .then((status) => sendPong(status))
        .catch((err) => console.log(err));

};
const formatPayload = (result) => {
    const payload = {
        'data': result,
        'status': 0,
    };

    if (!result.tag || result.state === 0) {
        return payload;
    }
    payload.status = 1;
    return payload;
};

const createLog = (payload) => {
    if (!payload.data.tag) return payload.status;

    const log = {
        id_user: payload.data.id_user,
        tag: payload.data.tag,
        status: payload.status
    };

    const options = {
        method: 'POST',
        uri: config.api.endpoints.log,
        body: log,
        json: true
    };

    request(options)
        .then((res) => console.log(res))
        .catch((err) => console.log('err'));

    return payload.status;
};

const sendPong = (state) => {
    console.log(`Acesso ${state ? 'permitido' : 'bloqueado'}!`);
    client.publish(rfidPongTopic, state.toString());
};