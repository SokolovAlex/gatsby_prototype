import React from 'react'
import { ProductPromo } from './ProductPromo';
import { Form } from './Form';
import LocalFloristlIcon from '@material-ui/icons/LocalFlorist'

import data from './_data-ksc-promo-bottom';

class ProductPromoFn extends React.Component {
  handleChange(e) {
    this.props.onChange({ promoText: e.target.value});
  }
  
  render() {
    const { readOnly, state, ...props } = this.props;
    const { promoText } = state;
    return (
      readOnly ?
        <ProductPromo {...props} data={data.fields} text={promoText}/>
        : <Form {...props} text={promoText} handleChange={(e) => this.handleChange(e)}/>
    );
  }
}

export default {
  Component: ProductPromoFn,
  name: 'ProductPromoBottom',
  IconComponent: <LocalFloristlIcon/>,
  version: '0.0.1',
  text: 'ProductPromoBottom',
}