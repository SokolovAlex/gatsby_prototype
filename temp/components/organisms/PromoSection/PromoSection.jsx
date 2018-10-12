/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
import React from 'react';
import styles from './PromoSection.module.scss';
import { snakeToCamel } from '../../../helpers/css-helpers';

const defaultData = [
  {
    backgroundImage: 'content/fr-fr/images/photo-header-1.jpg',
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

export const PromoSection = ({ data = defaultData }) => (
  <div>
    <div>
      {data.map((promotion, iPromo) => (
        <div key={iPromo}>
          <section
            className={` ${styles.promoSection} ${styles[snakeToCamel(promotion.sectionClass)]}`}
            style={{ backgroundImage: `url(${promotion.backgroundImage})` }}>
            <div className={`${styles.container}`}>
              <h3 className={styles.sectionTitle}>{promotion.header}</h3>

              {promotion.textBlock && <p>{promotion.textBlock}</p>}
              {promotion.htmlBlock && <div dangerouslySetInnerHTML={{ __html: promotion.htmlBlock }} />}
              {promotion.ctaButton &&
                promotion.ctaButton.length && (
                  <footer className={`${styles.sectionFooter} ${styles[promotion.footerClass]}`}>
                    {promotion.ctaButton.map((button, iButton) => (
                      <p key={iButton}>
                        <a
                          href={button.link}
                          className={`${styles.button} ${styles.transparent}`}
                          target={button.isExternal === 'Yes' ? '_blank' : ''}>
                          {button.text}
                        </a>
                      </p>
                    ))}
                    {promotion.noteText && (
                      <p className="note" dangerouslySetInnerHTML={{ __html: promotion.noteText }} />
                    )}
                  </footer>
                )}
            </div>
          </section>
        </div>
      ))}
    </div>
  </div>
);
