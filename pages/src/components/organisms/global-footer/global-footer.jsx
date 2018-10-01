import React from 'react'
import { graphql } from 'gatsby';
import { connect } from 'react-redux';

import BigFooter from '@mol/big-footer/big-footer';
import CountrySelector from '@mol/country-selector/country-selector';

import { isCountrySelectorOpen } from '@actions';

import './site-footer.scss';

const GlobalFooter = ({ isCountrySelectorOpen, toogleCountrySelector, data, countrySelectorFields }) => (
    <section>
        <BigFooter
            data={data}
            isCountrySelectorOpen={ isCountrySelectorOpen }
            onToogleCountrySelector= { toogleCountrySelector } />
        <CountrySelector
            fields={countrySelectorFields}
            isCountrySelectorOpen={ isCountrySelectorOpen }
            onToogleCountrySelector= { toogleCountrySelector } />
    </section>
);

export default connect(
    (state) => ({
        isCountrySelectorOpen: state.footer.isCountrySelectorOpen,
    }),
    (dispatch) => ({
        toogleCountrySelector() {
            dispatch(isCountrySelectorOpen());
        }
    })
)(GlobalFooter)

export const footerQuery = graphql`
    fragment LocalizationFooterFragment on LocalizationFooterJson {
        _fields {
            leftSetOfBlocks{
                title
                description
            }
            contactUsBlock {
                title
                description
            }
            footerRightSideBlock {
                title
                description
            }
            socialBlockHeading
            socialIcons {
                link
                icon
            }
            copyright
            copyright_smb
            copyright_vsb
            copyright_ent
            shortViewLinks {
                text
                link
            }
            rssLink {
                hide
            }
        }
    }
`;

export const CountrySelectorQuery = graphql`
    fragment localizationFooterCountrySelectorFragment on LocalizationFooterCountrySelectorJson {
        _fields {
            Body
        }
    }
`;