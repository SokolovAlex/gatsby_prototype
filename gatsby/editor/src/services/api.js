import axios from 'axios';

const root = 'http://localhost:4000';

const saveTemplate = (template, data) => {
    return axios.post(`${root}/api/template`, {
      template,
      content: JSON.stringify(data)
    });
};

const getTemplate = (name) => {
    return axios.get(`${root}/api/template/${name}`)
      .then(response => response.data);
};

export { saveTemplate, getTemplate };