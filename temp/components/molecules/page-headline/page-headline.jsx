import React from 'react';
import PropTypes from 'prop-types';
import { content } from '@services/url';

const PageHeadline = ({ headerTitle, headerBgImg, headerSubTitle, headerDescription, showFigure }) => (
  <div className={`page-headline ${showFigure ? 'show-figure' : ''}`}>
    {headerBgImg && (
      <figure>
        <img src={content(headerBgImg)} alt="resources" />
      </figure>
    )}
    {/* eslint-disable-next-line react/no-danger */}
    {headerSubTitle && <h3 className="page-surtitle" dangerouslySetInnerHTML={{ __html: headerSubTitle }} />}
    {/* eslint-disable-next-line react/no-danger */}
    <h1 className="page-title" dangerouslySetInnerHTML={{ __html: headerTitle }} />
    {/* eslint-disable-next-line react/no-danger */}
    {headerDescription && <h2 className="page-desc" dangerouslySetInnerHTML={{ __html: headerDescription }} />}
  </div>
);

PageHeadline.propTypes = {
  headerTitle: PropTypes.string.isRequired,
  /* eslint-disable react/require-default-props */
  headerBgImg: PropTypes.string,
  headerSubTitle: PropTypes.string,
  headerDescription: PropTypes.string,
  showFigure: PropTypes.bool,
  /* eslint-enable */
};

export default PageHeadline;
