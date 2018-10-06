import axios from 'axios';

const saveTemplate = (data) => {
    return axios.post('/api/template', {
        template: 'article',
        content: JSON.stringify(data)
    });
};

export { saveTemplate };