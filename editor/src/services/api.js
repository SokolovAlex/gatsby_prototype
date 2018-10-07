import axios from 'axios';

const root = 'http://localhost:4000';

const saveTemplate = (data) => {
    return axios.post(`${root}/api/template`, {
        template: 'article',
        content: JSON.stringify(data)
    });
};

const getBannerTemplate = () => {
    return axios.get(`${root}/api/template`).then(response => response.data);
};

export { saveTemplate, getBannerTemplate };