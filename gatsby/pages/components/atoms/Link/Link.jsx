import * as React from 'react';
import styles from './Link.module.scss';

const Link = ({ href, isBlank, children }) =>
  isBlank ? (
    <a href={href} className={styles.normal} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <a href={href} className={styles.normal}>
      {children}
    </a>
  );

export { Link };
