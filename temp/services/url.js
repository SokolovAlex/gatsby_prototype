import { staticUrl } from '@config';

const content = (url) => `${staticUrl}/${url}`;
const trailingUrl = (pageUrl) => `${pageUrl}/`;

export { content, trailingUrl };
