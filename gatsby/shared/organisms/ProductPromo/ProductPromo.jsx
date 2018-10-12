/* eslint-disable */
import React from 'react';
import classNames from 'classnames';

import { content } from '@services/url';

import { Button, Modes } from '@at/Button/Button';
import { ProductDescription } from '@mol/ProductDescription/ProductDescription';

//import rootStyles from '../../../styles/_critical.module.scss';
import styles from './ProductPromo.module.scss';

const hostClasses = (sectionClass) => {
  return classNames({
    [styles.host]: true,
    [sectionClass ? sectionClass : styles.greyBackground]: true,
  });
}

const hostStyles = (background, backgroundColor) => {
  return background
    ? { backgroundImage: `url(${content(background)}), linear-gradient(to bottom, ${backgroundColor || '#fff'} 0%,#fff 100%)` }
    : {};
}

const ProductPromo = ({ data }) => {
  const product = data.product.fields;
  return (
    <React.Fragment>
      <section className={hostClasses(data.class)} style={hostStyles(data.bgImg, data.bgColor)}>
        <div className={`${styles.container}`}>
          <ProductDescription
            image={product.fullSizeImage}
            brandName={product.prodKasperskyTitle}
            productName={product.prodMainTitle}
          />

          <div className={styles.description}>
            {data.promoDesc}
          </div>

          <div className={styles.actions}>
            { data.learnMore &&
              <Button
                mode={Modes.Danger}
                href={data.learnMore.link}
                customClass={ data.learnMore.class}>
                {data.learnMore.text}
              </Button>
            }
            { data.freeTrial &&
              <Button
                mode={Modes.LightGreen}
                href={data.freeTrial.link}
                customClass={data.freeTrial.class}>
                {data.freeTrial.text}
              </Button>
            }
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export { ProductPromo };
