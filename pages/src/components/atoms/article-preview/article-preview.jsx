import React from 'react'
import { content } from '@services/url';
import { region } from '@config';

const ArticlePreview = ({ data }) => {
    const link = data.link;
    const url = data.url;
    const href = url.substr(url.lastIndexOf('/') + 1).replace(/.json/g, '').toLowerCase();
    return (
        <li>
            { !data.isVideoContent ?
                (<figure>
                    <a href={ `threats/${href}` }>
                        <img src={ content(data.thumbnail_image) } alt={data.thumbnail_image}/>
                    </a>
                </figure>)
                :
                (<figure>
                    <a className="thumbnail" style={{ height: 79 }}>
                        <iframe
                            width="640" height="150" src={ data.video }
                            frameborder="0" allowfullscreen></iframe>
                    </a>
                </figure>)
            }

            <h2>
                <a href={ `threats/${href}`}>
                    { data.title }
                </a>
            </h2>

            { region !== 'ru-ru' && data.subcategoryTitle &&
                <p className="meta category">
                    <a href={ `threats/${href}`}>
                        { data.subcategoryTitle }
                    </a>
                </p>
            }

            <p dangerouslySetInnerHTML={{ __html: data.summary }}></p>
            
            { link &&
                <a className="button transparent icon-doc"
                    className={ link.class ? link.class : 'icon-pdf' }
                    target="_blank">
                    { link.text }
                </a>
            }
        </li>
    );
}

export default ArticlePreview

