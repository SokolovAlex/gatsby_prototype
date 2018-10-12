import React from 'react';

import { storiesOf } from '@storybook/react';
import { text, number } from '@storybook/addon-knobs';

import { BazarVoice } from './BazarVoice';

storiesOf('BazarVoice', module).addWithJSX('simple', () => (
  <BazarVoice
    stars={number('stars', 4)}
    reviewAmount={number('amount', 5000)}
    reviewText={text('text', 'AVIS CLIENTS')}/>
));