import React from 'react';

import './breadcrumbs.scss';

const Breadcrumbs = ({ breadcrumbs }) => {
  const depth = breadcrumbs.length;
  return (
    <p className="breadcrumbs">
      {breadcrumbs.map((state, i) => (
        /* eslint-disable-next-line react/no-array-index-key */
        <a key={i} href={state.link} className={depth === i + 1 ? 'unclickable' : ''}>
          {state.title}
        </a>
      ))}
    </p>
  );
};

export default Breadcrumbs;
