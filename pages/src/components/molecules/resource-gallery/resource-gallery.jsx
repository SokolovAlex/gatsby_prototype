import React from 'react';
import classSet from 'classnames';
import { Link, graphql } from 'gatsby'

import ResorceItem from '@at/resource-item/resource-item'

import './articles.scss';

class ResourceGallery extends React.PureComponent {
    constructor(props) {
        super(props);
        this.categories = props.categories;
        this.resources = props.resources;
        this.repoType ='b2c'; // ??
        this.filteredResources = this.filterResources(props.categories, props.resources);
    }

    sectionClass() {
        return classSet({
            'articles-section': true,
            divider: this.repoType === 'smb' || this.repoType === 'vsb'
        });
    }

    filterResources(categories, resources) {
        const categoryByType = categories[this.repoType];
        return resources.resourceCenterItems;
    }

    render() {
        return (
            <section className={ this.sectionClass() }>
                <div className="container">
                    <div className="resources-list row masonry2">
                        { this.filteredResources.map((res, i) => (
                            <div key={i} className={`item ${ i === 0 ? 'featured' : ''} ${ i === 1 ? 'grid-sizer': ''}`}>
                                <ResorceItem
                                    resource={res}
                                    repoType={this.repoType} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }
}

export default ResourceGallery

export const b2cQuery = graphql`
fragment repositoryResourcesB2CFragment on RepositoryResourcesB2CJson {
    _fields {
        resourceCenterItems {
            resourceCategory {
                id
                key
                title
                description
            }
            resourceTitle
            resourceSummary
            resourceImage
            resourceLink
            }
        }
    }
`;

export const categoryQuery = graphql`
fragment resourcesCategoriesFragment on ResourcesCategoriesJson {
    b2c {
        preemptive_safety
        threats
        infographics
        definitions
    }
    smb {
        customers
        insights
        products
        technology
        industry_awards_and_recognition
        webinars
        formations
    }
}`;

export const b2bQuery = graphql`
fragment repositoryResourcesB2BFragment on RepositoryResourcesB2BJson {
    _fields {
        resourceCenterItems {
        resourceCategory {
            id
            key
            title
            description
        }
        resourceTitle
        resourceSummary
        resourceImage
        resourceLink
        }
    }
}`;
