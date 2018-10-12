/* eslint-disable */
import React from 'react';
import classNames from 'classnames';

import { content } from '@services/url';
import { Link } from '@at/Link/Link';
import { Button } from '@at/Button/Button';

import styles from './Awards.module.scss';

const rootClasses = (sectionClass) => {
  return classNames({
    [styles.awardsSection]: true,
    [sectionClass ? sectionClass : styles.greyBackground]: true,
  });
}

const rootStyles = (background) => {
  return {
    backgroundImage: `url(${background})`
  };
}

const Awards = ({ data }) => {
  console.log(data);
  return (
    <React.Fragment>
      <section className={ rootClasses(data.sectionClass) } style={rootStyles(data.bg)}>
        <div className={ styles.container }>
          <div className="row">
            <div className="awards">
              <h4 dangerouslySetInnerHTML={{ __html: data.sectionHeader }} />
              <p dangerouslySetInnerHTML={{ __html: data.description }} />
              <ul className={styles.awardsList}>
                { data.awards.map((award, i) => {
                  <li key={i}>
                    <Link href={ award.link } isBlank>
                      <img src={ content(award.image) } alt={ award.alt }/>
                    </Link>
                  </li>
                })}
              </ul>
              <Button href={ data.awardsLink } className="button transparent">
                { data.awardsText }
              </Button>
            </div>
            <div className="promo green-background">
              <h4 dangerouslySetInnerHTML={{ __html: data.freeScan }} />
              <p dangerouslySetInnerHTML={{ __html: data.freeScanDescription }} />
              <Button href={data.freeScanButtonLink}>
                { data.freeScanButtonText }
              </Button>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export { Awards };
