/* eslint-disable */
import React from 'react';
import { Icon } from '@org/Icon/Icon';
import styles from './DesktopFooter.module.scss';

const DesktopFooter = ({ data, country, isCountrySelectorOpen, onToogleCountrySelector }) => {
  const now = new Date();
  const year = now.getFullYear();

  return (
    <section className={styles.host}>
      <div className={styles.container}>
        <div className={styles.links}>
          <div className={styles.featuredPages}>
            <ul>
              {data.leftSetOfBlocks.map((block, i) => (
                <li key={i} className={styles.block}>
                  <h3 className={styles.blockHeader} dangerouslySetInnerHTML={{ __html: block.title }} />
                  <p className={styles.blockText}>{block.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.contactPages}>
            <ul>
              <li className={styles.block}>
                <h3 dangerouslySetInnerHTML={{ __html: data.contactUsBlock.title }} />
                <p dangerouslySetInnerHTML={{ __html: data.contactUsBlock.description }} />
              </li>
              {data.footerRightSideBlock && (
                <li className="lab-shop-block">
                  <h3 dangerouslySetInnerHTML={{ __html: data.footerRightSideBlock.title }} />
                  <p dangerouslySetInnerHTML={{ __html: data.footerRightSideBlock.description }} />
                </li>
              )}
              <li className={styles.socilaIcons}>
                <h3 dangerouslySetInnerHTML={{ __html: data.socialBlockHeading }} />
                <div>
                  {data.socialIcons.map((item, i) => (
                    <a key={i} href={item.link} target="_blank" className={styles.socialIcon}>
                      <Icon size={16} name={ item.icon }></Icon>
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <footer className={styles.copyFooter}>
          <p className={styles.copy}>
            &copy;&nbsp;
            {year}
            &nbsp;
            <span dangerouslySetInnerHTML={{ __html: data.copyright }} />
          </p>
          <div
            className={`${styles.coutrySelectButton} ${isCountrySelectorOpen ? styles.active : '' }`}
            onClick={() => onToogleCountrySelector()}>
            <Icon size={20} name="globe" className={styles.globe}></Icon>
            <span className={styles.countyTitle}>{country}</span>
            <span className={styles.buttonArrow}>
              <Icon size={10} name="arrowUp"></Icon>
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { DesktopFooter };
