import React from 'react';
import Layout from '~/layouts/common/common';
import { graphql } from 'gatsby';
import ResourceGallery from '@mol/resource-gallery/resource-gallery';
import RepoHeader from '@mol/repo-header/repo-header';

const ResourceCenter = ({ data }) => {
  /* eslint-disable-next-line no-underscore-dangle */
  const meta = data.homeSecurityResourceCenterMetaJson._fields;
  /* eslint-disable-next-line no-underscore-dangle */
  const { headerTitle, headerBgImg, headerDescription, headerSubTitle } = data.repositoryRepoHeaderJson._fields;
  return (
    <Layout title={meta.title} description={meta.description}>
      <RepoHeader
        meta={meta}
        headerTitle={headerTitle}
        headerBgImg={headerBgImg}
        headerDescription={headerDescription}
        headerSubTitle={headerSubTitle}
        showFigure
      />
      {/* eslint-disable-next-line no-underscore-dangle */}
      <ResourceGallery categories={data.resourcesCategoriesJson} resources={data.repositoryResourcesB2CJson._fields} />
    </Layout>
  );
};

export default ResourceCenter;

export const query = graphql`
  query ResourceCenterPage {
    repositoryResourcesB2CJson {
      ...repositoryResourcesB2CFragment
    }
    resourcesCategoriesJson {
      ...resourcesCategoriesFragment
    }
    homeSecurityResourceCenterMetaJson {
      ...homeSecurityResourceCenterMetaFragment
    }
    repositoryRepoHeaderJson {
      ...repositoryRepoHeaderFragment
    }
  }
`;
