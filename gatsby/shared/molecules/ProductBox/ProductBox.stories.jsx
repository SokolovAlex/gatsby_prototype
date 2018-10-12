/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { ProductBox } from './ProductBox';

import { text, select } from '@storybook/addon-knobs';

const products = {
  kav: 'content/fr-fr/images/b2c/product-box-KAV.png',
  kis: 'content/fr-fr/images/b2c/product-box-KIS.png'
};

storiesOf('ProductBox', module)
  .add('kav',
    () => (<ProductBox
      image={ products.kav }
      brand={ text('brand name', 'Kaspersky') }
      title={ text('product name', 'Security Cloud') }
      tagText={ text('tag text', 'PROTECTION PC ESSENTIELLE') }
      subtitle={ text('subtitle', '') }
      link={ text('link', 'www.google.com') }
    />))
  .add('kis',
    () => (<ProductBox
      image={ products.kis }
      brand={ text('brand name', 'Kaspersky') }
      title={ text('product name', 'Security Cloud') }
      tagText={ text('tag text', 'PROTECTION PC ESSENTIELLE') }
      subtitle={ text('subtitle', '') }
      link={ text('link', 'www.google.com') }
    />));
