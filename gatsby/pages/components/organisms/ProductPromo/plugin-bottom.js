import React from 'react'
import { ProductPromo } from './ProductPromo';
import LocalFloristlIcon from '@material-ui/icons/LocalFlorist'

import data from './_data-ksc-promo-bottom';

const ProductPromoFn = () => (
  <ProductPromo
      data={data.fields}>
    </ProductPromo>
)

export default {
  Component: ProductPromoFn,
  name: 'ProductPromoBottom',
  IconComponent: <LocalFloristlIcon/>,
  version: '0.0.1',
  text: 'ProductPromoBottom',
}