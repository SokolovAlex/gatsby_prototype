import React from 'react'
import ArticleSmallPreview from '@at/article-small-preview/article-small-preview'
import { take, orderBy } from 'lodash'
import { getTranslation } from '@services/translations'

const ArticleList = ({ docs }) => {
    const title = getTranslation('latestArticles');
    const articles = take(orderBy(docs, 'publicationDate'), 5);
    return (
        <div>
            <h4>{ title }</h4>
            <ul className="secondary-articles-list image-aside">
                { articles.map((doc, i) => (
                    <ArticleSmallPreview key={i} data={ doc }/>
                ))}
            </ul>
        </div>
    );
}

export default ArticleList