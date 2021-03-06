/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Footer } from './Footer';
import { Provider } from 'react-redux';

import createStore from '~/store/createStore';

storiesOf('Footer', module).add('Footer', () => (
  <Provider store={createStore()}>
    <Footer data={mockFooterData()} selectorData={mockSelectorData()} />
  </Provider>
));

const mockSelectorData = () => ({
  Body:
    '\u003cdiv\u003e\n\u003cul\u003e\n\u003cli class="list-title"\u003eAmericas\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://latam.kaspersky.com/?ignoreredirects=true"\u003eAmérica Latina\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.com.br/?ignoreredirects=true"\u003eBrasil\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://usa.kaspersky.com/?ignoreredirects=true"\u003eUnited States\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.ca/?ignoreredirects=true"\u003eCanada\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\u003cul\u003e\n\u003cli class="list-title"\u003eAfrica\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.fr/?ignoreredirects=true"\u003eAfrique du Nord\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.ma/"\u003eMaroc\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.co.za/?ignoreredirects=true"\u003eSouth Africa\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\u003cul\u003e\n\u003cli class="list-title"\u003eMiddle East\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://me-en.kaspersky.com/?ignoreredirects=true"\u003eMiddle East\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://me.kaspersky.com/?ignoreredirects=true"\u003eالشرق الأوسط\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\u003c/div\u003e\n\u003cdiv\u003e\n\u003cul\u003e\n\u003cli class="list-title"\u003eWestern Europe\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.be/?ignoreredirects=true"\u003eBelgique \u0026amp; Luxembourg\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.dk/?ignoreredirects=true"\u003eDanmark\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.de/?ignoreredirects=true"\u003eDeutschland \u0026amp; Schweiz\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.es/?ignoreredirects=true"\u003eEspaña\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.fr/?ignoreredirects=true"\u003eFrance\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.it/?ignoreredirects=true"\u003eItalia \u0026amp; Svizzera\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.nl/?ignoreredirects=true"\u003eNederland \u0026amp; België\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.no/?ignoreredirects=true"\u003eNorge\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.de/?ignoreredirects=true"\u003eÖsterreich\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.pt/?ignoreredirects=true"\u003ePortugal\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.se/?ignoreredirects=true"\u003eSverige\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.co.uk/?ignoreredirects=true"\u003eUnited Kingdom\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\u003c/div\u003e\n\u003cdiv\u003e\n\u003cul\u003e\n\u003cli class="list-title"\u003eEastern Europe\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.cz/"\u003eČeská republika\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.hu/"\u003eMagyarország\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.pl/"\u003ePolska\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.ro/"\u003eRomânia\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://shop.kaspersky.rs/category/za-kucnu-upotrebu#tab=prod-2"\u003eSrbija\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.com.tr/?ignoreredirects=true"\u003eTürkiye\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.gr/"\u003eΕλλάδα (Greece)\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.bg/"\u003eБългария (Bulgaria)\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.ru/?ignoreredirects=true"\u003eРоссия и Белару́сь (Russia \u0026 Belarus)\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.ua/"\u003eУкраїна (Ukraine)\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\u003c/div\u003e\n\u003cdiv\u003e\n\u003cul\u003e\n\u003cli class="list-title"\u003eAsia \u0026amp; Pacific\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.com.au/?ignoreredirects=true"\u003eAustralia\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.co.in/?ignoreredirects=true"\u003eIndia\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.com.au/?ignoreredirects=true"\u003eNew Zealand\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com.vn/"\u003eViệt Nam\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.co.th/"\u003eไทย (Thailand)\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.co.kr/"\u003e한국 (Korea)\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.com.cn/?ignoreredirects=true"\u003e中国 (China)\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com.hk/"\u003e中国香港 (Hong Kong)\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com.tw/"\u003e中国台灣 (Taiwan)\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.co.jp/"\u003e日本 (Japan)\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\u003cul\u003e\n\u003cli class="list-title"\u003eFor all other countries\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.com/?ignoreredirects=true"\u003eGlobal Website\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\u003c/div\u003e',
});

