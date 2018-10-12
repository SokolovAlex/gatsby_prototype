import React from 'react';
import { content } from '@services/url';

const ArticleContent = ({ body, image }) => (
  <div>
    <figure className="featured-image">
      <img alt={image} src={content(image)} />
    </figure>
    {/* eslint-disable-next-line react/no-danger */}
    <div dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);

export default ArticleContent;
