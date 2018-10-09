/* eslint-disable */
import React from 'react';

import Icon from '@org/Icon/Icon';
import styles from './CountrySelector.module.scss';
import { grey } from '@at/variables';

const CountrySelector = ({ data, onToogleCountrySelector, isCountrySelectorOpen }) => {
  const body = data.Body;
  return (
    <section className={`${styles.host} ${isCountrySelectorOpen ? '' : styles.hidden} `}>
      <div className={styles.container}>
        <span className={styles.close} onClick={(e) => onToogleCountrySelector(e)}>
          <Icon name='cancel' fill={grey}></Icon>
        </span>
        <div className={styles.countryList} dangerouslySetInnerHTML={{ __html: body }}></div>
      </div>
    </section>
  );
};

export { CountrySelector };
