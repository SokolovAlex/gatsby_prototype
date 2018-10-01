import React from 'react'
import Layout from '~/layouts/common/common'
import { graphql } from 'gatsby'
import ResourceGallery from '@mol/resource-gallery/resource-gallery'
import RepoHeader from '@mol/repo-header/repo-header'

const ResourceCenter = ({ data }) => {
    const meta = data.homeSecurityResourceCenterMetaJson._fields;
    return (
        <Layout title={ meta.title } description={meta.description}>
            <RepoHeader
                meta={ meta }
                header={ data.repositoryRepoHeaderJson._fields } />
            <ResourceGallery
                categories={ data.resourcesCategoriesJson }
                resources={ data.repositoryResourcesB2CJson._fields } />
        </Layout>
    )
}

export default ResourceCenter;

export const query = graphql`
  query ResourceCenterPreemptiveSafetyPage {
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