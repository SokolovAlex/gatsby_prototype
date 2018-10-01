import React from 'react';
import { content } from '@services/url'

class ResorceItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.res = props.resource;
        this.resType = props.resType;
    }

    getHref(link) {
        return link;
    }

    render() {
        const res = this.res;
        return (
            <div className="article resource-item">
                <figure>
                    <a href={ this.getHref(res.resourceLink) }
                        className="thumbnail"
                        style={{backgroundImage: `url('${content(res.resourceImage)}')` }}>
                        <img src={ content(res.resourceImage) } alt={res.resourceImage}/>
                    </a>
                </figure>
                <h2>
                    <a href={ this.getHref(res.resourceLink) }
                        dangerouslySetInnerHTML={{ __html: res.resourceSummary }}></a>
                </h2>
                <p className="meta category">
                    <a href={ this.getHref(res.resourceLink) }
                        dangerouslySetInnerHTML={{ __html: res.resourceTitle }}>
                    </a>
                </p>
            </div>
        )
    }
}

export default ResorceItem;