import React from 'react';

import PageHeadline from '@mol/page-headline/page-headline';
import Breadrumbs from '@mol/breadcrumbs/breadcrumbs';

const RepoHeader = ({ meta, headerTitle, headerSubTitle, headerDescription, headerBgImg, showFigure }) => (
  <header id="page-header" className="page-header">
    <div className="container">
      <div className="page-info">
        <Breadrumbs breadcrumbs={meta.breadcrumbs} />
      </div>
      <PageHeadline
        headerTitle={headerTitle}
        headerSubTitle={headerSubTitle}
        headerDescription={headerDescription}
        headerBgImg={headerBgImg}
        showFigure={showFigure}
      />
    </div>
  </header>
);

export default RepoHeader;
