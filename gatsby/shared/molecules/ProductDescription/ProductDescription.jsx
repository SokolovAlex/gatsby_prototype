/* eslint-disable */
import React from 'react';
import { content } from '@services/url';
import { Title } from '@at/Title/Title';

import styles from './ProductDescription.module.scss';

const ProductDescription = ({ image, brandName, productName }) => {
  return (
    <div className={ styles.host }>
      <figure className={ styles.productImage }>
        <img alt={ productName } title={ productName } src={ content(image) }/>
      </figure>
      <div className={ styles.name }>
        <Title>{ brandName }</Title>
        <Title>{ productName }</Title>
      </div>
    </div>
  );
}

export { ProductDescription };
