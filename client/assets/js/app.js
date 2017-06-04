const apiPath = 'http://127.0.0.1:3000/api';

const endpoints = {
    users: `${apiPath}/users`,
    tags: `${apiPath}/tags`,
    logs: `${apiPath}/logs`,
};

const pages = {
    main: '/main.html',
    users: '/users.html',
    tags: '/tags.html',
    logs: '/logs.html',
};

const http = axios.create({
    headers: {'Cache-Control': 'no-cache'}
});
const loadPage = document.getElementById('load-page');

const getPage = (page) => {
    return http.get(page);
};

const loaderPage = (page) => {
    getPage(pages[page])
        .then((data) => data.data)
        .then((html) => loadPage.innerHTML = html)
        .catch((err) => console.log);
};

$(document).ready(() => {
    $('.change-page').on('click', function () {
        const href = $(this).attr('href');
        const page = href.replace('#', '');

        loaderPage(page);
    });
});