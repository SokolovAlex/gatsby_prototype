import React from 'react'
import ArticlePreview from '@at/article-preview/article-preview';

class ContentRepositoryList extends React.PureComponent {
    render() {
        const docs = this.props.docs;
        return (
            <ul className="articles-list image-aside">
                { docs.map((doc, i) => (
                    <ArticlePreview key={i} data={ doc }/>
                ))}
            </ul>
        );
    };
}

export default ContentRepositoryList