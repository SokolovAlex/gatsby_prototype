import { get, post } from 'axios';
import { staticUrl, region, apiUrl } from '../../config';

const getJson = (url) =>
  get(`${staticUrl}/${url}`).then((response) => ({
    ...response.data,
    url,
  }));
const getContentRepositoryList = async ({ size, page }) => {
  const postData = {
    category: { select: 0, value: ['02::threats'] },
    contenttype: { select: 0, value: '' },
    locale: region,
    order_by: 'pub_start desc',
    page_num: page || 1,
    page_size: size || 10,
    repository_type: 'b2c',
    subcategory: { select: 0, value: [] },
  };
  const data = await post(`${apiUrl}/contentrepository.svc/docs/query`, postData).then((response) => response.data);
  const jsonRequests = data.docs.map((doc) => getJson(doc.Url));

  // eslint-disable-next-line no-return-await
  return await Promise.all(jsonRequests).then((docs) => ({
    count: data.count,
    docs: docs.map((docRes) => ({
      ...docRes.fields,
      url: docRes.url,
      publicationDate: new Date(docRes.pubdate),
    })),
  }));
};

export { getJson, getContentRepositoryList };
