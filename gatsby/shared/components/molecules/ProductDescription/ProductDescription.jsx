/* eslint-disable */
import React from 'react';

import styles from './ProductDescription.module.scss';

const ProductDescription = ({ image, brandName, productName }) => {
  return (
    <div className={ styles.host }>
      <figure className={ styles.productImage }>
        <img alt={ productName } title={ productName } src={ image }/>
      </figure>
      <div className={ styles.name }>
        <h3>{ brandName }</h3>
        <h3>{ productName }</h3>
      </div>
    </div>
  );
}

export { ProductDescription };
