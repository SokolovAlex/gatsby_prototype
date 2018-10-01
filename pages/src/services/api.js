import { get, post } from 'axios';
import { locale } from '../../config';

const staticRoot = `http://localhost:9999/${locale}`;

const getJson = (url) => {
    return get(`${staticRoot}/${url}`)
        .then(response => ({ ...response.data, url }));
};

// https://confluence.kaspersky.com/display/TRID/WebAPI+Content+Repository
// https://www.kaspersky.com/_svc/contentrepository.svc/help
const getContentRepositoryList = async ({ size }) => {
    const postData = {
        category: {select: 0, value: ["02::threats"]},
        contenttype: {select: 0, value: ""},
        locale: "ru-ru",
        order_by: "pub_start desc",
        page_num: 1,
        page_size: size || 10,
        repository_type: "b2c",
        subcategory: { select: 0, value: [] }
    };
    const data = await post('http://ngdev-www.kaspersky.com/_svc/contentrepository.svc/docs/query', postData)
        .then(response => response.data);
    const jsonRequests = data.docs.map(doc => getJson(doc.Url));

    return await Promise.all(jsonRequests).then(docs => ({
        count: data.count,
        docs: docs.map(docRes => ({
            ...docRes.fields,
            url: docRes.url,
            publicationDate: new Date(docRes.pubdate)
        }))
    }));
};


export { getJson, getContentRepositoryList };