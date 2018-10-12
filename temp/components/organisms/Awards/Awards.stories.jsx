/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Awards } from './Awards';

storiesOf('Awards', module).add('Awards', () => (<Awards data = { mockAwardsData() } />));

const mockAwardsData = () => ({
  "sectionHeader": "La plus testée. La plus récompensée.",
  "description": "Depuis plus de 20 ans, nous sommes reconnus en tant qu’experts de la lutte contre les programmes malveillants et les cybermenaces. En 2017, les produits Kaspersky Lab ont fait l\u0027objet de 86 tests et études indépendants. Ils ont terminé 72 fois en première position et 78 fois parmi les trois premiers. Pour plus d’informations, consultez \u003ca href=\"/top3\" xmlns=\"http://www.w3.org/1999/xhtml\"\u003ehttps://www.kaspersky.fr/top3\u003c/a\u003e.",
  "awards": [{
    "link": "http://www.av-comparatives.org/wp-content/uploads/2016/01/avc_sum_201512_en.pdf",
    "image": "content/fr-fr/images/b2c/awards/icon-awards-av-comparative.png",
    "alt": "AV-Comparatives Award: Product of the Year"
  }, {
    "link": "https://www.av-test.org/en/award/2015/best-usability-kaspersky-lab/",
    "image": "content/fr-fr/images/b2c/awards/AV-Test-–-Best-Performance-2015.png",
    "alt": "AV-Test Award: Best Performance 2015"
  }, {
    "link": "https://www.mrg-effitas.com/media-room/award/",
    "image": "content/fr-fr/images/b2c/awards/icon-awards-mrg.png",
    "alt": "MRG Award: Online Banking Browser Security"
  }],
  "awardsText": "RÉCOMPENSES",
  "awardsLink": "/about/awards",
  "freeScan": "Protection gratuite",
  "freeScanDescription": "Une protection de base contre les programmes malveillants qui s\u0027adapte à vos activités pour vous protéger.",
  "freeScanButtonText": "GRATUIT",
  "freeScanButtonLink": "/free-cloud-antivirus"
});