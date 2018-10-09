import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';

import { Link } from './Link';

storiesOf('Link', module).addWithJSX('simple', () => (
  <Link href={text('href', 'http://google.com')} isBlank={boolean('is blank', true)}>
    {text('text', 'Link button')}
  </Link>
));
