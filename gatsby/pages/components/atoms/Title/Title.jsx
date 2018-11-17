/* eslint-disable */
import React from 'react';
import styles from './Title.module.scss';

const sizes = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
}

const Title = ({ children, size = 'md' }) => {
  return (
    <div className={ sizes[size] }>{ children }</div>
  );
}

export { Title };
