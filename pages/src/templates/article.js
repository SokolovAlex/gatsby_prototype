import React from "react"
import { graphql } from 'gatsby'
import Layout from '~/layouts/common/common'
import Loader from 'react-loaders';

import RepoHeader from '@mol/repo-header/repo-header'
import Article from '@org/article/article'
import ArticleList from '@mol/article-list//article-list';

const ArticleTemplate = ({ pageContext, data, docs}) => {
    const { metaTitle, metaDesc, title, body, image } = pageContext;
    const meta = data.homeSecurityResourceCenterThreatsMetaJson._fields;
    const imageSrc = image.length ? image[0] : '';
    return (
        <Layout title={ metaTitle } description={ metaDesc }>
            <RepoHeader
                meta={ meta }
                headerTitle={ title } />
            <div className="container">
                <div className="row">
                    <div className="content col-l-7 col-xl-8">
                        <Article body={ body } image={imageSrc}/>
                    </div>
                    <div className="sidebar col-l-5 col-xl-4">
                        { docs ?
                            <ArticleList docs={ docs } />
                            :
                            <Loader type="pacman" />
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ArticleTemplate;

export const query = graphql`
  query ArticlePage {
    homeSecurityResourceCenterThreatsMetaJson {
        ...homeSecurityThreatsMetaFragment
    }
  }
`;

export const MetaQuery = graphql`
    fragment homeSecurityThreatsMetaFragment on HomeSecurityResourceCenterThreatsMetaJson {
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