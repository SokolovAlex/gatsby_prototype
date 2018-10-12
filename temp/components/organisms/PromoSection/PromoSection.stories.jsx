import React from 'react';
import { storiesOf } from '@storybook/react';
import { PromoSection } from './PromoSection';

const data = [
  {
    backgroundImage: 'https://www.kaspersky.fr/content/fr-fr/images/photo-header-1.jpg',
    ctaButton: [{ text: 'RENOUVELER', link: '/renewal-center/home', class: 'transparent', isExternal: [], hide: [] }],
    footerClass: 'section-footer',
    header: 'FAITES DES ÉCONOMIES ',
    sectionClass: 'grey-background',
    sectionID: 'promo-section',
    textBlock:
      'lorsque vous renouvelez votre licence ou que vous mettez votre protection à niveau vers un autre produit Kaspersky Lab',
    useToggling: [],
    promotion: '',
  },
];

storiesOf('PromoSection', module).add('PromoSection', () => (
  <div>
    <PromoSection data={data} />
  </div>
));