const mockFooterData = () => ({
  leftSetOfBlocks: [
    {
      title: '\u003ca href="/home-security"\u003eVous et votre famille êtes protégés\u003c/a\u003e',
      description:
        'Obtenez une solution de sécurité performante. Découvrez comment notre solution primée vous permet de protéger ce qui compte le plus pour vous.',
    },
    {
      title: '\u003ca href="/downloads#tools"\u003eObtenez des outils GRATUITS\u003c/a\u003e',
      description:
        'Nous proposons une large gamme d’outils Kaspersky Lab GRATUITS pour veiller à votre sécurité, sur PC, Mac, iPhone, iPad et les appareils Android.',
    },
    {
      title: '\u003ca href="/about"\u003eÀ propos de nous\u003c/a\u003e',
      description: 'Découvrez pourquoi nous nous engageons à veiller à votre sécurité, en ligne et au-delà.',
    },
    {
      title: '\u003ca href="/downloads"\u003eTéléchargez votre version d\u0027essai gratuite\u003c/a\u003e',
      description:
        'Testez les logiciels avant de les acheter. En quelques clics, vous pouvez tester GRATUITEMENT l’un de nos produits afin d’évaluer la qualité de nos technologies.',
    },
  ],
  contactUsBlock: {
    title: '\u003ca href="/about/contact"\u003eNous sommes là pour vous aider\u003c/a\u003e',
    description:
      'Notre rôle est de vous protéger, alors n’hésitez pas à cliquer ici si vous souhaitez nous contacter, obtenir des réponses à certaines questions ou être mis en relation avec notre support technique.',
  },
  socialBlockHeading: 'Restez informé',
  socialIcons: [
    {
      link: 'https://www.facebook.com/kasperskylabfrance?v=wall',
      icon: 'facebook',
    },
    {
      link: 'https://www.twitter.com/kasperskyfrance',
      icon: 'twitter',
    },
    {
      link: 'https://www.linkedin.com/company/kaspersky-lab',
      icon: 'linkedin',
    },
    {
      link: 'http://www.youtube.com/KasperskyFrance',
      icon: 'youtube',
    },
  ],
  copyright:
    'AO Kaspersky Lab. Tous droits réservés. \u0026bull; \u003ca href="/web-privacy-policy"\u003ePolitique de confidentialité\u003c/a\u003e \u0026bull; \u003ca href="/anti-corruption-policy"\u003ePolitique anticorruption\u003c/a\u003e \u0026bull; \u003ca href="/end-user-license-agreement"\u003eContrat de Licence\u003c/a\u003e \u0026bull; \u003ca href="/terms-of-use"\u003eConditions d\u0027utilisation\u003c/a\u003e \u0026bull; \u003ca href="/refund-policy"\u003ePolitique de remboursement\u003c/a\u003e',
  'copyright-smb':
    'AO Kaspersky Lab. Tous droits réservés. • \u003ca href="/web-privacy-policy" xmlns="http://www.w3.org/1999/xhtml"\u003ePolitique de confidentialité\u003c/a\u003e • \u003ca href="/small-to-medium-business-security/end-user-license-agreement" xmlns="http://www.w3.org/1999/xhtml"\u003eContrat de Licence\u003c/a\u003e • \u003ca href="/terms-of-use" xmlns="http://www.w3.org/1999/xhtml"\u003eConditions d\u0027utilisation\u003c/a\u003e • \u003ca href="/refund-policy" xmlns="http://www.w3.org/1999/xhtml"\u003ePolitique de remboursement\u003c/a\u003e',
  'copyright-vsb':
    'AO Kaspersky Lab. Tous droits réservés. • \u003ca href="/web-privacy-policy" xmlns="http://www.w3.org/1999/xhtml"\u003ePolitique de confidentialité\u003c/a\u003e • \u003ca href="/small-to-medium-business-security/end-user-license-agreement" xmlns="http://www.w3.org/1999/xhtml"\u003eContrat de Licence\u003c/a\u003e • \u003ca href="/terms-of-use" xmlns="http://www.w3.org/1999/xhtml"\u003eConditions d\u0027utilisation\u003c/a\u003e • \u003ca href="/refund-policy" xmlns="http://www.w3.org/1999/xhtml"\u003ePolitique de remboursement\u003c/a\u003e',
  'copyright-ent':
    'AO Kaspersky Lab. Tous droits réservés. • \u003ca href="/web-privacy-policy" xmlns="http://www.w3.org/1999/xhtml"\u003ePolitique de confidentialité\u003c/a\u003e • \u003ca href="/small-to-medium-business-security/end-user-license-agreement" xmlns="http://www.w3.org/1999/xhtml"\u003eContrat de Licence\u003c/a\u003e • \u003ca href="/terms-of-use" xmlns="http://www.w3.org/1999/xhtml"\u003eConditions d\u0027utilisation\u003c/a\u003e • \u003ca href="/refund-policy" xmlns="http://www.w3.org/1999/xhtml"\u003ePolitique de remboursement\u003c/a\u003e',
  mobileLabel: 'Sélectionnez votre pays',
  shortViewLinks: [
    {
      text: 'Nous contacter',
      link: '/about/contact',
      isExternal: [],
      hide: [],
    },
    {
      text: 'À propos',
      link: '/about',
      isExternal: [],
      hide: [],
    },
    {
      text: 'Partenaires',
      link: '/partners',
      isExternal: [],
      hide: [],
    },
    {
      text: 'Communiqués de presse',
      link: '/about/press-releases',
      isExternal: [],
      hide: [],
    },
  ],
  rssLink: {
    isExternal: [],
    hide: ['Yes'],
  },
  countrySelector:
    '\u003cdiv xmlns="http://www.w3.org/1999/xhtml"\u003e\n\u003cul\u003e\n\u003cli class="list-title"\u003eAmericas\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://latam.kaspersky.com/?sitepref=LATAM"\u003eAmérica Latina\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://latam.kaspersky.com/ar?sitepref=ARGENTINA"\u003eArgentina\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://brazil.kaspersky.com/"\u003eBrasil\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://caribbean.kaspersky.com/"\u003eCaribbean\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://latam.kaspersky.com/?sitepref=CRE"\u003eCaribe\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://latam.kaspersky.com/cl?sitepref=CHILE"\u003eChile\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://latam.kaspersky.com/co?sitepref=COLOMBIA"\u003eColombia\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://latam.kaspersky.com/ec?sitepref=ECUADOR"\u003eEcuador\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://latam.kaspersky.com/mx?sitepref=MEXICO"\u003eMéxico\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://latam.kaspersky.com/pe?sitepref=PERU"\u003ePeru\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://usa.kaspersky.com/?sitepref=US"\u003eUnited States\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\u003cul\u003e\n\u003cli class="list-title"\u003eMiddle East\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://me.kaspersky.com/en/"\u003eMiddle East\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://me.kaspersky.com/"\u003eالشرق الأوسط\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\u003c/div\u003e\n\u003cdiv xmlns="http://www.w3.org/1999/xhtml"\u003e\n\u003cul\u003e\n\u003cli class="list-title"\u003eWestern Europe\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com/be/"\u003eBelgique \u0026amp; Luxembourg\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com/dk/"\u003eDanmark\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com/de/"\u003eDeutschland \u0026amp; Schweiz\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.es/"\u003eEspaña\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.fi/"\u003eFinland\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com/fr/"\u003eFrance \u0026amp; Suisse\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.ie/"\u003eIreland\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com/it/"\u003eItalia \u0026amp; Svizzera\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com/nl/"\u003eNederland \u0026amp; België\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com/no/"\u003eNorge\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com/de/"\u003eÖsterreich\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com/pt/"\u003ePortugal\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com/se/"\u003eSverige\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.co.uk/"\u003eUnited Kingdom\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.co.il/"\u003eישראל (Israel)\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\u003c/div\u003e\n\u003cdiv xmlns="http://www.w3.org/1999/xhtml"\u003e\n\u003cul\u003e\n\u003cli class="list-title"\u003eEastern Europe\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com/cz"\u003eČeská republika\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.co.hu/"\u003eMagyarország\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.pl/"\u003ePolska\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.ro/"\u003eRomânia\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://shop.kaspersky.rs/category/za-kucnu-upotrebu#tab=prod-2"\u003eSrbija\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com/tr/"\u003eTürkiye\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.gr/"\u003eΕλλάδα (Greece)\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.by/"\u003eБелару́сь (Belarus)\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.bg/"\u003eБългария (Bulgaria)\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.ru/"\u003eРоссия (Russia)\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.ua/"\u003eУкраїна (Ukraine)\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\u003cul\u003e\n\u003cli class="list-title"\u003eAfrica\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com/africa"\u003eAfrica\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com/fr/"\u003eAfrique du Nord\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.fr/algerie"\u003eAlgérie\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.ma/"\u003eMaroc\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.ng/"\u003eNigeria\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.co.za/"\u003eSouth Africa\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.fr/tunisie"\u003eTunisie\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\u003c/div\u003e\n\u003cdiv xmlns="http://www.w3.org/1999/xhtml"\u003e\n\u003cul\u003e\n\u003cli class="list-title"\u003eAsia \u0026amp; Pacific\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com/au/"\u003eAustralia\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.co.in/"\u003eIndia\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.co.id/"\u003eIndonesia\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com.my/"\u003eMalaysia\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com/nz/"\u003eNew Zealand\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com/au/"\u003eOceania\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com.ph/"\u003ePhilippines\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com.sg/"\u003eSingapore\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky-sea.com/"\u003eSouth-East Asia\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com.vn/"\u003eViệt Nam\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.co.th/"\u003eไทย (Thailand)\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.co.kr/"\u003e한국 (Korea)\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com.cn/"\u003e中国 (China)\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com.hk/"\u003e香港 (Hong Kong)\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.com.tw/"\u003e台灣 (Taiwan)\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="http://www.kaspersky.co.jp/"\u003e日本 (Japan)\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\u003cul\u003e\n\u003cli class="list-title"\u003eFor all other countries\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.kaspersky.com/?ipcountry=global"\u003eGlobal Website\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\u003c/div\u003e',
});
