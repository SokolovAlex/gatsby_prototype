/* eslint-disable */
import React from 'react';
import classNames from 'classnames';

import { Button, Modes } from '../../atoms/Button/Button';
import { ProductDescription } from '../../molecules/ProductDescription/ProductDescription';

import styles from './ProductPromo.module.scss';

const content = (path) => `https://www.kaspersky.fr/${path}`;

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

const ProductPromo = ({ data, text, productName, brand }) => {
  const product = data.product.fields;
  return (
    <React.Fragment>
      <section className={hostClasses(data.class)} style={hostStyles(data.bgImg, data.bgColor)}>
        <div className={`${styles.container}`}>
          <ProductDescription
            image={content(product.fullSizeImage)}
            brandName={brand || product.prodKasperskyTitle}
            productName={productName || product.prodMainTitle}
          />

          <div className={styles.description}>
            {text}
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