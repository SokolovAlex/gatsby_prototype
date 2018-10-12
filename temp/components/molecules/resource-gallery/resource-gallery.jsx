import React from 'react';
import classSet from 'classnames';

import ResorceItem from '@mol/resource-item/resource-item';

const sectionClass = (repoType) =>
  classSet({
    'articles-section': true,
    divider: repoType === 'smb' || repoType === 'vsb',
  });

const filterResources = (resources) => resources.resourceCenterItems;
/* eslint-disable-next-line no-unused-vars */
const ResourceGallery = ({ categories, resources, repoType }) => (
  <section className={sectionClass(repoType)}>
    <div className="container">
      <div className="resources-list row masonry2">
        {filterResources(resources).map((res, i) => (
          /* eslint-disable-next-line react/no-array-index-key */
          <div key={i} className={`item ${i === 0 ? 'featured' : ''} ${i === 1 ? 'grid-sizer' : ''}`}>
            <ResorceItem res={res} repoType={repoType} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ResourceGallery;
