/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { customWebpackConfig } = require('./utils/webpack');
const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig(customWebpackConfig);
};

const { getJson } = require('./src/services/server-api');

exports.createPages = ({ actions }) => {
    console.log('createPages');
    const { createPage } = actions;
    const articleTemplate = path.resolve(`./src/templates/article.js`)

    const content = [{
        contentUrl: '/content/ru-ru/repository/isc/grey-business.json',
        path: 'resource-center/threats/grey-business'
    }, {
        contentUrl: '/content/ru-ru/repository/isc/sms-attacks.json',
        path: 'resource-center/threats/sms-attacks'
    }, {
        contentUrl: '/content/ru-ru/repository/isc/evolving-delivery-methods.json',
        path: 'resource-center/threats/evolving-delivery-methods'
    }, {
        contentUrl: './content/ru-ru/repository/isc/mobile.json',
        path: 'resource-center/threats/mobile'
    }, {
        contentUrl: './content/ru-ru/repository/isccombating-antivirus.json',
        path: 'resource-center/threats/combating-antivirus'
    }, {
        contentUrl: './content/ru-ru/repository/isc/linux-bash-virus-threat.json',
        path: 'resource-center/threats/linux-bash-virus-threat'
    }, {
        contentUrl: './content/ru-ru/repository/isc/mac.json',
        path: 'resource-center/threats/mac'
    }, {
        contentUrl: './content/ru-ru/repository/isc/epic-turla-snake-malware-attacks.json',
        path: 'resource-center/threats/epic-turla-snake-malware-attacks'
    }, {
        contentUrl: './content/ru-ru/repository/isc/deep-web.json',
        path: 'resource-center/threats/deep-web'
    }, {
        contentUrl: './content/ru-ru/repository/availability-of-complete-documentation.json',
        path: 'resource-center/threats/availability-of-complete-documentation'
    }, {
        contentUrl: './content/ru-ru/repository/isc/ddos-attacks.json',
        path: 'resource-center/threats/ddos-attacks'
    }, {
        contentUrl: './content/ru-ru/repository/isc/dealing-with-svchost-exe-virus-sneak-attack.json',
        path: 'resource-center/threats/dealing-with-svchost-exe-virus-sneak-attack'
    }, {
        contentUrl: './content/ru-ru/repository/isc/malware-system-penetration.json',
        path: 'resource-center/threats/malware-system-penetration'
    }, {
        contentUrl: './content/ru-ru/repository/isc/data-theft.json',
        path: 'resource-center/threats/data-theft'
    }, {
        contentUrl: './content/ru-ru/repository/isc/naikon-targeted-attacks.json',
        path: 'resource-center/threats/naikon-targeted-attacks'
    }];

    content.forEach(info => {
        const response = getJson(info.contentUrl)
            .then(response => {
                createPage({
                    path: info.path,
                    component: articleTemplate,
                    context: response.fields
                });
            }).catch(ex => {
                console.log(`Error during dynamic building pages: ${ex}`);
            });
    });
}

// exports.sourceNodes = async ({ actions }) => {
//     const { getContentRepositoryList } = require('./src/services/server-api');
//     const { createNode } = actions;
//     console.log('sourceNodes');
//     console.log('_______________');

//     const request = await getContentRepositoryList();

//     console.log('request', request);
//     console.log('_______________');
// }

// https://graphql.org/graphql-js/type/#graphqlobjecttype
const { GraphQLString, GraphQLObjectType, GraphQLList } = require('gatsby/graphql');
exports.setFieldsOnGraphQLNodeType = ({ type }) => {
    const { nodes } = type;
    const node = nodes && nodes[0];
    if (node.internal.owner !== 'gatsby-transformer-json') {
        return;
    }
    // console.log('node.internal.type', node.internal.type);
    switch(node.internal.type) {
        case 'TestJson': {
            console.log('TRANSFORM SCHEMA --> ', node.internal.type);
            const ArrayItem = new GraphQLObjectType({
                name: 'innerArray',
                fields: {
                    title: { type: GraphQLString },
                    link: { type: GraphQLString },
                    desc: { type: GraphQLString }
                }
            });

            const Fields = new GraphQLObjectType({
                name: '_fields',
                fields: () => ({
                    innerNull: { type: GraphQLString },
                    innerArray: { type: GraphQLList(ArrayItem) },
                    innerValue: { type: GraphQLString }
                })
            });

            return {
                nullValue: { type: GraphQLString },
                filledArray: { type: new GraphQLList(ArrayItem) },
                emptyArray: { type: new GraphQLList(GraphQLString) },
                _fields: { type: Fields }
            };

            /*
                query sitetop {
                    testJson {
                        nullValue
                        emptyArray
                        emptyString
                        numberValue
                        array {
                        title
                        }
                        stringValue
                        filledArray {
                        title
                        desc
                        link
                        }
                        
                        _fields {
                        innerNull
                        innerArray {
                            title
                            link
                            desc
                        }
                        innerValue
                        }
                    }
                }
            */
        }
        default:
            return {};
    }
};
