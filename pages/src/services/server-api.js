const { get, post } = require('axios');
const { locale } = require('../../config');

const staticRoot = `http://localhost:9999/${locale}`;

const getJson = (url) => {
    return get(`${staticRoot}/${url}`)
        .then(response => response.data);
};

const getContentRepositoryList = async () => {
    await post('https://www.kaspersky.ru/_svc/contentrepository.svc/docs/query')
        .then(response => response.data);
};

module.exports = { getJson, getContentRepositoryList };