import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, number } from '@storybook/addon-knobs';
import { color } from '@storybook/addon-knobs/dist/vue';
import Icon from './Icon';
import { ICONS } from './Icons.constants';

const iconNames = Object.keys(ICONS);

storiesOf('Icon', module).addWithJSX('Icon', () => (
  <Icon name={select('name', iconNames, iconNames[0])} size={number('size', 50)} fill={color('fill', '#000000')} />
));
