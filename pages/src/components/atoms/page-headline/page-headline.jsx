import React from 'react'
import PropTypes from 'prop-types';
import { content } from '@services/url';

import './page-headline.scss';

class PageHeadline extends React.PureComponent {
    showFigure = true; //todo

    constructor(props) {
      super(props);
    }

    render() {
        const headerTitle = this.props.headerTitle;
        const headerBgImg = this.props.headerBgImg;
        const headerSubTitle = this.props.headerSubTitle;
        const headerDescription = this.props.headerDescription;

        return (
            <div className="page-headline show-figure">
                { headerBgImg &&
                    <figure>
                        <img src={ content(headerBgImg) } alt="resources"/>
                    </figure>
                }
                { headerSubTitle &&
                    <h3 className="page-surtitle" dangerouslySetInnerHTML={{ __html: headerSubTitle }}></h3>
                }
                <h1 className="page-title" dangerouslySetInnerHTML={{ __html: headerTitle }}></h1>
                { headerDescription &&
                    <h2 className="page-desc" dangerouslySetInnerHTML={{ __html: headerDescription }}></h2>
                }
            </div>
        );
    };
}

PageHeadline.propTypes = {
    headerTitle: PropTypes.string.isRequired,
    headerBgImg: PropTypes.string,
    headerSubTitle: PropTypes.string,
    headerDescription: PropTypes.string,
}

export default PageHeadline
