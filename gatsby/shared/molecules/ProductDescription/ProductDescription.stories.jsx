/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { ProductDescription } from './ProductDescription';

import { text, select } from '@storybook/addon-knobs';

const products = {
  ksc: "content/fr-fr/images/b2c/product-icon-security-cloud.png",
};

storiesOf('ProductDescription', module)
  .add('ksc-promo-middle',
    () => (<ProductDescription
      image={ select('image', products, products.ksc) }
      brandName={ text('brandName', 'Kaspersky') }
      productName={ text('productName', 'Security Cloud') }
    />));
