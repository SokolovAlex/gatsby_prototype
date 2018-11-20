import React from 'react'
import Loader from 'react-loader-spinner'

import { ProductPromo } from './ProductPromo';
import { Form } from './Form';
import { getTemplate } from '../../../../services/api';
import LocalFloristlIcon from '@material-ui/icons/LocalFlorist'

class ProductPromoFn extends React.Component {
  state = {
    data: null,
  }

  handleChange(e) {
    this.props.onChange({ promoText: e.target.value});
  }

  componentDidMount() {
    getTemplate('components').then((template) => {
      const data = JSON.parse(template.content);
      this.setState({ data });
    })
  }
  
  render() {
    const { readOnly, state, ...props } = this.props;
    const { promoText } = state;
    const { data } = this.state;
    if (!data) {
      return <Loader
        type="Hearts"
        color="#00BFFF"
        height="100"
        width="100"
      />;
    }
    return (
      readOnly
        ? <ProductPromo {...props} data={data} text={promoText}/>
        : <Form {...props} data={data} text={promoText} handleChange={(e) => this.handleChange(e)}/>
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