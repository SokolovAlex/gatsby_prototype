import React from 'react'
import Layout from '~/layouts/common/common'
import { graphql } from 'gatsby'
import ResourceGallery from '@mol/resource-gallery/resource-gallery'
import RepoHeader from '@mol/repo-header/repo-header'

const ResourceCenter = ({ data }) => {
    const meta = data.homeSecurityResourceCenterMetaJson._fields;
    const { headerTitle, headerBgImg, headerDescription, headerSubTitle } = data.repositoryRepoHeaderJson._fields;
    return (
        <Layout title={ meta.title } description={ meta.description }>
            <RepoHeader
                meta={ meta }
                headerTitle={ headerTitle }
                headerBgImg={ headerBgImg }
                headerDescription={ headerDescription }
                headerSubTitle={ headerSubTitle } />
            <ResourceGallery
                categories={ data.resourcesCategoriesJson }
                resources={ data.repositoryResourcesB2CJson._fields } />
        </Layout>
    )
}

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

export const MetaQuery = graphql`
    fragment homeSecurityResourceCenterMetaFragment on HomeSecurityResourceCenterMetaJson {
        _fields {
            title
            description
            breadcrumbs {
                title
                link
            }
        }
    }`
;

export const HeaderQuery = graphql`
    fragment repositoryRepoHeaderFragment on RepositoryRepoHeaderJson {
        _fields {
            headerTitle
            headerDescription
            headerBgImg
        }
    }`
;
