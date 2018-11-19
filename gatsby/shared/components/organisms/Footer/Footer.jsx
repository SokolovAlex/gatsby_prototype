/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';

import { DesktopFooter } from '@mol/DesktopFooter/DesktopFooter';
import { CountrySelector } from '@mol/CountrySelector/CountrySelector';
import { getCountry } from '@services/localization';

import { isCountrySelectorOpen } from '@actions';

const DumpFooter = ({ data, selectorData, isCountrySelectorOpen, toogleCountrySelector }) => (
  <footer className="kl-footer">
    <DesktopFooter
      data={data}
      country={getCountry()}
      isCountrySelectorOpen={isCountrySelectorOpen}
      onToogleCountrySelector={toogleCountrySelector}
    />
    <CountrySelector
      data={selectorData}
      isCountrySelectorOpen={isCountrySelectorOpen}
      onToogleCountrySelector={toogleCountrySelector}
    />
  </footer>
);

const Footer = connect(
  (state) => ({
    isCountrySelectorOpen: state.footer.isCountrySelectorOpen,
  }),
  (dispatch) => ({
    toogleCountrySelector() {
      dispatch(isCountrySelectorOpen());
    },
  })
)(DumpFooter);

export { Footer };
