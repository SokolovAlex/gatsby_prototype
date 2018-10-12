import React from 'react';

import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';

import { Button } from './Button';
import { Sizes, Modes } from './enums';

storiesOf('Button', module).addWithJSX('simple', () => (
  <Button
    disabled={boolean('disabled', false)}
    mode={select('mode', Modes, Modes.Normal)}
    href={text('href', 'http://google.com')}
    size={select('size', Sizes, Sizes.md)}
    customClass={text('customClass', '')}
    target={text('target')}>
    {text('text', 'Text Button')}
  </Button>
));
