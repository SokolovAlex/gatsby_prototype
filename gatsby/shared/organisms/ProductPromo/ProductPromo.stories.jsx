/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { ProductPromo } from './ProductPromo';

import bottomData from './_data-ksc-promo-bottom';
import middleData from './_data-ksc-promo-middle';

storiesOf('ProductPromo', module)
  .add('ksc-promo-middle',
    () => (<div style={{ margin: '20px 0' }}><ProductPromo data = { bottomData.fields } /></div>))
  .add('ksc-promo-bottom',
    () => (<div style={{ margin: '20px 0' }}><ProductPromo data = { middleData.fields } /></div>));
