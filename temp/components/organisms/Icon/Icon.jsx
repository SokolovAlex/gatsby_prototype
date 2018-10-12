import React from 'react';
import PropTypes from 'prop-types';
import { grey } from '@at/variables';
import { ICONS } from './Icons.constants';

import styles from './Icon.module.scss';

const Icon = (props) => {
  const { name, size, fill } = props;
  const FoundIcon = ICONS[name];
  if (!FoundIcon) {
    return <span>No Icon found with the name: {name}</span>;
  }
  return <FoundIcon className={styles.icon} width={size} height={size} fill={fill} {...props} />;
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  fill: PropTypes.string,
};

Icon.defaultProps = {
  size: 20,
  fill: grey,
};

export default Icon;
