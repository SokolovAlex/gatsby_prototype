import React from 'react'
import { ProductBox } from './ProductBox';
import LocalFloristlIcon from '@material-ui/icons/LocalFlorist'

const ProductBoxComponent = () => (<ProductBox
    image={'https://i.ytimg.com/vi/uLLw8jylWOY/maxresdefault.jpg'}
    brand={'kaspersky'}
    title={'Securyty cloud'}
    subtitle={'subtitle'}
    tagText={'tagText'}
    link={'www.google.com'}
  ></ProductBox>)

export default {
  Component: ProductBoxComponent,
  name: 'ProductBox',
  IconComponent: <LocalFloristlIcon/>,
  version: '0.0.1',
  text: 'ProductBox',
}