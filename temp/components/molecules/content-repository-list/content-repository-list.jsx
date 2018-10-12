import React from 'react';
import ArticlePreview from '@mol/article-preview/article-preview';
import { getTranslation } from '@services/translations';

const ContentRepositoryList = ({ docs }) => {
  const readText = getTranslation('prReadMore');
  return (
    <ul className="articles-list image-aside">
      {docs.map((doc, i) => (
        /* eslint-disable-next-line react/no-array-index-key */
        <ArticlePreview key={i} buttonText={readText} data={doc} />
      ))}
    </ul>
  );
};

export default ContentRepositoryList;
