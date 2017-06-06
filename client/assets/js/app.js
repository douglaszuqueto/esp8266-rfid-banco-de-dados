const apiPath = 'http://127.0.0.1:3000/api';

const endpoints = {
  users: `${apiPath}/users`,
  tags: `${apiPath}/tags`,
  logs: `${apiPath}/logs`,
};

const mqttConfig = {
  broker: 'broker.iot-br.com',
  topic: '/empresas/douglaszuqueto/catraca/entrada/ping',
  port: 8083
};

const http = axios.create({
  headers: {'Cache-Control': 'no-cache'}
});

const alert = $('#alert');

const successMessage = (message) => {
  alert.removeClass('hidden').addClass('is-success').find('.message-text').html(message);
};
const dangerMessage = (err) => {
  alert.removeClass('hidden').addClass('is-danger').find('.message-text').html('Erro:: ' + err);
};

$(document).ready(() => {
  $('.delete').on('click', function () {
    $(this).parent().hide();
  });
});
