import React from 'react'
import Layout from '~/layouts/common/common'
import { graphql } from 'gatsby'

import RepoHeader from '@mol/repo-header/repo-header'
import ContentRepository from '@org/content-repository/content-repository'

const ResourceCenter = ({ data }) => {
    const meta = data.homeSecurityResourceCenterThreatsMetaJson._fields;
    const { header } = data.homeSecurityResourceCenterThreatsPageHeaderJson._fields;

    return (
        <Layout title={ meta.title } description={meta.description}>
            <RepoHeader
                meta={ meta }
                headerTitle={ header } />
            <ContentRepository/>
        </Layout>
    );
}

export default ResourceCenter;

export const query = graphql`
  query ResourceCenterThreatsPage {
    repositoryResourcesB2CJson {
      ...repositoryResourcesB2CFragment
    }
    resourcesCategoriesJson {
      ...resourcesCategoriesFragment
    }
    homeSecurityResourceCenterThreatsMetaJson {
        ...homeSecurityResourceCenterThreatsMetaFragment
    }
    homeSecurityResourceCenterThreatsPageHeaderJson {
        _fields {
            headerType
            header
        }
    }
  }
`;

export const MetaQuery = graphql`
    fragment homeSecurityResourceCenterThreatsMetaFragment on HomeSecurityResourceCenterThreatsMetaJson {
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