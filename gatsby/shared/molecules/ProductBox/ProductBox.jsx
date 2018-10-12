/* eslint-disable */
import React from 'react';
import { content } from '@services/url';

import { Title } from '@at/Title/Title';

import styles from './ProductBox.module.scss';

const ProductBox = ({ image, brand, title, subtitle, tagText, altTitle, link }) => {
  return (
    <div className={ styles.host }>
      <figure className={ styles.productImage }>
        <img alt={ altTitle } title={ altTitle } src={ content(image) }/>
      </figure>

      <div className={ styles.name }>
        <div className={ styles.tagline }>{ tagText }</div>
        <a href={link}>
          <div className={ styles.brand }>{ brand }</div>
          <Title size='sm'>{ title }</Title>
        </a>
      </div>
    </div>
  );
}

export { ProductBox };
