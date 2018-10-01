import React from 'react'
import { content } from '@services/url';

const Article = ({ body, image }) => {
    return (
        <div>
            <figure className="featured-image">
                <img alt={image} src={content(image)} />
            </figure>
            <div dangerouslySetInnerHTML={{ __html: body }}></div>
        </div>
    );
}

export default Article