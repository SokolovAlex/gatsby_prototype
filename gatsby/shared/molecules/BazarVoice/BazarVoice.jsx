import * as React from 'react';

import { Icon } from '@org/Icon/Icon';

import styles from './BazarVoice.module.scss';

const starIcon = (rating, starNum) => {
  return <Icon name='star' size={ 12 } fill={ rating > starNum ? '#FFC200' : '#e5e5e5' } />;
}

const getStars = (stars) => {
  const range = [0,0,0,0,0];
  return range.map((_, i) => (<span key={i} className={styles.star}>{ starIcon(stars, i) }</span>));
}

const BazarVoice = ({
  stars = 4,
  reviewAmount,
  reviewText,
  onClick,
}) => (
  <div className={styles.bazarvoice}>
    <div onClick={(e) => onClick(e) }>
      <div className={styles.starbar}>
        { getStars(stars) }
      </div>
      <p className={styles.text}>({reviewAmount} {reviewText})</p>
    </div>
  </div>
);

export { BazarVoice };
