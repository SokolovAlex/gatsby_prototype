import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Provider } from 'react-redux'
import { StaticQuery, graphql } from 'gatsby'

import { fill } from '@services/translations'

import SiteTop from '@mol/site-top/site-top'
import SiteHeader from '@org/site-header/site-header'
import GlobalFooter from '@org/global-footer/global-footer';
import createStore from '~/store/createStore'

import './common.scss'
import '../../queries/translations'

class Layout extends React.PureComponent {
    constructor(props) {
        super(props);
        this.title = props.title;
        this.description = props.description;
        this.children = props.children;
    }

    render() {
        return (
        <StaticQuery
            query = {
            graphql`
                query CommonLayout {
                    sitetopJson {
                        ...sitetopFragment
                    }
                    siteHeaderMainNavJson {
                        ...siteHeaderMainNavFragment
                    }
                    homeSecurityMegaMenuBlogJson {
                        ...homeSecurityMegaMenuBlogFragment
                    }
                    homeSecurityMegaMenuJson {
                        ...homeSecurityMegaMenuFragment
                    }
                    localizationFooterJson {
                        ...LocalizationFooterFragment
                    }
                    localizationFooterCountrySelectorJson {
                        ...localizationFooterCountrySelectorFragment
                    },
                    generalTranslationsJson{
                        ...generalTranslationsFragment
                    }
                }
            `}
            render = { data => {
                fill(data.generalTranslationsJson._fields);
                return (
                    <>
                    <Helmet
                        title={ this.title }
                        meta={[
                        { name: 'description', content: this.description },
                        { name: 'keywords', content: 'sample, something' },
                        ]}>
                        <html lang="en" />
                    </Helmet>
                    <Provider store={createStore()}>
                        <div>
                        <SiteTop fields = { data.sitetopJson._fields } />
                        <SiteHeader
                            fields={ data.siteHeaderMainNavJson._fields }
                            megaMenu = { data.homeSecurityMegaMenuJson._fields }
                            megaMenuBlog = { data.homeSecurityMegaMenuBlogJson._fields }
                        />

                        { this.children }

                        <GlobalFooter
                            data={data.localizationFooterJson._fields}
                            countrySelectorFields={ data.localizationFooterCountrySelectorJson._fields }/>
                        </div>
                    </Provider>
                    </>
                )}
            }/>
        );
    }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;
