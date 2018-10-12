import * as React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import { Sizes, Modes } from './enums';

const sizes = {
  [Sizes.sm]: styles.size_sm,
  [Sizes.md]: styles.size_md,
  [Sizes.lg]: styles.size_lg,
};

const modes = {
  [Modes.Normal]: styles.normal,
  [Modes.LightGreen]: styles.lightGreen,
  [Modes.Primary]: styles.primary,
  [Modes.Danger]: styles.danger,
};

const LinkButton = ({
  children,
  mode = Modes.Normal,
  size = Sizes.md,
  href,
  disabled = false,
  customClass = '',
  target,
}) => (
  <a
    className={classNames({
      [sizes[size]]: true,
      [modes[mode]]: true,
      [styles.disabled]: disabled,
      [customClass]: !!customClass,
    })}
    href={href}
    target={target}>
    <span>{children}</span>
  </a>
);

const CommonButton = ({
  children,
  mode = Modes.Normal,
  size = Sizes.md,
  customClass = '',
  disabled = false,
  onClick,
}) => (
  <button
    type="button"
    className={classNames({
      [sizes[size]]: true,
      [modes[mode]]: true,
      [customClass]: !!customClass,
    })}
    disabled={disabled}
    onClick={(e) => onClick && onClick(e)}>
    <span>{children}</span>
  </button>
);

const Button = (props) => {
  const { href } = props;
  return href ? <LinkButton {...props} /> : <CommonButton {...props} />;
};

export { Button, Modes };
