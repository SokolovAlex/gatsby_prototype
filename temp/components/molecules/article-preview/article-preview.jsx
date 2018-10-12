import React from 'react';
import { content } from '@services/url';
import { region } from '@config';
import { getFallbackImage } from '@services/fallback-images';

const ArticlePreview = ({ data, buttonText }) => {
  const jsonUrl = data.url;
  const href = jsonUrl
    .substr(jsonUrl.lastIndexOf('/') + 1)
    .replace(/.json/g, '')
    .toLowerCase();

  return (
    <li>
      {!data.isVideoContent ? (
        <figure>
          <a href={href}>
            <img src={content(data.thumbnail_image || getFallbackImage())} alt={data.thumbnail_image} />
          </a>
        </figure>
      ) : (
        <figure>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="thumbnail" style={{ height: 79 }}>
            {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
            <iframe width="640" height="150" src={data.video} frameBorder="0" allowFullScreen />
          </a>
        </figure>
      )}

      <h2>
        <a href={href}>{data.title}</a>
      </h2>

      {region !== 'ru-ru' &&
        data.subcategoryTitle && (
          <p className="meta category">
            <a href={href}>{data.subcategoryTitle}</a>
          </p>
        )}
      {/* eslint-disable-next-line react/no-danger */}
      <p dangerouslySetInnerHTML={{ __html: data.summary }} />

      <a href={href} className="button transparent">
        {buttonText}
        &gt;
      </a>
    </li>
  );
};

export default ArticlePreview;
