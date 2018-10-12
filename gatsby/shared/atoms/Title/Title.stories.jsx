/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';

import { Title } from './Title';

const sizes = {
  'sm': 'sm',
  'md': 'md',
  'lg': 'lg',
}

storiesOf('Title', module)
  .add('simple',
    () => (<Title size={ select('size', sizes, sizes.md ) }>{text('text', 'Kaspersky')}</Title>));
