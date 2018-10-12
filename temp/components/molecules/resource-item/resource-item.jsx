import React from 'react';
import { content } from '@services/url';

const ResorceItem = ({ res }) => (
  <div className="article resource-item">
    <figure>
      <a
        href={res.resourceLink}
        className="thumbnail"
        style={{
          backgroundImage: `url('${content(res.resourceImage)}')`,
        }}>
        <img src={content(res.resourceImage)} alt={res.resourceImage} />
      </a>
    </figure>
    <h2>
      {/* eslint-disable-next-line react/no-danger */}
      <a href={res.resourceLink} dangerouslySetInnerHTML={{ __html: res.resourceSummary }} />
    </h2>
    <p className="meta category">
      {/* eslint-disable-next-line react/no-danger */}
      <a href={res.resourceLink} dangerouslySetInnerHTML={{ __html: res.resourceTitle }} />
    </p>
  </div>
);

export default ResorceItem;
